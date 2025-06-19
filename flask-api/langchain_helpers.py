from langchain_community.utilities.sql_database import SQLDatabase
import os
import logging
from langchain.chains import create_sql_query_chain
from urllib.parse import quote_plus
from dotenv import load_dotenv
import re
from langchain_core.messages import AIMessage
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from constants import RESULT_EXPLANATION_TEMPLATE
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

llm = ChatGroq(
    model="llama3-70b-8192", 
    api_key=os.getenv('GROQ_API_KEY'),
    temperature=0
)

def connect_langchain_to_db():
    try:
        db_user = os.getenv('DB_USER')
        db_password = os.getenv('DB_PWD')
        db_host = os.getenv('DB_HOST', 'localhost')
        db_name = os.getenv('DB_DB_NAME')
        db_port = os.getenv('DB_PORT', '5432')
        
        if not all([db_user, db_password, db_name]):
            logger.error("Missing required database environment variables")
            return None
        
        encoded_user = quote_plus(db_user)
        encoded_password = quote_plus(db_password)
        
        connection_uri = f"postgresql://{encoded_user}:{encoded_password}@{db_host}:{db_port}/{db_name}"
        
        db = SQLDatabase.from_uri(connection_uri)
        
        db.run("SELECT 1")
        logger.info("Connection successful")
        return db
        
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        return None

def clean_sql_query(raw_sql: str) -> str:
    cleaned = re.sub(r'^SQLQuery:\s*', '', raw_sql.strip(), flags=re.IGNORECASE)
    cleaned = re.sub(r'^SQL:\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^Query:\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^```sql\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\s*```$', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\bLIKE\b', 'ILIKE', cleaned, flags=re.IGNORECASE)
    cleaned = cleaned.strip()
    return cleaned

def natural_language_to_sql(prompt: str, db: SQLDatabase):
    try:
        sql_chain = create_sql_query_chain(llm, db)
        raw_response = sql_chain.invoke({"question": prompt})
        
        cleaned_sql = clean_sql_query(raw_response)
        
        logger.info(f"Raw SQL response: {raw_response}")
        logger.info(f"Cleaned SQL: {cleaned_sql}")
        
        return {
            "generated_sql": cleaned_sql,
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Error generating SQL query: {e}")
        return {
            "generated_sql": None,
            "status": "error",
            "error": str(e)
        }

def execute_sql_query(db: SQLDatabase, query: str, question: str):
    try:
        if not query or query.strip() == "":
            logger.error("Empty SQL query provided")
            return {
                "data": None,
                "explanation": "Impossible de générer une requête SQL valide.",
                "status": "error"
            }
        
        logger.info(f"Executing SQL: {query}")
        query_result = db.run(query)
        
        logger.info(f"Query executed successfully, result: {query_result}")
        
        explanation_prompt = PromptTemplate(
            input_variables=["question", "sql_query", "raw_results"],
            template=RESULT_EXPLANATION_TEMPLATE
        )
        
        is_empty_result = (
            not query_result or 
            query_result == "" or 
            query_result == "[]" or 
            str(query_result).strip() == ""
        )
        
        formatted_prompt = explanation_prompt.format(
            question=question,
            sql_query=query,
            raw_results=str(query_result) if not is_empty_result else "Aucun résultat trouvé"
        )
        
        text_response = llm.invoke(formatted_prompt.strip())
        
        if isinstance(text_response, AIMessage):
            response_content = text_response.content
        else:
            response_content = str(text_response)
        
        return {
            "data": query_result,
            "explanation": response_content,
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Error executing query: {e}")
    return {
        "data": None,
        "explanation": f"Erreur lors de l'exécution de la requête: {str(e)}",
        "status": "error"
    }