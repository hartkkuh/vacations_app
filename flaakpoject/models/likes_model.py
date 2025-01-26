from .db_config import get_db_connection

def add_like(user_id, vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO likes (user_id, vacation_id) VALUES(%s, %s);", (user_id, vacation_id))
    conn.commit()
    cur.close()
    conn.close()

def get_all_likes():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM likes;")
    likes = cur.fetchall()
    cur.close()
    conn.close()
    return likes

def get_likes_by_vacation_id(vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM likes WHERE vacation_id = %s;", (vacation_id,))
    likes = cur.fetchall()
    cur.close()
    conn.close()
    return likes

def delete_like(user_id, vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM likes WHERE user_id = %s AND vacation_id = %s;", (user_id, vacation_id))
    conn.commit()
    cur.close()
    conn.close()

def get_likes_by_user_id(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM likes WHERE user_id = %s;", (user_id,))
    likes = cur.fetchall()
    cur.close()
    conn.close()
    return likes
