
from sqlalchemy.orm import Session
from src.database import SessionLocal
from sqlalchemy import text


def disabilities_grouped():
    session: Session = SessionLocal()
    try:
        query = text("""
        SELECT 
            EnrollmentID, 
            InformationDate, 
            DisabilityType, 
            DisabilityResponse, 
            IndefiniteAndImpairs, 
            DataCollectionStage 
        FROM 
            disabilities 
        WHERE 
            DataCollectionStage = 1;
        """)
        result = session.execute(query).fetchall()
        return result
    finally:
        session.close()
