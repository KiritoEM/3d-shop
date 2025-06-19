from flask import Blueprint, jsonify, request
from langchain_helpers import (connect_langchain_to_db, execute_sql_query, natural_language_to_sql)
from dotenv import load_dotenv

load_dotenv()

bp = Blueprint('bot', __name__, url_prefix='/bot')

# Initialize database connection
db = connect_langchain_to_db()

if db is None:
    print("Warning: Failed to connect to database during initialization")

@bp.route('/recommandation', methods=['POST'])
def handle_bot_request():
    try:
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500
            
        data = request.get_json()
        print(f"Received data: {data}")

        if not data or not data.get('prompt'):
            return jsonify({"error": "No prompt provided"}), 400

        query_result = natural_language_to_sql(data.get('prompt'), db)
        print(f"Query result: {query_result}")

        if query_result["status"] != "success":
            return jsonify({"error": query_result["error"]}), 500
        
        results = execute_sql_query(db, query_result["generated_sql"], data.get('prompt'))
        
        if results is None:
            return jsonify({"error": "Failed to execute query"}), 500

        return jsonify({"data": results["data"], "explanation": results["explanation"]
}), 200

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": f"internal server error: {str(e)}"}), 500