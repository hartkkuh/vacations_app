from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.users_controller import Is_Admin, update_user_by_id_controller, get_user_by_id, delete_user_by_id, register_user, update_user_by_token_controller, login_user, get_all_users, total_users_controler

users_bp = Blueprint("users", __name__)

@users_bp.route("/register", methods=["POST"], endpoint="register_user_route")
def register_user_route():
    return register_user(request.json)

@users_bp.route("/login", methods=["POST"], endpoint="login_user_route")
def login_user_route():
    return login_user(request.json)

@users_bp.route("/users", methods=["GET"], endpoint="get_all_users_route")
@jwt_required()
def get_all_users_route():
        users = get_all_users()
        return users

@users_bp.route("/users/<int:user_id>", methods=["GET"], endpoint="get_user_by_id_route")
@jwt_required()
def get_user_by_id_route(user_id):
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)
    return user

@users_bp.route("/users/<int:user_id>", methods=["PUT"], endpoint="update_user_by_token_route")
@jwt_required()
def update_user_by_token_route(user_id):
        try:
            user = update_user_by_token_controller(user_id, request.json)
            if user is None:
                return {"message": "User not found"}, 404
            print(user)
            return user
        except Exception as e:
            print(f"Error updating user: {e}")
            return {"message": "Error updating user"}, 500

@users_bp.route("/management/users/<int:user_id>", methods=["PUT"], endpoint="update_user_by_id_route")
@jwt_required()
def update_user_by_id_route(user_id):
    token_hed = request.headers.get('Authorization')
    # token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token_hed)
    if is_admin:
        try:
            user = update_user_by_id_controller(user_id, request.json)
            if user is None:
                return {"message": "User not found"}, 404
            print(user)
            return user
        except Exception as e:
            print(f"Error updating user: {e}")
            return {"message": "Error updating user"}, 500
    else: return jsonify({"message": "the user is not a admin"}), 401

@users_bp.route("/management/users/<int:user_id>", methods=["DELETE"], endpoint="delete_user_by_id_route")
@jwt_required()
def delete_user_by_id_route(user_id):
    token_hed = request.headers.get('Authorization')
    # token = token_hed.split(' ')[1]
    is_admin = Is_Admin(token_hed)
    if is_admin:
        return delete_user_by_id(user_id)
    else: return jsonify({"message": "the user is not a admin"}), 401

@users_bp.route("/users/total", methods=["GET"], endpoint="total_users_route")
@jwt_required()
def total_users_route():
    return total_users_controler()