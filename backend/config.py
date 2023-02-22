from decouple import config
import os

BASE_DIR=os.path.dirname(os.path.realpath(__file__))

class Config:
    # SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS=config('SQLALCHEMY_TRACK_MODIFICATIONS', False)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI='sqlite:///dev.db'
    DEBUG=True
    SQLALCHEMY_ECHO=True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI='sqlite:///test.db'
    SQLALCHEMY_ECHO=False
    TESTING=True

# class DevConfig(Config):
#     SQLALCHEMY_DATABASE_URI='sqlite:///dev.db'
#     DEBUG=True
#     SQLALCHEMY_ECHO=True

