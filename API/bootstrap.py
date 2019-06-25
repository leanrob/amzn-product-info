import os

from models import Base
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database, drop_database
from dotenv import load_dotenv

load_dotenv(".env")

engine_string = os.environ["SQL_URL"]
engine = create_engine(engine_string)

# create dbs if needed
if not database_exists(engine.url):
    create_database(engine.url)

# create schemas
Base.metadata.create_all(engine)