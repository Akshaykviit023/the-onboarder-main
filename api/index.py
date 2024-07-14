import os
import re
from typing import List
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from pypdf import PdfReader
import google.generativeai as genai
import chromadb
from chromadb import Documents, EmbeddingFunction, Embeddings
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel

app = FastAPI()


origins = [
    "http://localhost:3000"
    # Add any other origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
# Directory to store uploaded files
UPLOAD_DIRECTORY = "./uploaded_files"

# Ensure the directory exists
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# Load environment variables from .env file
load_dotenv()


GENAI_API_KEY = os.getenv("NEXT_PUBLIC_GEMINI_API_KEY")
genai.configure(api_key=GENAI_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(history=[])

# Custom Embedding Function
class GeminiEmbeddingFunction(EmbeddingFunction):
    def __call__(self, input: Documents) -> Embeddings:
        model = "models/embedding-001"
        title = "Custom query"
        return genai.embed_content(model=model, content=input, task_type="retrieval_document", title=title)["embedding"]

# Functions for loading and processing PDF
def load_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text = "".join([page.extract_text() for page in reader.pages])
    return text

def split_text(text: str) -> List[str]:
    split_text = re.split(r'\n \n', text)
    return [i for i in split_text if i != ""]

# Create ChromaDB
def create_chroma_db(documents: List[str], path: str, name: str):
    chroma_client = chromadb.PersistentClient(path=path)
    db = chroma_client.create_collection(name=name, embedding_function=GeminiEmbeddingFunction())
    for i, d in enumerate(documents):
        db.add(documents=d, ids=str(i))
    return db, name

def load_chroma_collection(path: str, name: str):
    chroma_client = chromadb.PersistentClient(path=path)
    db = chroma_client.get_collection(name=name, embedding_function=GeminiEmbeddingFunction())
    return db

def get_relevant_passage(query: str, db, n_results: int):
    passage = db.query(query_texts=[query], n_results=n_results)['documents'][0]
    return passage

def make_rag_prompt(query: str, relevant_passage: str) -> str:
    escaped = relevant_passage.replace("'", "").replace('"', "").replace("\n", " ")
    prompt = (
        f"You are a helpful and informative designer onboarding bot that answers questions using text from the reference passage included below. "
        f"Be sure to respond in a complete sentence, being comprehensive, including all relevant background information. "
        f"However, you are talking to a non-technical audience, so be sure to break down complicated concepts and "
        f"strike a friendly and conversational tone. "
        f"QUESTION: '{query}'\n"
        f"PASSAGE: '{escaped}'\n\n"
        f"ANSWER:\n"
    )
    return prompt

def generate_answer(prompt: str) -> str:
    
    answer =  chat.send_message(prompt)
    #print(chat.history)
    return answer.text

# API Endpoints
@app.post("/upload")
async def upload_file(file: UploadFile = File(...), collection_name: str = Form(...)):
    file_path = f"uploaded_files/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    pdf_text = load_pdf(file_path)
    chunked_text = split_text(pdf_text)
    
    db, name = create_chroma_db(documents=chunked_text, path="db_storage", name=collection_name)
    
    return JSONResponse(content={"message": "File processed and indexed successfully", "collection_name": name})

class QueryRequest(BaseModel):
    query: str
    collection_name: str

@app.post("/query")
async def query_db(request: QueryRequest):
    db = load_chroma_collection(path="db_storage", name=request.collection_name)
    relevant_text = get_relevant_passage(query=request.query, db=db, n_results=3)
    prompt = make_rag_prompt(query=request.query, relevant_passage="".join(relevant_text))
    answer = generate_answer(prompt)
    
    return JSONResponse(content={"answer": answer})

@app.get("/chatHistory")
async def chat_history():
    return JSONResponse(content={"history": chat.history})