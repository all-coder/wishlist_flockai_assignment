from database import db

wishlist_users = db.Table(
    'wishlist_users',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('wishlist_id', db.Integer, db.ForeignKey('wishlists.id'), primary_key=True)
)