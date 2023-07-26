from flask import jsonify, Blueprint, request
from configs.connection import get_db_connection
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models.cart_model import Cart
from bson.objectid import ObjectId

cartRoute = Blueprint("cart", __name__)

# View cart items for the current user
@cartRoute.route('/cartdetails', methods=["GET"])
@jwt_required()
def cart_list():
    current_user = get_jwt_identity()

    db = get_db_connection()

    # Get the "cart" collection
    cart_collection = db.cart

    # Fetch all cart items for the current user
    cart_items = list(cart_collection.find({"user": current_user}))

    # Convert cart items to a list of dictionaries
    serialized_cart_items = [
        {
            "item_name": item["item_name"],
            "quantity": item["quantity"],
            "total_price": item["total_price"],
            "status": item["status"]
        }
        for item in cart_items
    ]

    return jsonify({"cart_items": serialized_cart_items})


# Add an item to the cart
@cartRoute.route('/purchase', methods=["POST"])
@jwt_required()
def purchase_item():
    data = request.get_json()
    item_name = data.get('item_name')
    quantity = data.get('quantity')
    total_price = data.get('total_price')
    status = data.get('status')

    db = get_db_connection()

    # Get the "cart" collection
    cart_collection = db.cart

    cart_item = Cart(user=get_jwt_identity(), item_name=item_name, quantity=quantity, total_price=total_price, status=status)

    cart_collection.insert_one(cart_item.to_dict())

    return jsonify({'msg': 'Item Added to the Cart'})


# Update an item in the cart by _id
@cartRoute.route('/updatecart/<string:item_id>', methods=["PATCH"])
@jwt_required()
def update_cart(item_id):
    current_user = get_jwt_identity()
    data = request.get_json()

    db = get_db_connection()

    # Get the "cart" collection
    cart_collection = db.cart

    # Convert the item_id string to ObjectId
    item_id_obj = ObjectId(item_id)

    # Find the cart item by ID for the current user
    cart_item = cart_collection.find_one({"user": current_user, "_id": item_id_obj})

    if cart_item:
        # Update the cart item with the provided data
        cart_collection.update_one(
            {"_id": item_id_obj},
            {
                "$set": {
                    "item_name": data.get('item_name'),
                    "quantity": data.get('quantity'),
                    "total_price": data.get('total_price'),
                    "status": data.get('status')
                }
            }
        )
        return jsonify({"message": "Cart item updated successfully."})
    else:
        return jsonify({"message": "Cart item not found."}), 404


# Delete an item from the cart by _id
@cartRoute.route('/deletecart/<string:item_id>', methods=["DELETE"])
@jwt_required()
def delete_cart(item_id):
    current_user = get_jwt_identity()

    db = get_db_connection()

    # Get the "cart" collection
    cart_collection = db.cart

    # Convert the item_id string to ObjectId
    item_id_obj = ObjectId(item_id)

    # Find the cart item by ID for the current user
    cart_item = cart_collection.find_one({"user": current_user, "_id": item_id_obj})

    if cart_item:
        # Delete the cart item
        cart_collection.delete_one({"_id": item_id_obj})
        return jsonify({"message": "Cart item deleted successfully."})
    else:
        return jsonify({"message": "Cart item not found."}), 404