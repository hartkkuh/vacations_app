from models.db_config import get_db_connection

def get_all_roles():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM roles")
    roles = cur.fetchall()
    cur.close()
    conn.close()
    return roles