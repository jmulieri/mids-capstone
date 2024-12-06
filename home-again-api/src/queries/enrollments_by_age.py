from sqlalchemy.orm import Session
from src.database import SessionLocal
from sqlalchemy import text


def enrollments_by_age():
    session: Session = SessionLocal()
    try:
        query = text("""
            SELECT
                CASE
                    WHEN CAST(RIGHT(c.DOB, 2) AS INT) > 24 THEN 2024 - (1900 + CAST(RIGHT(c.DOB, 2) AS INT))
                    ELSE 2024 - (2000 + CAST(RIGHT(c.DOB, 2) AS INT))
                END AS EnrollmentAge,
                COUNT(*) AS EnrollmentCount
            FROM Enrollment e
            INNER JOIN Client c ON e.PersonalID = c.PersonalID
            WHERE RIGHT(c.DOB, 2) <> 'yy'
            GROUP BY EnrollmentAge
            ORDER BY EnrollmentAge
        """)
        result = session.execute(query).fetchall()
        return result
    finally:
        session.close()
