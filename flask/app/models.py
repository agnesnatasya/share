from app import db
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100))
    trips = relationship("Trip", secondary="rides", backref=db.backref('users'))


class Trip(db.Model):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator = db.Column(db.String(100))
    created_at = db.Column(db.Integer)
    depart_time = db.Column(db.Integer)
    origin = db.Column(db.String(300))
    destination = db.Column(db.String(300))
    capacity = db.Column(db.Integer)


rides = db.Table(
    'rides', db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('trip_id', db.Integer, db.ForeignKey('trips.id')))
