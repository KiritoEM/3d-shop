from flask import Flask, request, jsonify
from flask_cors import CORS
from bot import bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
