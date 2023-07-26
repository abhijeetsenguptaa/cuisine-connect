from flask import jsonify, request, Blueprint
from configs.connection import get_db_connection
from models.menu_model import Menu
from bson.objectid import ObjectId

menuRoute = Blueprint("menu", __name__)


@menuRoute.route("/")
def menu():
    db = get_db_connection()

    menu_collection = db.menu

    # Fetch all items from the "menu" collection
    items = list(menu_collection.find())

    # Convert the MongoDB documents to a list of dictionaries
    menu_items = []
    for item in items:
        menu_item = {
            "name": item["name"],
            "price": item["price"],
            "quantity": item["quantity"],
            "availability": item["availability"],
            "image": item["image"],
        }
        menu_items.append(menu_item)

    return jsonify({"menu_items": menu_items})


@menuRoute.route("/insert", methods=["POST"])
def insertItem():
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    quantity = data.get("quantity")
    availability = data.get("availability")
    image = data.get("image")

    db = get_db_connection()

    menu_collection = db.menu

    item = Menu(
        name=name,
        price=price,
        quantity=quantity,
        availability=availability,
        image=image,
    )
    menu_collection.insert_one(item.to_dict())

    return jsonify({"msg": "Item has been added."})


@menuRoute.route("/update/<string:item_id>", methods=["PUT"])
def updateMenuItem(item_id):
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    quantity = data.get("quantity")
    availability = data.get("availability")
    image = data.get("image")

    db = get_db_connection()

    menu_collection = db.menu

    # Check if the item exists in the "menu" collection
    existing_item = menu_collection.find_one({"_id": ObjectId(item_id)})
    if not existing_item:
        return jsonify({"message": "Item not found"}), 404

    # Update the item fields if provided in the request
    update_data = {}
    if name:
        update_data["name"] = name
    if price:
        update_data["price"] = price
    if quantity:
        update_data["quantity"] = quantity
    if availability:
        update_data["availability"] = availability
    if image:
        update_data["image"] = image

    # Perform the update operation
    menu_collection.update_one({"_id": ObjectId(item_id)}, {"$set": update_data})

    return jsonify({"message": "Item updated successfully"})


@menuRoute.route("/delete/<item_id>", methods=["DELETE"])
def deleteMenuItem(item_id):
    db = get_db_connection()

    menu_collection = db.menu

    # Check if the item exists in the "menu" collection
    existing_item = menu_collection.find_one({"_id": ObjectId(item_id)})
    if not existing_item:
        return jsonify({"message": "Item not found"}), 404

    # Perform the delete operation
    menu_collection.delete_one({"_id": ObjectId(item_id)})

    return jsonify({"message": "Item deleted successfully"})
