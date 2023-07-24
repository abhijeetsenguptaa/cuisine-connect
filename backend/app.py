import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.user_route import userRoute
from routes.menu_route import menuRoute

app = Flask(__name__)
CORS(app)

@app.route("/")
def Home():
    return jsonify({"msg": "Welcome to Cuisine-Connect"})


app.register_blueprint(userRoute, url_prefix="/user")
app.register_blueprint(menuRoute, url_prefix="/menu")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
