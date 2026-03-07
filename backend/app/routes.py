from flask import Blueprint, jsonify, request

from .extensions import db
from .models import Contribution, Upload

api = Blueprint("api", __name__, url_prefix="/api")


@api.get("/health")
def health_check():
    return jsonify({"status": "ok"})


@api.get("/contributions")
def list_contributions():
    records = Contribution.query.order_by(Contribution.created_at.desc()).all()
    return jsonify([record.to_dict() for record in records])


@api.post("/contributions")
def create_contribution():
    payload = request.get_json(silent=True) or {}
    required_fields = [
        "title",
        "artist_name",
        "description_text",
        "alt_text_description",
        "artwork_image_url",
        "ar_asset_url_ios",
        "ar_asset_url_android",
    ]

    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return (
            jsonify({"error": "Missing required fields", "missing_fields": missing}),
            400,
        )

    record = Contribution(
        title=payload["title"],
        artist_name=payload["artist_name"],
        description_text=payload["description_text"],
        alt_text_description=payload["alt_text_description"],
        artwork_image_url=payload["artwork_image_url"],
        audio_url=payload.get("audio_url"),
        video_url=payload.get("video_url"),
        ar_asset_url_ios=payload["ar_asset_url_ios"],
        ar_asset_url_android=payload["ar_asset_url_android"],
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201


@api.get("/uploads")
def list_uploads():
    records = Upload.query.order_by(Upload.created_at.desc()).all()
    return jsonify([record.to_dict() for record in records])


@api.post("/uploads")
def create_upload():
    payload = request.get_json(silent=True) or {}
    required_fields = ["name", "artwork_image_url"]

    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return (
            jsonify({"error": "Missing required fields", "missing_fields": missing}),
            400,
        )

    record = Upload(
        name=payload["name"],
        artwork_image_url=payload["artwork_image_url"],
        ar_asset_url_ios=payload.get("ar_asset_url_ios"),
        ar_asset_url_android=payload.get("ar_asset_url_android"),
        email=payload.get("email"),
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201
