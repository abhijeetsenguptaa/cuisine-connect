from flask import Blueprint, request, jsonify
import bcrypt
import jwt
from configs.connection import get_db_connection
from models.user_model import User


userRoute = Blueprint("user", __name__)


@userRoute.route("/")
def user():
    db = get_db_connection()

    # Get the "email" query parameter from the request URL
    # If the parameter is not provided, it will default to None
    email_query = request.args.get("email")

    # Build the query based on the "email" parameter
    # If "email_query" is None, it won't filter by name
    query = {}
    if email_query is not None:
        query["email"] = email_query

    # Assuming "users" is the collection you want to retrieve data from
    users = list(db.users.find(query))

    # Assuming that each user document is serializable to JSON
    serialized_users = [
        {"name": user["name"], "email": user["email"]} for user in users
    ]

    return jsonify({"data": serialized_users})


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
        token = jwt.encode({"email": user["email"]}, "abhijeet", algorithm="HS256")

        return jsonify({"message": "Login successful!", "token": token})

    else:
        return jsonify({"message": "Invalid credentials. Please try again."})
