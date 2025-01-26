from controllers.db_config_controller import db_config_test_controller
from flask import Blueprint

db_config_bp = Blueprint("db_config", __name__)

@db_config_bp.route("/db_config", methods=["GET"])
def db_config_test_route():
    return db_config_test_controller()