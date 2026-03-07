from flask import Flask
import click
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate
from . import models
from .routes import api


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(api)

    @app.cli.command("init-db")
    def init_db():
        db.create_all()
        click.echo("Database tables created.")

    return app
