"""GymCrawler Flask Server"""

# load libaries
from flask import Flask, jsonify

# load modules
from app.endpoints.blueprint_capacity import blueprint_capacity

# init Flask app
app = Flask(__name__)

# register blueprints. ensure that all paths are versioned!
app.register_blueprint(blueprint_capacity, url_prefix="/api/v1/capacity")

