from flask import jsonify, request
from models.roles_model import get_all_roles

def fetch_all_roles():
    roles = get_all_roles()
    return jsonify([{"id": role[0], "name": role[1]} for role in roles]), 200