class Cart:
    def __init__(self, user, item_name, quantity, total_price, status):
        self.user = user
        self.item_name = item_name
        self.quantity = quantity
        self.total_price = total_price
        self.status = status

    def to_dict(self):
        return {
            "user": self.user,
            "item_name": self.item_name,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "status": self.status,
        }
