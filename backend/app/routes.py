from pathlib import Path
import uuid

from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename

from .extensions import db
from .models import Contribution, Upload

api = Blueprint("api", __name__, url_prefix="/api")

ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
ALLOWED_AUDIO_EXTENSIONS = {"mp3", "wav", "m4a", "aac", "ogg"}
ALLOWED_VIDEO_EXTENSIONS = {"mp4", "mov", "webm", "m4v"}


def _uploads_directory() -> Path:
    upload_root = Path(current_app.root_path).parent / "uploads"
    upload_root.mkdir(parents=True, exist_ok=True)
    return upload_root


def _save_uploaded_file(file_storage, allowed_extensions: set[str]) -> str:
    original_name = secure_filename(file_storage.filename or "")
    extension = Path(original_name).suffix.lower().lstrip(".")
    if not extension or extension not in allowed_extensions:
        raise ValueError("Unsupported file type")

    saved_name = f"{uuid.uuid4().hex}.{extension}"
    destination = _uploads_directory() / saved_name
    file_storage.save(destination)
    return f"/uploads/{saved_name}"


def _optional_file_path(file_key: str, allowed_extensions: set[str]) -> str | None:
    file_storage = request.files.get(file_key)
    if not file_storage or not file_storage.filename:
        return None
    return _save_uploaded_file(file_storage, allowed_extensions)


@api.get("/health")
def health_check():
    return jsonify({"status": "ok"})


@api.get("/contributions")
def list_contributions():
    records = Contribution.query.order_by(Contribution.created_at.desc()).all()
    return jsonify([record.to_dict() for record in records])


@api.post("/contributions")
def create_contribution():
    payload = request.form.to_dict() if request.files else (request.get_json(silent=True) or {})
    required_fields = ["title", "artist_name", "description_text", "alt_text_description"]

    missing = [field for field in required_fields if not payload.get(field)]

    artwork_image_url = payload.get("artwork_image_url")
    if request.files:
        artwork_image = request.files.get("artwork_image")
        if not artwork_image or not artwork_image.filename:
            missing.append("artwork_image")
        else:
            try:
                artwork_image_url = _save_uploaded_file(
                    artwork_image, ALLOWED_IMAGE_EXTENSIONS
                )
            except ValueError:
                return (
                    jsonify({"error": "Artwork image must be jpg, jpeg, png, or webp."}),
                    400,
                )

    if missing:
        return (
            jsonify({"error": "Missing required fields", "missing_fields": missing}),
            400,
        )

    if not artwork_image_url:
        return (
            jsonify({"error": "Missing required fields", "missing_fields": ["artwork_image"]}),
            400,
        )

    audio_url = payload.get("audio_url")
    video_url = payload.get("video_url")
    if request.files:
        try:
            audio_url = _optional_file_path("audio_file", ALLOWED_AUDIO_EXTENSIONS)
            video_url = _optional_file_path("video_file", ALLOWED_VIDEO_EXTENSIONS)
        except ValueError:
            return jsonify({"error": "Audio or video file type is not supported."}), 400

    record = Contribution(
        title=payload["title"],
        artist_name=payload["artist_name"],
        description_text=payload["description_text"],
        alt_text_description=payload["alt_text_description"],
        artwork_image_url=artwork_image_url,
        audio_url=audio_url,
        video_url=video_url,
        ar_asset_url_ios=payload.get("ar_asset_url_ios") or "",
        ar_asset_url_android=payload.get("ar_asset_url_android") or "",
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
    payload = request.form.to_dict() if request.files else (request.get_json(silent=True) or {})
    required_fields = ["name"]

    missing = [field for field in required_fields if not payload.get(field)]

    artwork_image_url = payload.get("artwork_image_url")
    if request.files:
        artwork_image = request.files.get("artwork_image")
        if not artwork_image or not artwork_image.filename:
            missing.append("artwork_image")
        else:
            try:
                artwork_image_url = _save_uploaded_file(
                    artwork_image, ALLOWED_IMAGE_EXTENSIONS
                )
            except ValueError:
                return (
                    jsonify({"error": "Upload image must be jpg, jpeg, png, or webp."}),
                    400,
                )

    if missing:
        return (
            jsonify({"error": "Missing required fields", "missing_fields": missing}),
            400,
        )

    if not artwork_image_url:
        return (
            jsonify({"error": "Missing required fields", "missing_fields": ["artwork_image"]}),
            400,
        )

    record = Upload(
        name=payload["name"],
        artwork_image_url=artwork_image_url,
        ar_asset_url_ios=payload.get("ar_asset_url_ios"),
        ar_asset_url_android=payload.get("ar_asset_url_android"),
        email=payload.get("email"),
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201
