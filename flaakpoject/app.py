from flask import Flask
from flask_jwt_extended import JWTManager
from routing.users_routing import users_bp
from routing.countries_routing import countries_bp
from routing.roles_routing import roles_bp
from routing.vacations_routing import vacations_bp
from routing.likes_routing import likes_bp
from datetime import timedelta
from flask_cors import CORS
import os

jwt = JWTManager()

app = Flask(__name__, static_folder='../reactapp')
CORS(app, supports_credentials=True)

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
app.config['JWT_ALGORITHM'] = 'HS256'

jwt = JWTManager(app)

app.register_blueprint(users_bp)
app.register_blueprint(countries_bp)
app.register_blueprint(roles_bp)
app.register_blueprint(vacations_bp)
app.register_blueprint(likes_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
else: print("not")
