from database import db
from models.user_model import User
from models.wishlist_model import Wishlist
from models.item_model import Item
    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(120), nullable=False)
    # user_count = db.Column(db.Integer, default=0)
    # description = db.Column(db.Text, nullable=True)
    # created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

def create_wishlist(name=None, user_count=0, description=None):
    if name:
        new_wishlist = Wishlist(name=name, user_count=user_count, description=description)
        db.session.add(new_wishlist)
        db.session.commit()
        return new_wishlist
    return None

def get_all_wishlists():
    wishlists = db.session.query(Wishlist).all()
    return [w.to_dict() for w in wishlists] if wishlists else []

def add_user_to_wishlist(wishlist_id, user_id):
    wishlist = Wishlist.query.get(wishlist_id)
    user = User.query.get(user_id)

    if not wishlist or not user:
        return None
    
    if user not in wishlist.users:
        wishlist.users.append(user)
        wishlist.user_count = len(wishlist.users)
        db.session.commit()

    return wishlist

def get_wishlist_items_by_id(wishlist_id):
    items = db.session.query(Item).filter_by(wishlist_id=wishlist_id).all()
    return [item.to_dict() for item in items] if items else []
