"""Store upload file bytes in Postgres

Revision ID: f8a21c0b9d42
Revises: e534f93cfbc1
Create Date: 2026-04-01 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


revision = "f8a21c0b9d42"
down_revision = "e534f93cfbc1"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "contributions",
        sa.Column("audio_data", sa.LargeBinary(), nullable=True),
    )
    op.add_column(
        "contributions",
        sa.Column("audio_mime_type", sa.String(length=255), nullable=True),
    )
    op.add_column(
        "contributions",
        sa.Column("video_data", sa.LargeBinary(), nullable=True),
    )
    op.add_column(
        "contributions",
        sa.Column("video_mime_type", sa.String(length=255), nullable=True),
    )
    op.drop_column("contributions", "audio_url")
    op.drop_column("contributions", "video_url")

    op.add_column(
        "uploads",
        sa.Column("artwork_image_data", sa.LargeBinary(), nullable=True),
    )
    op.add_column(
        "uploads",
        sa.Column("artwork_image_mime_type", sa.String(length=255), nullable=True),
    )
    op.drop_column("uploads", "artwork_image_url")
    op.execute("DELETE FROM uploads WHERE artwork_image_data IS NULL")
    op.alter_column(
        "uploads",
        "artwork_image_data",
        existing_type=sa.LargeBinary(),
        nullable=False,
    )
    op.alter_column(
        "uploads",
        "artwork_image_mime_type",
        existing_type=sa.String(length=255),
        nullable=False,
    )


def downgrade():
    op.add_column(
        "uploads",
        sa.Column("artwork_image_url", sa.Text(), nullable=True),
    )
    op.drop_column("uploads", "artwork_image_mime_type")
    op.drop_column("uploads", "artwork_image_data")

    op.add_column("contributions", sa.Column("audio_url", sa.Text(), nullable=True))
    op.add_column("contributions", sa.Column("video_url", sa.Text(), nullable=True))
    op.drop_column("contributions", "video_mime_type")
    op.drop_column("contributions", "video_data")
    op.drop_column("contributions", "audio_mime_type")
    op.drop_column("contributions", "audio_data")
