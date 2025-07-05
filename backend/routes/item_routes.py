from flask import Blueprint, request, jsonify
from services.item_service import create_item, get_all_items,delete_item_by_id,update_item_by_id


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

@item_route.route('/delete/<int:item_id>', methods=['DELETE', 'OPTIONS'])
def delete_item_by_id_route(item_id):
    if request.method == 'OPTIONS':
        return '', 204
    if delete_item_by_id(item_id):
        return jsonify({'message': 'Item deleted successfully'}), 200
    return jsonify({'error': 'Item not found or deletion failed'}), 404

@item_route.route('/update/<int:item_id>', methods=['PUT'])
def update_item_route(item_id):
    if request.method == 'OPTIONS':
        return '', 204
    data = request.get_json()
    name = data.get('name')
    image = data.get('image')
    
    if not name and not image:
        return jsonify({'error': 'No fields to update'}), 400
    
    updated_item = update_item_by_id(item_id, name, image)
    
    if updated_item:
        return jsonify({'message': 'Item updated successfully', 'item': updated_item}), 200
    return jsonify({'error': 'Item not found or update failed'}), 404