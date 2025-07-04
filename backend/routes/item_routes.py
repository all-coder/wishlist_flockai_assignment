from flask import Blueprint, request, jsonify
from services.item_service import create_item, get_all_items

item_route = Blueprint('item', __name__, url_prefix='/item')   

@item_route.route('/create', methods=['POST'])
def create_item_route():
    data = request.get_json()
    name = data.get('name')
    image = data.get('image', './image.jpg')
    user_id = data.get('user_id')
    wishlist_id = data.get('wishlist_id')
    if not all([name, user_id, wishlist_id]):
        return jsonify({'error': 'Missing required fields'}), 400
    item = create_item(name, image, user_id, wishlist_id)
    if item:
        return jsonify({'message': 'Item created', 'item_id': item.id}), 201
    return jsonify({'error': 'Failed to create item'}), 400

@item_route.route('/all',methods=['GET'])
def get_all_items_route():
    items = get_all_items()
    return jsonify(items), 200