from sqlalchemy import LargeBinary, func

from .extensions import db


class Contribution(db.Model):
    __tablename__ = "contributions"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(255), nullable=False)
    medium = db.Column(db.String(255), nullable=True)
    disability_experience_context = db.Column(db.Text, nullable=True)
    description_text = db.Column(db.Text, nullable=False)
    alt_text_description = db.Column(db.Text, nullable=False)
    accessibility_notes = db.Column(db.Text, nullable=True)
    artwork_image_url = db.Column(db.Text, nullable=True)
    audio_data = db.Column(LargeBinary, nullable=True)
    audio_mime_type = db.Column(db.String(255), nullable=True)
    video_data = db.Column(LargeBinary, nullable=True)
    video_mime_type = db.Column(db.String(255), nullable=True)
    ar_asset_url_ios = db.Column(db.Text, nullable=True)
    ar_asset_url_android = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist_name": self.artist_name,
            "medium": self.medium,
            "disability_experience_context": self.disability_experience_context,
            "description_text": self.description_text,
            "alt_text_description": self.alt_text_description,
            "accessibility_notes": self.accessibility_notes,
            "artwork_image_url": self.artwork_image_url,
            "audio_url": (
                f"/api/contributions/{self.id}/media/audio" if self.audio_data else None
            ),
            "video_url": (
                f"/api/contributions/{self.id}/media/video" if self.video_data else None
            ),
            "ar_asset_url_ios": self.ar_asset_url_ios,
            "ar_asset_url_android": self.ar_asset_url_android,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class Upload(db.Model):
    __tablename__ = "uploads"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    artwork_image_data = db.Column(LargeBinary, nullable=False)
    artwork_image_mime_type = db.Column(db.String(255), nullable=False)
    ar_asset_url_ios = db.Column(db.Text, nullable=True)
    ar_asset_url_android = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(255), nullable=True)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "artwork_image_url": f"/api/uploads/{self.id}/media/artwork",
            "ar_asset_url_ios": self.ar_asset_url_ios,
            "ar_asset_url_android": self.ar_asset_url_android,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
