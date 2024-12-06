import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

def add_cors_middleware(app):
    environment = os.getenv("ENVIRONMENT", "development")
    if environment == "production":
        origins = ["https://capstone-home-again.com"]
    else:
        origins = ["http://localhost:5174"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )