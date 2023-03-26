"""Web Server Gateway Interface"""

##################
# FOR PRODUCTION
####################
from app.app import app
import logging

if __name__ == "__main__":
    ####################
    # FOR DEVELOPMENT
    ####################

    logPath = './logs/'
    fileName = 'flask.log'

    # init logger
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s",
        handlers=[
            logging.FileHandler("{0}/{1}".format(logPath, fileName)),
            logging.StreamHandler()
        ]
    )

    app.run(host='0.0.0.0', debug=True)