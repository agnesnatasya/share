from flask import Blueprint, request, jsonify
from . import db
from app import app
from .models import *


@app.route('/trips/<string:email>')
def trips(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email)
        db.session.add(user)
        db.session.commit()

    trips_db = Trip.query.all()
    trips = []
    for trip in trips_db:
        emails = list(map(lambda x: x.email, trip.users))
        join = email in emails
        trips.append({
            'id': trip.id,
            'creator': trip.creator,
            'created_at': trip.created_at,
            'depart_time': trip.depart_time,
            'origin': trip.origin,
            'destination': trip.destination,
            'capacity': trip.capacity,
            'user_emails': emails,
            'join': join
        })

    return jsonify({'trips': trips})


@app.route('/new-trip/<string:email>', methods=['POST'])
def new_trip(email):
    trip_data = request.get_json()

    new_trip = Trip(
        creator=email,
        created_at=trip_data.get('createdAt'),
        depart_time=trip_data.get('departTime'),
        origin=trip_data.get('origin'),
        destination=trip_data.get('destination'),
        capacity=trip_data.get('capacity'),
    )

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email)
    new_trip.users.append(user)
    db.session.add(user)
    db.session.add(new_trip)
    db.session.commit()

    return 'success', 201


@app.route('/join-trip/<string:email>/<string:id>', methods=['POST'])
def join_trip(email, id):
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email)

    trip = Trip.query.filter_by(id=id).first()

    if not (user in trip.users) and not (trip in user.trips):
        trip.users.append(user)

    db.session.add(user)
    db.session.add(trip)

    db.session.commit()

    return 'success', 200


@app.route('/quit-trip/<string:email>/<string:id>', methods=['POST'])
def quit_trip(email, id):
    user = User.query.filter_by(email=email).first()

    trip = Trip.query.filter_by(id=id).first()

    user.trips.remove(trip)
    trip.users.remove(user)

    db.session.add(user)
    db.session.add(trip)

    db.session.commit()

    return 'success', 200


@app.route('/my-posts/<string:userid>')
def myposts(userid):
    post_list = Post.query.all()
    myposts = []
    for post in post_list:
        if str(post.userid) == str(userid):
            myposts.append({
                'postid': post.postid,
                'title': post.title,
                'body': post.body
            })

    return jsonify({'myposts': myposts})
