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

def get_total_likes():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM likes")
    total_likes = cur.fetchone()[0]
    cur.close()
    conn.close()
    return total_likes

def get_total_likes_by_vacation_id():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    SELECT v.vacation_id, c.name AS country_name, v.vacation_description, COUNT(l.user_id) AS like_count
    FROM vacations v
    LEFT JOIN likes l ON v.vacation_id = l.vacation_id
    LEFT JOIN countries c ON v.country_id = c.country_id
    GROUP BY v.vacation_id, c.name, v.vacation_description
    ORDER BY v.vacation_id
    """, )
    total_likes = cur.fetchall()
    cur.close()
    conn.close()
    return total_likes