from flask import Blueprint, request, jsonify
from services.user_service import create_user,login_user,get_all_users,get_user_wishlist_ids

user_route = Blueprint('user', __name__, url_prefix='/user')

@user_route.route('/signup', methods=['POST'])
def create_user_route():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    # hashed_password = generate_password_hash(password)
    user = create_user(name, email, password)
    return jsonify({'message': 'User created', 'user_id': user.id}), 201


@user_route.route('/login', methods=['POST'])
def login_user_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    user = login_user(email=email, password=password)
    if user:
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@user_route.route('/all', methods=['GET'])
def get_all_users_route():
    users = get_all_users()
    return jsonify(users), 200

@user_route.route("/<int:user_id>/wishlists", methods=['GET'])
def get_user_wishlist_ids_route(user_id):
    wishlist_ids = get_user_wishlist_ids(user_id)
    return jsonify({'wishlist_ids': wishlist_ids})

