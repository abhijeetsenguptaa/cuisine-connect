from flask import Flask
from flask_cors import CORS
from routes.user_route import userRoute
from routes.menu_route import menuRoute
from routes.cart_route import cartRoute
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the JWTManager with the Flask app
jwt = JWTManager(app)

@app.route('/')
def home():
    return 'Welcome to Cuisine Connect'

# Register blueprints for user, menu, and cart routes
app.register_blueprint(userRoute, url_prefix="/user")
app.register_blueprint(menuRoute, url_prefix="/menu")
app.register_blueprint(cartRoute, url_prefix="/cart")

# Set the secret key for JWT token creation
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")  # Change this to a secure secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Optional: Set the token to never expire (only for testing)

# Rest of your code...
# ...

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
