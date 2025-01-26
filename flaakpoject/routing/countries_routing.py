from flask import Blueprint, request, jsonify
from controllers.countries_controller import Is_Admin, create_country, fetch_all_countries
from flask_jwt_extended import jwt_required

countries_bp = Blueprint("countries", __name__)

@countries_bp.route("/management/countries", methods=["POST"])
@jwt_required()
def add_country_route():
    token_hed = request.headers.get('Authorization')
    token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token)
    if is_admin:
        return create_country()
    else: return jsonify({"message": "the user is not a admin"}), 401


@countries_bp.route("/countries", methods=["GET"])
def get_all_countries_route():
    return fetch_all_countries()