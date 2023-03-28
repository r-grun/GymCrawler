from datetime import timedelta
from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo, DESCENDING
import logging

def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)

    if db is None:

        db = g._database = PyMongo(current_app).db
       
    return db


# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

def get_capacity_for_date_range(date_from, date_to):
    """
    Finds the capacity for the omitted date range in the DB.
    Returns a list of capacities
    """
    try:
        logging.info(f'date_start: {date_from}, date_end: {date_to}')

        return list(db['checkin'].find({'timestamp': {'$gte': date_from, '$lt': date_to}}))
    except Exception as e:
        return e
    
def get_latest_capacity_for_date(date):
    """
    Finds the latest capacity for the omitted date in the DB.
    Returns a list of capacities
    """
    try:
        logging.info(f'date: {date}')
        next_date = date + timedelta(days=1)

        return list(db['checkin'].find({'timestamp': {'$gte': date, '$lt': next_date}}).sort([('timestamp', DESCENDING)]).limit(1))
    except Exception as e:
        return e