from flask import Blueprint, request, jsonify
from . import db
from app import app
from .models import *
import datetime


@app.route('/trips/<string:email>')
def trips(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        new_user = User(email=email)
        db.session.add(new_user)
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
        created_at=datetime.datetime.utcfromtimestamp(
            trip_data.get('createdAtFormatted') / 1000),
        depart_time=datetime.datetime.utcfromtimestamp(
            trip_data.get('departTimeFormatted') / 1000),
        origin=trip_data.get('origin'),
        destination=trip_data.get('destination'),
        capacity=trip_data.get('capacity'),
    )

    db.session.add(new_trip)
    db.session.commit()

    return 'success', 201


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


@app.route('/join-post/<string:postid>', methods=['POST'])
def joinpost(postid):
    join_post_input = request.get_json()
    post = list(filter(lambda x: x.postid == int(postid), Post.query.all()))[0]

    new_post = Post(postid=int(postid),
                    userid=post.userid,
                    title=post.title,
                    body=join_post_input.get('body'))
    db.session.delete(post)
    db.session.add(new_post)
    db.session.commit()
    return 'YAS', 201
