from flask import Flask, request, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, validate, ValidationError
from flask_cors import CORS
from flask_bcrypt import Bcrypt, check_password_hash

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "ProbandoProbando"
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:33577461@localhost/flaskmysql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150),nullable=False)
    username = db.Column(db.String(255), unique=True,nullable=False)
    email = db.Column(db.String(150), unique=True,nullable=False)
    password = db.Column(db.String(255),nullable=False)

    def __init__(self, name, username, email, password):
        self.name = name
        self.username = username
        self.email = email
        self.password = password

        
db.create_all()

# class UserSchema(ma.Schema):
#      class Meta:
#          fields = ('id', 'name', 'username', 'email')

class UserSchema(Schema):
        id = fields.Int()
        name = fields.Str(validate=validate.Length(min=5))
        username = fields.Str(validate=validate.Length(min=5))
        email = fields.Str(validate=validate.Length(min=5))

user_schema = UserSchema()
users_schema = UserSchema(many=True)

CORS(app)
bcrypt = Bcrypt(app)


# def tokenReq(func):
#     @wraps(func)
#     def wrapped(*args, **kwargs):
#         token = request.args.get('token')
#         if not token:
#             return jsonify({'message': 'Falta el token'}), 403
#         try:
#             data = jwt.decode(token, app.config['SECRET_KEY'])
#         except:
#             return jsonify({'message': 'Token inválido'}), 403
#         return func(*args, **kwargs)
#     return wrapped
                


# Crear usuario en la DB
@app.route('/users', methods=['POST'])
def createUser():

        name = request.json['name'],
        username = request.json['username'],
        email = request.json['email'],
        hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('UTF-8')
        

        newuser = User(name, username, email, hashed_password)
        db.session.add(newuser)
        db.session.commit()

        return jsonify()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if data['username'] and data['password']:
        user = User.query.filter_by(username=data['username']).first()
        if user: 
            password = user.password
            if bcrypt.check_password_hash(password, data['password']):
                print("Contraseña válida")
                access_token = create_access_token(identity=data['username'])
                return jsonify(token=access_token)
            else:
                print("Contraseña no válida")
        # token = jwt.encode({
        #     'user': data['username'],
        #     'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        # },
        # app.config['SECRET_KEY'])
        
    # else:
    return jsonify({'error': 'Usuario y contraseña inválidos'}), 401     

# Mostrar todos los usuarios en la DB
@app.route('/users', methods=['GET'])
@jwt_required()
def getUsers():
    allusers = User.query.all()
    result = users_schema.dump(allusers)
    return jsonify(result)

# Mostrar usuario por id
@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = User.query.get(id)
    result = user_schema.dump(user)
    return jsonify(result)

# Eliminar usuario por id en la DB
@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return jsonify(), 200

# Actualizar usuario por id en la DB
@app.route('/users/<id>', methods=['PATCH'])
def updateuser(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Id no encontrado'}), 404    

    name = request.json['name']
    email = request.json['email']
    hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('UTF-8')
    
    user.name = name
    user.email = email
    user.password = hashed_password
    

    db.session.commit()
    return jsonify(user_schema.dump(user))

@app.route('/prueba', methods=['GET'])
def prueba():
    prueba = user_schema.validate({'name':'Ire'})
    # try:
    #     prueba = user_schema.load({'name':'Ire'})
    #     print(prueba) 
    # except ValidationError as err:
    #     print(err.messages)  # => {"email": ['"foo" is not a valid email address.']}
    #     print(err.valid_data)  # => {"name": "John"}
    
    return jsonify(len(prueba))    
      


if __name__ == '__main__':
    app.run(debug=True)