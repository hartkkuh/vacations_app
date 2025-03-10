from .db_config import get_db_connection
from flask import jsonify

def register(first_name, last_name, email, password):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (%s, %s, %s, %s, %s) RETURNING user_id", (first_name, last_name, email, password, 0))
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return user_id

def get_user_by_email(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT users.user_id, users.first_name, users.last_name, users.email, users.password, roles.role_name, roles.is_admin FROM users JOIN roles ON users.role_id = roles.role_id WHERE users.email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user

def get_all_users_model():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT users.user_id, users.first_name, users.last_name, users.email, users.password, roles.role_name, roles.is_admin FROM users JOIN roles ON users.role_id = roles.role_id")
    users = cur.fetchall()
    cur.close()
    conn.close()
    
    return [
        {
            "user_id": user[0],
            "first_name": user[1],
            "last_name": user[2],
            "email": user[3],
            "password": user[4],
            "role_name": user[5],
            "is_admin": user[6]
        } for user in users
    ]

def get_user_by_id(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT users.user_id, users.first_name, users.last_name, users.email, users.password, roles.role_name, roles.is_admin FROM users JOIN roles ON users.role_id = roles.role_id WHERE user_id = %s", (user_id, ))
        user = cur.fetchone()
        if not user or user is None:
            raise Exception("user not fund")
        cur.close()
        conn.close()
        return user
    except Exception as err:
        print(err)
        return {"message": f"err: {err}"}, 404

def update_user_by_token(user_id, first_name, last_name, email, password):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
                    UPDATE users
                    SET first_name = %s, last_name = %s, email = %s, password = %s, role_id = %s
                    WHERE user_id = %s;
                    """, (first_name, last_name, email, password, 1, user_id))
        conn.commit()
        if cur.rowcount == 0:
            print("No rows were updated, user may not exist.")
            raise Exception("User not found")
        cur.close()
        conn.close()
        return jsonify({"mwssage": "user updat sucses"}), 200
    except Exception as err:
        print(err)
        return jsonify({"message": "error update user", "err": err}), 404

def update_user_by_id(user_id, first_name, last_name, email):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
                    UPDATE users
                    SET first_name = %s, last_name = %s, email = %s, role_id = %s
                    WHERE user_id = %s;
                    """, (first_name, last_name, email, 1, user_id))
        conn.commit()
        if cur.rowcount == 0:
            print("No rows were updated, user may not exist.")
            raise Exception("User not found")
        cur.close()
        conn.close()
        return jsonify({"mwssage": "user updat sucses"}), 200
    except Exception as err:
        print(err)
        return jsonify({"message": "error update user", "err": err}), 404


def delete_user_by_id(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM users WHERE user_id = %s", (user_id,))
    conn.commit()
    cur.close()
    conn.close()

def total_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM users")
    total = cur.fetchone()[0]
    cur.close()
    conn.close()
    return total