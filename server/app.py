from flask import Flask, request, make_response, jsonify, session, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Blog, Thought

app = Flask(__name__)
app.config['SECRET_KEY'] = 'blogging'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

# allowed_ip = ''
# class IPValidation(Resource):
#     def get(self):
#         # get the users IP address
#         user_ip = request.remote_addr
#         print(user_ip)
#         # check if the users ip matches the allowed ip
#         if user_ip == allowed_ip:
#             return jsonify({user_ip: True}), 200
#         else:
#             return jsonify({user_ip: False}), 403
# api.add_resource(IPValidation, '/validate-ip')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template('index.html')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
api.add_resource(Users, '/users')

class Blogs(Resource):
    def get(self):
        blogs = [blog.to_dict() for blog in Blog.query.all()]
        return make_response(jsonify(blogs), 200)
api.add_resource(Blogs, '/blogs')

class Thoughts(Resource):
    def get(self):
        thoughts = [thought.to_dict() for thought in Thought.query.all()]
        return make_response(jsonify(thoughts), 200)
api.add_resource(Thoughts, '/thoughts')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)