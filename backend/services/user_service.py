from database import db
from models.user_model import User
from models.association import wishlist_users
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

def create_user(name=None, email=None,password=None):
    if name and email and password:
        hashed_password = generate_password_hash(password)
        new_user = User(name=name, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return new_user
    return None


def login_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        return user
    return None

def get_all_users():
    users = db.session.query(User.id, User.name,User.email).all()
    return [{'id': uid, 'name': name,'email':email} for uid, name, email in users]


def get_user_wishlist_ids(user_id):
    rows = (
        db.session.query(wishlist_users.c.wishlist_id)
        .filter(wishlist_users.c.user_id == user_id)
        .all()
    )
    return [r[0] for r in rows]

