from flask import Blueprint, request, jsonify
import bcrypt
import jwt
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from configs.connection import get_db_connection
from models.user_model import User

userRoute = Blueprint("user", __name__)

# User registration route
@userRoute.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Hash the password before storing it in the database
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    db = get_db_connection()

    # Get the "users" collection
    users_collection = db.users

    # Check if the email already exists in the "users" collection
    if users_collection.find_one({"email": email}):
        return (
            jsonify(
                {"message": "Email already exists. Please choose a different email."}
            ),
            409,
        )

    # Insert the new user details into the "users" collection
    user_data = User(name=name, email=email, password=hashed_password)
    users_collection.insert_one(user_data.to_dict())

    return jsonify({"message": f"Registration successful for email: {email}"})


# User login route
@userRoute.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Connect to the MongoDB database
    db = get_db_connection()

    # Get the "users" collection
    users_collection = db.users

    # Find the user with the given email in the "users" collection
    user = users_collection.find_one({"email": email})

    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        # Generate a JWT token upon successful login
        token = create_access_token(identity=user["email"])

        return jsonify({"message": "Login successful!", "token": token})

    else:
        return jsonify({"message": "Invalid credentials. Please try again."})


# Protected route that requires JWT authentication
@userRoute.route("/protected", methods=["GET"])
@jwt_required()
def protected_route():
    current_user_email = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user_email}! You are in a protected route."})


# Other routes...
# ...

# No need for the `initialize_jwt(app)` function here, as we are initializing JWTManager
# directly in the main application file.
