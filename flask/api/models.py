from . import db

class User(db.Model):
	userid = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(60))
	phone = db.Column(db.Integer)
	address = db.Column(db.String(60))
	password = db.Column(db.String(300))

class Order(db.Model):
	orderid = db.Column(db.Integer, primary_key = True)
	userid = db.Column(db.Integer)
	restaurant = db.Column(db.String(60))
	items = db.Column(db.String(1000))
	deadline_time = db.Column(db.String(100))
	shipping_address = db.Column(db.String(120))