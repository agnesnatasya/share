from app import db


class User(db.Model):
    __tablename__ = 'users'
    id_token = db.Column(db.String(1000))
    email = db.Column(db.String(100))
    trips = relationship("Trip", secondary="rides")


class Trip(db.Model):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key=True)
    creator = db.Column(db.String(100))
    created_at = db.Column(db.DateTime)
    depart_time = db.Column(db.DateTime)
    origin = db.Column(db.String(300))
    destination = db.Column(db.String(300))
    capacity = db.Column(db.Integer)
    users = relationship("User", secondary="rides")


class Ride(db.Model):
    __tablename__ = 'rides'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(300), db.ForeignKey('users.id'))
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))
