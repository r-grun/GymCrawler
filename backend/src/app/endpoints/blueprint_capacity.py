from flask import Blueprint, jsonify, request
import logging

# define the blueprint
blueprint_capacity = Blueprint(name="blueprint_capacity", import_name=__name__)

# note: global variables can be accessed from view functions
x = 5

# add view function to the blueprint
@blueprint_capacity.route('/test', methods=['GET'])
def test():
    logging.info("Request GET for /test")
    output = {"msg": "I'm the test endpoint from blueprint_x."}
    return jsonify(output)

# add view function to the blueprint
@blueprint_capacity.route('/plus', methods=['POST'])
def plus_x():
    logging.info("Request POST for /plus")
    # retrieve body data from input JSON
    data = request.get_json()
    in_val = data['number']
    # compute result and output as JSON
    result = in_val + x
    output = {"msg": f"Your result is: '{result}'"}
    return jsonify(output)