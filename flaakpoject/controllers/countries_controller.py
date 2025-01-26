from flask import jsonify, request
from models.countries_model import add_countrie, get_all_countries
import jwt, os

def Is_Admin(token):
    try:
        decoded = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
        is_admin = decoded.get("is_admin")
        return is_admin
    except Exception as err:
        print(err)
        return jsonify({"message": "not chech of token"})

def create_country():
    countries_name = request.json.get("name")
    if not countries_name:
        return jsonify({"error": "countries name is required"}), 400
    countries_id = add_countrie(countries_name)
    return jsonify({"countries id": countries_id}), 201

def fetch_all_countries():
    countries = get_all_countries()
    return jsonify({"countries": countries}), 200