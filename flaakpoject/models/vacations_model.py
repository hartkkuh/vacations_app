from .db_config import get_db_connection

def add_vacation(country_id, vacation_description, start_date, end_date, price, image_url=""):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO vacations (country_id, vacation_description, start_date, end_date, price, image_url) VALUES(%s, %s, %s, %s, %s, %s) RETURNING vacation_id;", (country_id, vacation_description, start_date, end_date, price, image_url))
    vacation_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return vacation_id


def get_all_vacations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT v.vacation_id, v.vacation_description, v.start_date, v.end_date, v.price, v.image_url, c.name AS country_name
        FROM vacations v
        JOIN countries c ON v.country_id = c.country_id;
    """)
    vacations = cur.fetchall()
    cur.close()
    conn.close()
    return vacations

def get_vacations_by_country_id(country_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                SELECT * FROM vacations
                WHERE country_id = %s;
                """, (country_id,))
    vacations = cur.fetchall()
    cur.close()
    conn.close()
    return vacations

def get_vacation_by_id(vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                SELECT * FROM vacations
                WHERE vacation_id = %s;
                """, (vacation_id,))
    vacation = cur.fetchone()
    cur.close()
    conn.close()
    return vacation

def delete_vacation(vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                DELETE FROM vacations
                WHERE vacation_id = %s;
                """, (vacation_id,))
    conn.commit()
    cur.close()
    conn.close()

def update_vacation(vacation_id, country_id, vacation_description, stars_date, end_date, price, image_url=""):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                UPDATE vacations SET country_id = %s, vacation_description = %s, start_date = %s, end_date = %s, price = %s, image_url = %s WHERE vacation_id = %s;
                """, (country_id, vacation_description, stars_date, end_date, price, image_url, vacation_id))
    conn.commit()
    cur.close()
    conn.close()

def get_end_vacations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                SELECT COUNT(*) FROM vacations
                WHERE end_date::date < CURRENT_DATE;
                """)
    expired_vacations = cur.fetchone()[0]
    cur.close()
    conn.close()
    return expired_vacations

def get_start_vacations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                SELECT COUNT(*) FROM vacations
                WHERE start_date::date > CURRENT_DATE;
                """)
    expired_vacations = cur.fetchone()[0]
    cur.close()
    conn.close()
    return expired_vacations

def get_on_vacations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
                SELECT COUNT(*) FROM vacations
                WHERE start_date::date <= CURRENT_DATE AND end_date::date >= CURRENT_DATE;
                """)
    expired_vacations = cur.fetchone()[0]
    cur.close()
    conn.close()
    return expired_vacations