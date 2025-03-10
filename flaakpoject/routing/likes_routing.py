from controllers.likes_controller import add_like_controller, get_total_likes_controler, get_total_likes_by_vacation_id_controller, delete_like_controller, get_likes_by_user_id_controller, get_all_likes_controller
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

likes_bp = Blueprint("likes", __name__)

@likes_bp.route("/likes", methods=["POST"])
@jwt_required()
def add_like():
    user_id = get_jwt_identity()
    data = request.get_json("vacation_id")
    return add_like_controller(user_id, data)

@likes_bp.route("/likes", methods=["GET"])
@jwt_required()
def get_likes_by_user_id_route():
    user_id = get_jwt_identity()
    return get_likes_by_user_id_controller(user_id)

@likes_bp.route("/likes", methods=["DELETE"])
@jwt_required()
def delete_like_route():
    user_id = get_jwt_identity()
    vacation_id = request.json.get("vacation_id")
    return delete_like_controller(user_id, vacation_id)

@likes_bp.route("/likes/total", methods=["GET"])
@jwt_required()
def get_total_likes_route():
    return get_total_likes_controler()

@likes_bp.route("/likes/totalby", methods=["GET"])
# @jwt_required()
def get_total_likes_by_vacation_id_route():
    return get_total_likes_by_vacation_id_controller()