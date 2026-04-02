import mimetypes
from typing import Optional, Tuple

from flask import Blueprint, Response, jsonify, request
from werkzeug.datastructures import FileStorage

from .extensions import db
from .models import Contribution, Upload

api = Blueprint("api", __name__, url_prefix="/api")


def _file_bytes_and_mime(
    file: Optional[FileStorage],
) -> Tuple[Optional[bytes], Optional[str]]:
    if not file or not file.filename:
        return None, None
    data = file.read()
    if not data:
        return None, None
    mime = file.mimetype or mimetypes.guess_type(file.filename)[0]
    return data, mime or "application/octet-stream"


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


@api.get("/contributions/<int:contribution_id>/media/audio")
def serve_contribution_audio(contribution_id: int):
    record = Contribution.query.get(contribution_id)
    if record is None or not record.audio_data:
        return jsonify({"error": "Not found"}), 404
    return Response(
        record.audio_data,
        mimetype=record.audio_mime_type or "application/octet-stream",
    )


@api.get("/contributions/<int:contribution_id>/media/video")
def serve_contribution_video(contribution_id: int):
    record = Contribution.query.get(contribution_id)
    if record is None or not record.video_data:
        return jsonify({"error": "Not found"}), 404
    return Response(
        record.video_data,
        mimetype=record.video_mime_type or "application/octet-stream",
    )


@api.post("/contributions")
def create_contribution():
    payload = request.form
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

    audio_data, audio_mime = _file_bytes_and_mime(request.files.get("audio_file"))
    video_data, video_mime = _file_bytes_and_mime(request.files.get("video_file"))

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
        audio_data=audio_data,
        audio_mime_type=audio_mime,
        video_data=video_data,
        video_mime_type=video_mime,
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


@api.get("/uploads/<int:upload_id>/media/artwork")
def serve_upload_artwork(upload_id: int):
    record = Upload.query.get(upload_id)
    if record is None or not record.artwork_image_data:
        return jsonify({"error": "Not found"}), 404
    return Response(
        record.artwork_image_data,
        mimetype=record.artwork_image_mime_type or "application/octet-stream",
    )


@api.post("/uploads")
def create_upload():
    payload = request.form
    image_data, image_mime = _file_bytes_and_mime(request.files.get("artwork_file"))
    required_fields = ["name"]

    missing = [field for field in required_fields if not payload.get(field)]
    if missing or image_data is None:
        error_payload = {"error": "Missing required fields", "missing_fields": missing}
        if image_data is None:
            error_payload["missing_fields"] = [*missing, "artwork_file"]
        return (
            jsonify(error_payload),
            400,
        )

    record = Upload(
        name=payload["name"],
        artwork_image_data=image_data,
        artwork_image_mime_type=image_mime or "application/octet-stream",
        ar_asset_url_ios=None,
        ar_asset_url_android=None,
        email=payload.get("email") or None,
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201
