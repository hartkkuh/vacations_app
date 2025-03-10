from models.vacations_model import get_all_vacations, get_vacations_by_country_id, get_vacation_by_id, delete_vacation, update_vacation, add_vacation, get_end_vacations, get_start_vacations, get_on_vacations
from flask import jsonify, request
import jwt, os

def Is_Admin(token):
    try:
        decoded = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
        is_admin = decoded.get("is_admin")
        return is_admin
    except Exception as err:
        print(err)
        return jsonify({"message": "not chech of token"})

def get_all_vacations_controller():
    vacations = get_all_vacations()
    return vacations, 200

def get_vacations_by_country_id_controller(country_id):
    vacations = get_vacations_by_country_id(country_id)
    return jsonify(vacations), 200

def get_vacation_by_id_controller(vacation_id):
    vacation = get_vacation_by_id(vacation_id)
    return jsonify(vacation), 200

def delete_vacation_controller(vacation_id):
    delete_vacation(vacation_id)
    return jsonify({"message": "Vacation deleted successfully"}), 200

def update_vacation_controller(vacation_id, data):
    country_id = data.get("country_id")
    vacation_description = data.get("vacation_description")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    price = data.get("price")
    image_url = data.get("image_url", "")
    if not vacation_id or not country_id or not vacation_description or not start_date or not end_date or not price:
        return jsonify({"message": "All fields are required"}), 400

    update_vacation(vacation_id, country_id, vacation_description, start_date, end_date, price, image_url)
    return jsonify({"message": "Vacation updated successfully"}), 200

def add_vacation_controller(data):
    country_id = data.get("country_id")
    vacation_description = data.get("vacation_description")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    price = data.get("price")
    image_url = data.get("image_url", "")
    if not country_id or not vacation_description or not start_date or not end_date or not price:
        return jsonify({"message": "All fields are required"}), 400
    vacation_id = add_vacation(country_id, vacation_description, start_date, end_date, price, image_url)
    return jsonify({"message": "Vacation added successfully", "vacation_id": vacation_id}), 201

def get_vacations_numbers_controler():
    end_vacations = get_end_vacations()
    start_vacations = get_start_vacations()
    on_vacations = get_on_vacations()
    return {"end_vacations": end_vacations, "start_vacations": start_vacations, "on_vacations": on_vacations}