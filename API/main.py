from flask import Flask
from flask_cors import CORS

from v1.api import v1_blueprint

app = Flask("app")

CORS(app)

app.register_blueprint(v1_blueprint)

if __name__ == "__main__":
    app.run(port=4000)