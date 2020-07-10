from flask import Blueprint, request, jsonify
from . import db
from app import app
from .models import *


@app.route('/trips')
def home():
    trips_db = Trip.query.all()
    trips = []
    for trip in trips_db:
        emails = list(map(lambda x: x.email, trip.users))
        trips.append({
            'id': trip.id,
            'creator': trip.creator,
            'created_at': trip.created_at,
            'depart_time': trip.depart_time,
            'origin': trip.origin,
            'destination': trip.destination,
            'capacity': trip.capacity,
            'user_emails': emails
        })

    return jsonify({'trips': trips})


@app.route('/new-post/<string:userid>', methods=['POST'])
def newpost(userid):
    post_data = request.get_json()  #resto name, items, location, time

    new_post = Post(userid=userid,
                    title=post_data.get('title'),
                    body=post_data.get('body'))

    db.session.add(new_post)
    db.session.commit()

    return 'YAS', 201


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
