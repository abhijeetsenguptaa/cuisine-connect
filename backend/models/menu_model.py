from bson.objectid import ObjectId


class Menu:
    def __init__(self, name, price, quantity, availability, image):
        self.name = name
        self.price = price
        self.quantity = quantity
        self.availability = availability
        self.image = image

    def to_dict(self):
        return {
            "name": self.name,
            "price": self.price,
            "quantity": self.quantity,
            "availability": self.availability,
            "image": self.image,
        }
