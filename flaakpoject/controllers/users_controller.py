from flask import jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models.users_model import delete_user_by_id, update_user_by_id, update_user_by_token, register, get_user_by_email, get_all_users_model, get_user_by_id as get_user_from_db
from datetime import timedelta
from flask import request, jsonify
import jwt, os, traceback

bcrypt = Bcrypt()

def Is_Admin(token):
    try:
        decoded = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
        is_admin = decoded.get("is_admin")
        return is_admin
    except Exception as err:
        print(err)
        return jsonify({"message": "not chech of token"})

def register_user(data):
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    if not first_name or not last_name or not email or not password:
        return jsonify({"message": "Invalid request"}), 400
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user_id = register(first_name, last_name, email, hashed_password)
    return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

def login_user(data):
    try:
        print("Login attempt with data:", data)
        email = data["email"]
        password = data["password"]
        if not email or not password:
            print("Missing email or password")
            return jsonify({"message": "Invalid request"}), 400
        
        user = get_user_by_email(email)        
        print(user)
        if not user:
            return jsonify({"message": "user not found"}), 401
            
        if not bcrypt.check_password_hash(user[4], password):
            print(bcrypt.check_password_hash(user[4]))
            return jsonify({"message": "password is not correct"}), 401
        access_token = create_access_token(identity=str(user[0]), additional_claims={"is_admin": user[6]}, expires_delta=timedelta(days=7))
        return jsonify({"access_token": access_token}), 200
    except Exception as e:
        traceback.print_exc()
        print("Login error:", str(e))
        return jsonify({"error": str(e)}), 500

def get_all_users():
    users = get_all_users_model()
    return users

def get_user_by_id(user_id):
    user = get_user_from_db(user_id)
    if user is None:
        return {"message": "User not found"}, 404
    return jsonify({"user": user}), 200

def update_user_by_token_controller(user_id, data):
    try:
        first_name = data["first_name"]
        last_name = data["last_name"]
        email = data["email"]
        fulluser = get_user_from_db(user_id)
        if fulluser is None:
            return jsonify({"message": "User not found"}), 404
        
        if bcrypt.check_password_hash(fulluser[4], data["password"]):
            hashed_new_password = bcrypt.generate_password_hash(data["newpasswors"]).decode("utf-8")
            update_user_by_token(user_id, first_name, last_name, email, hashed_new_password)
            return jsonify({"message": "User updated successfully"}), 200
        return jsonify({"message": "The password is not correct"}), 401
    except Exception as err:
        print("Error in update_user_by_id_controller:", err)
        return jsonify({"message": "Error updating user"}), 500
    
def update_user_by_id_controller(user_id, data):
    try:
        first_name = data["first_name"]
        last_name = data["last_name"]
        email = data["email"]
        fulluser = get_user_from_db(user_id)
        if fulluser is None:
            return jsonify({"message": "User not found"}), 404
        update_user_by_id(user_id, first_name, last_name, email)
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as err:
        print("Error in update_user_by_id_controller:", err)
        return jsonify({"message": "Error updating user"}), 500

def delete_user_by_id(user_id):
    delete_user_by_id(user_id)
    return jsonify({"message": "User deleted successfully"}), 200

def logout_user():
    return jsonify({"message": "Logout successful"}), 200