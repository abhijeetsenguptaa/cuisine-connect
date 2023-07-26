class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        self.role = "customer"

    def to_dict(self):
        return {"name": self.name, "email": self.email, "password": self.password, "role" : self.role}
