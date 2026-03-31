from pathlib import Path

from flask import Blueprint, current_app, jsonify, request, send_from_directory

from .extensions import db
from .models import Contribution, Upload
from .storage import save_uploaded_file

api = Blueprint("api", __name__, url_prefix="/api")
media = Blueprint("media", __name__)


@api.get("/health")
def health_check():
    return jsonify({"status": "ok"})


@api.get("/contributions")
def list_contributions():
    records = Contribution.query.order_by(Contribution.created_at.desc()).all()
    return jsonify([record.to_dict() for record in records])


@api.get("/contributions/<int:contribution_id>")
def get_contribution(contribution_id: int):
    record = Contribution.query.get(contribution_id)
    if record is None:
        return jsonify({"error": "Contribution not found"}), 404
    return jsonify(record.to_dict())


@api.post("/contributions")
def create_contribution():
    payload = request.form
    upload_root = Path(current_app.config["UPLOAD_FOLDER"])
    required_fields = [
        "title",
        "artist_name",
        "description_text",
        "alt_text_description",
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
        medium=payload.get("medium") or None,
        disability_experience_context=payload.get("disability_experience_context")
        or None,
        description_text=payload["description_text"],
        alt_text_description=payload["alt_text_description"],
        accessibility_notes=payload.get("accessibility_notes") or None,
        artwork_image_url=None,
        audio_url=save_uploaded_file(
            upload_root, request.files.get("audio_file"), "contributions/audio"
        ),
        video_url=save_uploaded_file(
            upload_root, request.files.get("video_file"), "contributions/video"
        ),
        ar_asset_url_ios=None,
        ar_asset_url_android=None,
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
    payload = request.form
    upload_root = Path(current_app.config["UPLOAD_FOLDER"])
    artwork_image_url = save_uploaded_file(
        upload_root, request.files.get("artwork_file"), "uploads/artwork"
    )
    required_fields = ["name"]

    missing = [field for field in required_fields if not payload.get(field)]
    if missing or artwork_image_url is None:
        error_payload = {"error": "Missing required fields", "missing_fields": missing}
        if artwork_image_url is None:
            error_payload["missing_fields"] = [*missing, "artwork_file"]
        return (
            jsonify(error_payload),
            400,
        )

    record = Upload(
        name=payload["name"],
        artwork_image_url=artwork_image_url,
        ar_asset_url_ios=None,
        ar_asset_url_android=None,
        email=payload.get("email") or None,
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201


@media.get("/media/<path:filename>")
def serve_uploaded_file(filename: str):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)
