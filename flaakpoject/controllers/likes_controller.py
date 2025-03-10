from models.likes_model import add_like, get_likes_by_vacation_id, delete_like, get_total_likes, get_total_likes_by_vacation_id, get_likes_by_user_id, get_all_likes
from flask import jsonify
def add_like_controller(user_id, data):
    vacation_id = data.get("vacation_id")
    add_like(user_id, vacation_id)
    return jsonify({"message": "Like added successfully"}), 200

def get_likes_by_vacation_id_controller(vacation_id):
    likes = get_likes_by_vacation_id(vacation_id)
    return jsonify(likes), 200

def delete_like_controller(user_id, vacation_id):
    delete_like(user_id, vacation_id)
    return jsonify({"message": "Like deleted successfully"}), 200

def get_likes_by_user_id_controller(user_id):
    likes = get_likes_by_user_id(user_id)
    return jsonify(likes), 200

def get_all_likes_controller():
    return get_all_likes()

def get_total_likes_controler():
    total_likes = get_total_likes()
    return jsonify({"total_likes": total_likes}), 200

def get_total_likes_by_vacation_id_controller():
    total_likes = get_total_likes_by_vacation_id()
    return jsonify({"total_likes": total_likes}), 200