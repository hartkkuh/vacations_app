from models.db_config import get_db_connection

def add_countrie(name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO countries (name) VALUES (%s) RETURNING country_id", (name, ))
    countrie_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return countrie_id

def get_all_countries():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM countries")
    countries = cur.fetchall()
    cur.close()
    conn.close()
    return countries