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
	user = list(filter(lambda x: x.name == login_input['name'], User.query.all()))
	
	if not user:
		return 'Login not found Fail', 406

	if user[0].password != login_input['password']:
		return 'Wrong password', 406

	return str(user[0].userid), 201


@app.route('/sign-up', methods = ['POST'])
def signup():
	user_data = request.get_json()
	users = User.query.all()
	error = None

	if not user_data['name']:
		error = 'Name is required', 406
	if not user_data['password']:
		error = 'Password is required', 406
	usernames = list(map(lambda x: x.name, users))
	if user_data['name'] in usernames:
		error = 'User is already registered', 406

	if error is None:
		user_number = len(users)

		new_user = User(userid = user_number + 1, name = user_data['name'], phone = user_data['phone'], address = user_data['address'], password = user_data['password'])
	
		db.session.add(new_user)
		db.session.commit()
		return 'Sign up successful!', 201
		
	return error
