import requests
import json
import time
import logging
import pymongo
from datetime import datetime
import traceback
import os

logPath = './logs/'
fileName = 'collector.log'

# init logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s",
    handlers=[
        logging.FileHandler("{0}/{1}".format(logPath, fileName)),
        logging.StreamHandler()
    ]
)

# init script
url = os.environ.get('GYM_CAPACITY_URL')
gym_id = os.environ.get('GYM_ID')

payload={}
headers = {
  'Content-Type': 'application/json'
}

try:
    logging.info(f'Program started for gym_id = {gym_id}. Press CTRL+C to stop.')
    logging.info(f'Request URL: {url}.')

    logging.info(f'Connecting to DB.')
    mongo_client = pymongo.MongoClient(f"mongodb://{os.environ.get('MONGO_GYM_USERNAME')}:{os.environ.get('MONGO_GYM_PASSWORD')}@mongo:27017/gymDB", serverSelectionTimeoutMS = 60000)

    logging.info(f'DB connected: {mongo_client.server_info()}')

    mongo_database = mongo_client["gymDB"]
    mongo_collection = mongo_database["checkin"]

    while True:
        try:
            response = requests.request("GET", url, headers=headers, data=payload)
        
            if(response.ok):
                gym_data = json.loads(response.text)
                selected_gym_data = gym_data['capacityInfos']['centerId' == gym_id] 

                timestamp = datetime.now().isoformat()
                selected_gym_data['timestamp'] = timestamp

                logging.info(f'Saving to db: {selected_gym_data}')
                inserted_data = mongo_collection.insert_one(selected_gym_data)
                logging.info(f'Data inserted for ID: {inserted_data.inserted_id}')
            else:
                logging.error(f'Error requesting gym data: {response.text}')

        except Exception:
            logging.error(f'Could not get capacity:')
            logging.error(traceback.format_exc())

        time.sleep(600)
except KeyError:
    logging.info('Program stopped manually.')
except pymongo.errors.ServerSelectionTimeoutError as err:
    logging.error(f'DB connection error:')
    logging.error(traceback.format_exc())
except Exception:
    logging.error(f'Program stopped due to following exception:')
    logging.error(traceback.format_exc())
finally:
    mongo_client.close()
    logging.info('Database client closed.')



