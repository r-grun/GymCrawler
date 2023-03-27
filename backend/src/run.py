"""Web Server Gateway Interface"""

from app.app import create_app
import logging
import configparser

config = configparser.ConfigParser()


if __name__ == "__main__":
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

    app = create_app()
    app.config['DEBUG'] = True

    app.run()