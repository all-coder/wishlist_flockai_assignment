from database import db
from models.item_model import Item
from services.utils import check_user_id, check_wishlist_id

def create_item(name=None, image="./image.jpg", user_id=None, wishlist_id=None):
    if name and check_user_id(user_id) and check_wishlist_id(wishlist_id):
        new_item = Item(name=name, image=image, user_id=user_id, wishlist_id=wishlist_id)
        db.session.add(new_item)
        db.session.commit()
        return new_item
    return None

# gets all items in the database 
def get_all_items():
    items = db.session.query(Item).all()
    return [item.to_dict() for item in items]

# gets all items for that particular wishlist_id
def get_items_by_wishlist_id(wishlist_id=None):
    if wishlist_id:
        items = db.session.query(Item).filter_by(wishlist_id=wishlist_id).all()
        return [item.to_dict() for item in items]
    return None

# gets all items pertaining to particular user id
def get_items_by_user_id(user_id=None):
    if user_id:
        items = db.session.query(Item).filter_by(user_id=user_id).all()
        return [items.to_dict() for item in items]
    return None

# deletes an item by its id
def delete_item_by_id(item_id=None):
    if item_id:
        item = db.session.query(Item).filter_by(id=item_id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
            return True
    return False

def update_item_by_id(item_id=None, name=None, image=None):
    if item_id:
        item = db.session.query(Item).filter_by(id=item_id).first()
        if item:
            if name:
                item.name = name
            if image:
                item.image = image
            db.session.commit()
            return item.to_dict()
    return None