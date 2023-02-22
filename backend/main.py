from flask import Flask
from flask_restx import Api
from models import Book
from exts import db
from books import book_namespace
from flask_migrate import Migrate
from flask_cors import CORS


def create_app(config):
    app=Flask(__name__, static_url_path="/")

    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate=Migrate(app, db)

    api=Api(app, doc='/docs')

    api.add_namespace(book_namespace)
    
    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.errorhandler(404)
    def not_found(err):
        return app.send_static_file("index.html")

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'Book': Book
    }

    return app
