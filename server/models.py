from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(15))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    serialize_rules = ('-created_at', '-updated_at', '-blogs.user')
    blogs = db.relationship('Blog', backref='user', lazy=True)

    # email must have @ symbol to be an email
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('Email must include `@` symbol')
        return address
    
    # password must have at least 4 charaters
    @validates('password')
    def validate_password(self, key, value):
        if len(value) < 4:
            raise ValueError('Password must be longer than 4 characters')
        return value

class Blog(db.Model, SerializerMixin):
    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    text = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ('-created_at',)


class Thought(db.Model, SerializerMixin):
    __tablename__ = 'thoughts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    text = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ('-created_at',)