from flask import Flask
from database import init_db
from routes.user_routes import user_route
from routes.wishlist_routes import wishlist_route
from routes.item_routes import item_route
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    # allowing for CORS
    CORS(app)
    # initializing the database
    init_db(app)  
    app.register_blueprint(user_route) 
    app.register_blueprint(wishlist_route)
    app.register_blueprint(item_route) 
    return app
