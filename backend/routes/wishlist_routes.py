from flask import Blueprint, request, jsonify
from services.wishlist_service import create_wishlist,get_all_wishlists,add_user_to_wishlist,get_wishlist_items_by_id
wishlist_route = Blueprint('wishlist', __name__, url_prefix='/wishlist')

@wishlist_route.route('/create', methods=['POST'])
def create_wishlist_route():
    data = request.get_json()
    name = data.get('name')
    user_count = data.get('user_count', 0)
    description = data.get('description')

    if not name:
        return jsonify({'error': 'Name is required'}), 400

    wishlist = create_wishlist(name, user_count, description)
    return jsonify({'message': 'Wishlist created', 'wishlist_id': wishlist.id}), 201

@wishlist_route.route('/all', methods=['GET'])
def get_all_wishlists_route():
    wishlists = get_all_wishlists()
    return jsonify(wishlists), 200

@wishlist_route.route('/add_user', methods=['POST'])
def add_user_to_wishlist_route():
    data = request.get_json()
    wishlist_id = data.get('wishlist_id')
    user_id = data.get('user_id')

    if not all([wishlist_id, user_id]):
        return jsonify({'error': 'Missing wishlist_id or user_id'}), 400

    wishlist = add_user_to_wishlist(wishlist_id, user_id)
    if wishlist:
        return jsonify({'message': 'User added to wishlist', 'wishlist_id': wishlist.id}), 200
    else:
        return jsonify({'error': 'Invalid wishlist_id or user_id'}), 404

@wishlist_route.route('/<int:wishlist_id>', methods=['GET'])
def get_items_by_wishlist_id_route(wishlist_id):
    items = get_wishlist_items_by_id(wishlist_id)
    if items:
        return jsonify(items), 200
    return jsonify({'error': 'No items found for this wishlist'}), 404