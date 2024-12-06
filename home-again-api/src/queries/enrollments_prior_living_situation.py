
from sqlalchemy.orm import Session
from src.database import SessionLocal
from sqlalchemy import text


def enrollments_prior_living_situation():
    session: Session = SessionLocal()
    try:
        query = text("""
            SELECT 
                CASE 
                    WHEN COALESCE(livingsituation, 99) >= 100 AND COALESCE(livingsituation, 99) < 200 THEN 'Homeless Situation'
                    WHEN COALESCE(livingsituation, 99) >= 200 AND COALESCE(livingsituation, 99) < 300 THEN 'Institutional Situation'
                    WHEN COALESCE(livingsituation, 99) >= 300 AND COALESCE(livingsituation, 99) < 400 THEN 'Temporary Situation'
                    WHEN COALESCE(livingsituation, 99) >= 400 AND COALESCE(livingsituation, 99) < 500 THEN 'Permanent Housing Situation'
                    ELSE 'Other'
                END AS situation,
                COUNT(*) AS count
            FROM 
                enrollment
            GROUP BY 
                situation
            ORDER BY 
                count DESC;
        """)
        result = session.execute(query).fetchall()
        return result
    finally:
        session.close()
