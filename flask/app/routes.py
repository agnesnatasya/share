from flask import Blueprint, request, jsonify
from . import db
from app import app
from .models import *

@app.route('/posts')
def home():
	post_list = Post.query.all()
	posts = []
	for post in post_list:
		posts.append({'postid' : post.postid, 'title' : post.title, 'body' : post.body})
		
	return jsonify({'posts' : posts})

@app.route('/login', methods = ['POST'])
def login():
	
	login_input = request.get_json()
	#return login_input['name']
	user = list(filter(lambda x: x.username == login_input['username'], User.query.all()))
	
	if not user:
		return 'Username not found', 406

	if user[0].password != login_input['password']:
		return 'Wrong password', 406

	return str(user[0].userid), 201


@app.route('/sign-up', methods = ['POST'])
def signup():
	user_data = request.get_json()
	users = User.query.all()
	error = None

	if not user_data['username']:
		error = 'Username is required', 406
	if not user_data['password']:
		error = 'Password is required', 406
	usernames = list(map(lambda x: x.username, users))
	if user_data['username'] in usernames:
		error = 'Username is already registered', 406

	if error is None:
		#user_number = len(users)

		new_user = User(username = user_data['username'], phone = user_data['phone'], address = user_data['address'], password = user_data['password'])
	
		db.session.add(new_user)
		db.session.commit()
		return 'Sign up successful!', 201
		
	return error


@app.route('/new-post/<string:userid>', methods = ['POST'])
def newpost(userid):
	post_data = request.get_json() #resto name, items, location, time

	new_post = Post(userid= userid, title = post_data.get('title'), body = post_data.get('body'))
	
	db.session.add(new_post)
	db.session.commit()
	
	return 'YAS', 201


@app.route('/my-posts/<string:userid>')
def myposts(userid):
	post_list = Post.query.all()
	myposts = []
	for post in post_list:
		if str(post.userid) == str(userid):
			myposts.append({'postid' : post.postid, 'title' : post.title, 'body' : post.body})
		
	return jsonify({'myposts' : myposts})

@app.route('/join-post/<string:postid>', methods = ['POST'])
def joinpost(postid):
	join_post_input = request.get_json()
	post = list(filter(lambda x: x.postid == int(postid), Post.query.all()))[0]

	new_post = Post(postid = int(postid), userid = post.userid, title = post.title, body = join_post_input.get('body'))
	db.session.delete(post)
	db.session.add(new_post)
	db.session.commit()
	return 'YAS', 201
