from flask import Blueprint
from controllers.roles_controller import fetch_all_roles
from flask_jwt_extended import jwt_required

roles_bp = Blueprint("roles", __name__)

@roles_bp.route("/roles", methods=["GET"])
@jwt_required()
def get_all_roles_route():
    return fetch_all_roles()