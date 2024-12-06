from sqlalchemy.orm import Session
from src.database import SessionLocal
from sqlalchemy import text


def enrollments_in_projects():
    session: Session = SessionLocal()
    try:
        query = text("""
        SELECT 
            CASE 
                WHEN p.ProjectType = 0 THEN 'Emergency Shelter Entry/Exit'
                WHEN p.ProjectType = 1 THEN 'Emergency Shelter NightbyNight'
                WHEN p.ProjectType = 2 THEN 'Transitional Housing'
                WHEN p.ProjectType = 3 THEN 'Permanent Supportive Housing'
                WHEN p.ProjectType = 4 THEN 'Outreach'
                WHEN p.ProjectType = 6 THEN 'Services Only'
                WHEN p.ProjectType = 7 THEN 'Other'
                WHEN p.ProjectType = 8 THEN 'Safe Haven'
                WHEN p.ProjectType = 9 THEN 'Housing Only'
                WHEN p.ProjectType = 10 THEN 'Housing with Services'
                WHEN p.ProjectType = 11 THEN 'Day shelter'
                WHEN p.ProjectType = 12 THEN 'Homelessness Prevention'
                WHEN p.ProjectType = 13 THEN 'Rapid ReHousing'
                WHEN p.ProjectType = 14 THEN 'Coordinated entry'
                ELSE 'Unknown'
            END AS ProjectType,
            COUNT(*) AS ProjectCount
        FROM 
            enrollment e
        JOIN 
            project p ON e.ProjectID = p.ProjectID
        GROUP BY 
            ProjectType
        ORDER BY 
            ProjectCount DESC;

        """)
        result = session.execute(query).fetchall()
        return result
    finally:
        session.close()
