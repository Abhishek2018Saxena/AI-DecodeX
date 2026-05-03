from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files["file"]

    return jsonify({
        "topics": [
            {"topic": "DBMS", "count": 40},
            {"topic": "OS", "count": 30},
            {"topic": "CN", "count": 20},
            {"topic": "AI", "count": 10}
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)
