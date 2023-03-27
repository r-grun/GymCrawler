from flask import Blueprint, jsonify, request
import logging
from datetime import datetime, timedelta

from app.db.db import get_capacity_for_date_range, get_latest_capacity_for_date

# define the blueprint
blueprint_capacity = Blueprint(name="blueprint_capacity", import_name=__name__)


@blueprint_capacity.route('/capacity/<selectedDate>', methods=['GET'])
def api_get_capacity_for_date(selectedDate):
    logging.info(f'Request GET for /capacity/{selectedDate}')

    date = datetime.strptime(selectedDate, '%Y-%m-%d')
    next_date = date + timedelta(days=1)

    output = get_capacity_for_date_range(date, next_date)
    return jsonify(output)

@blueprint_capacity.route('/capacity/', methods=['GET'])
def api_get_current_capacity():
    logging.info(f'Request GET for /capacity')

    date = datetime.strptime(datetime.now().strftime('%Y-%m-%d'), '%Y-%m-%d')

    output = get_latest_capacity_for_date(date)
    return jsonify(output)