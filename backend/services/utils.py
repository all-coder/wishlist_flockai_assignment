from database import db
from models.user_model import User
from models.item_model import Item
from models.wishlist_model import Wishlist

def check_user_id(id):
    if(id is None): 
        return False
    return db.session.query(User.id).filter_by(id=id).first() is not None

def check_wishlist_id(id):
    if(id is None):
        return False
    return db.session.query(Wishlist.id).filter_by(id=id).first() is not None;