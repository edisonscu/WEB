from flask import Flask, request, render_template
from flask_cors import CORS
import json
import os
import requests
from time import sleep
import pymongo
from pprint import pprint
from dotenv import load_dotenv

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(ROOT_DIR, '..', 'client', 'build')

dotenv_path = os.path.join(ROOT_DIR, '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path, override=True)

client = pymongo.MongoClient(host='127.0.0.1', port=27017)
db = client.flask
collection = db.flask_test

app = Flask(__name__, static_folder=BUILD_DIR,
            template_folder='../client/build', static_url_path="")
CORS(app)


@app.route('/')
def home():
    if 'code' in request.args:
        code = request.args['code']
        res = requests.post('https://api.line.me/oauth2/v2.1/token',
                            headers={
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data={
                                'grant_type': 'authorization_code',
                                'redirect_uri': request.url_root,
                                'client_id': os.environ.get('LOGIN_ID'),
                                'client_secret': os.environ.get('LOGIN_SECRET'),
                                'code': code
                            })
        data = res.content.decode()
        data_dict = json.loads(data)
        pprint(data_dict)
        return render_template('index.html', token=data_dict['id_token'])
    return render_template('index.html')


@app.route('/user', methods=['POST'])  # POST
def create_user():
    user_id = request.form['user_id']
    password = request.form['password']
    print('user_id', user_id)
    print('password', password)
    sleep(1.5)

    result = collection.find_one({'user_id': user_id})
    print(result)
    if (result != None):
        print("NOT EMPTY")
        return json.dumps({"status": "create user fault", "user": user_id}), 409

    else:
        print("EMPTY")
        # insert new user
        flask = {
            'user_id': user_id,
            'password': password
        }
        insert_user = collection.insert_one(flask)
        print(insert_user)
        print(insert_user.inserted_id)
        return json.dumps({"status": "create user success", "user": user_id}), 201


@app.route('/user', methods=['GET'])  # GET
def get_user():
    user_id = request.args['user_id']
    print(user_id)
    result = collection.find_one({'user_id': user_id})
    if (result != None):
        return json.dumps({"status": "get user success", "user": user_id}), 200
    elif (result == None):
        return json.dumps({"status": "user not in db", "user": user_id}), 404
    else:
        return json.dumps({"status": "get user forbidden", "user": user_id}), 403


@app.route('/user', methods=['PUT'])  # PUT
def put_user():
    user_id = request.args['user_id']
    print(user_id)
    result = collection.find_one({'user_id': user_id})
    if (result != None):
        return json.dumps({"status": "get user success", "user": user_id}), 200
    elif (result == None):
        return json.dumps({"status": "user not in db", "user": user_id}), 404
    else:
        return json.dumps({"status": "get user forbidden", "user": user_id}), 403


@app.route('/user/<id>/login', methods=['POST'])  # POST
def login_user(id):
    user_id = id
    print(user_id)
    result = collection.find_one({'user_id': user_id})
    if (result != None):
        return json.dumps({"status": "user login success", "user": user_id}), 200
    elif (result == None):
        return json.dumps({"status": "user login fault", "user": user_id}), 404
    else:
        return json.dumps({"status": "user login forbidden", "user": user_id}), 403


if __name__ == "__main__":
    app.run(debug=True)