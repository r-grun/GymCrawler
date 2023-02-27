import requests
import json
import time
import logging

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
url = "https://teamxtrafit.de/application"
gym_id = '320'

payload={}
headers = {
  'Content-Type': 'application/json'
}

try:
    logging.info(f'Program started for gym_id = {gym_id}.')
    logging.info(f'Request URL: {url}.')

    while True:
        response = requests.request("GET", url, headers=headers, data=payload)
        if(response.ok):
            gym_data = json.loads(response.text)
            selected_gym_data = gym_data['centerId' == gym_id] 

            logging.info(f'{selected_gym_data}')
        else:
            logging.error(f'Error requesting gym data: {response.text}')

        time.sleep(10)
except KeyboardInterrupt:
    logging.info('Program stopped.')


