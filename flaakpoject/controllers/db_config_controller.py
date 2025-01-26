from flask import jsonify
from models.db_config import test_db_connection

def db_config_test_controller():
    return test_db_connection()