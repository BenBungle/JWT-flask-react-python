"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=['POST'])
def signup():
    body = request.json.get()
    user = User.query.filter_by(email=body['email']).first()

    if not user:
        new_user = User(email=body['email'], password=body['password'], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        expire =  datetime.timedelta(minutes=1)
        new_token = create_access_token(identity=new_user.email,expires_delta=expire)
        return jsonify({
                "msg":"User was created",
                "token":new_token,
                "exp":expire.total_seconds()
            })
    else:
        return jsonify({"msg":"The email entered already has an associated account."})

@api.route("/login", methods=['POST'])
def login():
    body = request.json.get()
    user = User.query.filter_by(email=body['email']).first()
    if user:
        if user.password == body["password"]:
            expire = datetime.timedelta(minutes=1)
            token = create_access_token(identity=user.email, expires_delta=expire)
            return jsonify({
                "msg":"User exists",
                "token":token,
                "exp":expire.total_seconds(),
            })
        
        else:
            return jsonify({
            "msg": "Wrong email or password. Please try again."
        }), 401
    else:
        return jsonify({
            "msg": "Wrong email or password. Please try again."
        }), 401



@api.route("/check", methods=['GET'])
@jwt_required()
def check_user():
    identidad = get_jwt_identity()
    return jsonify({
        "logeado":True,
        "identidad":identidad
    })