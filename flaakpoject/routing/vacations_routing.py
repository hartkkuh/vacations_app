from flask import Blueprint, request, jsonify
from controllers.vacations_controller import get_vacations_numbers_controler ,Is_Admin, add_vacation_controller, update_vacation_controller, delete_vacation_controller, get_vacation_by_id_controller, get_vacations_by_country_id_controller, get_all_vacations_controller
from flask_jwt_extended import jwt_required

vacations_bp = Blueprint("vacations", __name__)

@vacations_bp.route("/vacations", methods=["POST"], endpoint="add_vacation_route")
@jwt_required()
def add_vacation():
    token_hed = request.headers.get('Authorization')
    token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token)
    if is_admin:
        return add_vacation_controller(request.json)
    else: return jsonify({"message": "the user is not a admin"}), 401

@vacations_bp.route("/management/vacations/<int:vacation_id>", methods=["PUT"], endpoint="update_vacation_route")
@jwt_required()
def update_vacation(vacation_id):
    token_hed = request.headers.get('Authorization')
    token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token)
    if is_admin:
        return update_vacation_controller(vacation_id, request.json)
    else: return jsonify({"message": "the user is not a admin"}), 401

@vacations_bp.route("/management/vacations/<int:vacation_id>", methods=["DELETE"], endpoint="delete_vacation_route")
@jwt_required()
def delete_vacation(vacation_id):
    token_hed = request.headers.get('Authorization')
    token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token)
    if is_admin:
        return delete_vacation_controller(vacation_id)
    else: return jsonify({"message": "the user is not a admin"}), 401

@vacations_bp.route("/management/vacations/<int:vacation_id>", methods=["GET"], endpoint="get_vacation_by_id_route")
@jwt_required()
def get_vacation_by_id(vacation_id):
    token_hed = request.headers.get('Authorization')
    token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token)
    if is_admin:
        return get_vacation_by_id_controller(vacation_id)
    else: return jsonify({"message": "the user is not a admin"}), 401

@vacations_bp.route("/vacations/country/<int:country_id>", methods=["GET"], endpoint="get_vacations_by_country_id_route")
@jwt_required()
def get_vacations_by_country_id(country_id):
    return get_vacations_by_country_id_controller(country_id)

@vacations_bp.route("/vacations", methods=["GET"], endpoint="get_all_vacations_route")
@jwt_required()
def get_all_vacations():
    return get_all_vacations_controller()

# route for get_vacations_numbers
@vacations_bp.route("/vacations/numbers", methods=["GET"], endpoint="get_vacations_numbers_route")
# @jwt_required()
def get_vacations_numbers():
    return jsonify(get_vacations_numbers_controler()), 200