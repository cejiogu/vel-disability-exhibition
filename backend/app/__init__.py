from flask import Flask
import click
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate
from . import models
from .routes import api, media


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(api)
    app.register_blueprint(media)

    @app.cli.command("init-db")
    def init_db():
        app.config["UPLOAD_FOLDER"].mkdir(parents=True, exist_ok=True)
        db.create_all()
        click.echo("Database tables created.")

    return app
