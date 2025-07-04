from sqlalchemy.sql import func
from database import db
from models.association import wishlist_users
class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_count = db.Column(db.Integer, default=0)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    users = db.relationship('User', secondary=wishlist_users, back_populates='wishlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_count': self.user_count,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
