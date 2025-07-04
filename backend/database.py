import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy


load_dotenv()

db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQL_DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.init_app(app)
    with app.app_context():
        from models.user_model import User
        from models.wishlist_model import Wishlist
        from models.item_model import Item
        from models.association import wishlist_users
        db.create_all()

