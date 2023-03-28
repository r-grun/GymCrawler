"""GymCrawler Flask Server"""

# load libaries
from flask import Flask
from flask.json import JSONEncoder
from flask_cors import CORS
import os
from bson import json_util, ObjectId
from datetime import datetime, date

class MongoJsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, ObjectId):
            return str(obj)
        return json_util.default(obj, json_util.CANONICAL_JSON_OPTIONS)
    
def create_app():
    # load modules
    from app.endpoints.blueprint_capacity import blueprint_capacity

    # init Flask app
    app = Flask(__name__)
    CORS(app)
    app.json_encoder = MongoJsonEncoder

    # register blueprints. ensure that all paths are versioned!
    app.register_blueprint(blueprint_capacity, url_prefix="/api/v1")

    # init DB
    app.config["MONGO_URI"] = f"mongodb://{os.environ.get('MONGO_GYM_USERNAME')}:{os.environ.get('MONGO_GYM_PASSWORD')}@{os.environ.get('MONGO_ADDRESS')}:27017/gymDB"
    # app.config["MONGO_URI"] = f"mongodb://gymuser:gymPass@127.0.0.1:27017/gymDB"

    return app