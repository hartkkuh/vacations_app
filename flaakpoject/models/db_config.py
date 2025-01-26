import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "sslmode": "require"
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def test_db_connection():
    try:
        conn = get_db_connection()
        print("Connection successful")
        conn.close()
    except Exception as e:
        print("Connection failed:", e)