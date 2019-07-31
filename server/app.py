from flask import Flask,request
from flask_cors import CORS
import json
from time import sleep

import pymongo
client = pymongo.MongoClient(host='localhost', port=27017)
db = client.test
collection = db.flask

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    res = {"status":"hello"}
    return json.dumps(res)

@app.route('/user',methods=['POST'])#POST
def create_user():
    user_id = request.form['user_id']
    password = request.form['password']
    print('user_id',user_id)
    print('password',password)
    sleep(1.5)

    result = collection.find_one({'user_id': user_id})
    print(result)
    if (result != None):
        print("NOT EMPTY")
        return json.dumps({"status":"create user fault","user":user_id}),409

    else:
        print("EMPTY")
        #insert new user
        flask = {
        'user_id': user_id,
        'password': password
        }
        insert_user = collection.insert_one(flask)
        print(insert_user)
        print(insert_user.inserted_id)
        return json.dumps({"status":"create user success","user":user_id}),201


@app.route('/user',methods=['GET'])#GET
def get_user():
    user_id = request.args['user_id']
    print(user_id)
    result = collection.find_one({'user_id': user_id})
    if (result != None):
        return json.dumps({"status":"get user success","user":user_id}),200
    elif (result == None):
        return json.dumps({"status":"user not in db","user":user_id}),404
    else:
         return json.dumps({"status":"get user forbidden","user":user_id}),403
   
@app.route('/user',methods=['PUT'])#PUT
def put_user():
    user_id = request.args['user_id']
    print(user_id)
    result = collection.find_one({'user_id': user_id})
    if (result != None):
        return json.dumps({"status":"get user success","user":user_id}),200
    elif (result == None):
        return json.dumps({"status":"user not in db","user":user_id}),404
    else:
         return json.dumps({"status":"get user forbidden","user":user_id}),403

@app.route('/user',methods=['login_POST'])#POST
def login_user():
    user_id = request.args['user_id']
    print(user_id)
    result = collection.find_one({'user_id': user_id})
    if (result != None):
        return json.dumps({"status":"user login success","user":user_id}),200
    elif (result == None):
        return json.dumps({"status":"user login fault","user":user_id}),404
    else:
        return json.dumps({"status":"user login forbidden","user":user_id}),403
   
    
if __name__ == "__main__":
    app.run(debug=True)