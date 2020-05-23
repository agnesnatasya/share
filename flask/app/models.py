from app import db

class User(db.Model):
	__tablename__ = 'user'
	userid = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(60))
	phone = db.Column(db.Integer)
	address = db.Column(db.String(60))
	password = db.Column(db.String(300))

class Post(db.Model):
	__tablename__ = 'post'
	postid = db.Column(db.Integer, primary_key = True)
	userid = db.Column(db.Integer, db.ForeignKey('user.userid'),
        nullable=False)
	created = db.Column(db.Time)
	title = db.Column(db.String(1000))
	body = db.Column(db.String)

class Comment(db.Model):
	commentid = db.Column(db.Integer, primary_key = True)
	postid = db.Column(db.Integer, db.ForeignKey('post.postid'),
        nullable=False)
	comment = db.Column(db.String)
	created = db.Column(db.Time)
