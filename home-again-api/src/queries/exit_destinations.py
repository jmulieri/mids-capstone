
from sqlalchemy.orm import Session
from src.database import SessionLocal
from sqlalchemy import text


def exit_destinations():
    session: Session = SessionLocal()
    try:
        query = text("""
        SELECT
            COALESCE(
                CASE
                    WHEN Destination = 116 THEN 'Place Not Meant For Habitation'
                    WHEN Destination = 101 THEN 'Emergency Shelter'
                    WHEN Destination = 118 THEN 'Safe Haven'
                    WHEN Destination = 215 THEN 'Foster Care Home'
                    WHEN Destination = 206 THEN 'Hospital/ Medical Facility'
                    WHEN Destination = 207 THEN 'Jail'
                    WHEN Destination = 225 THEN 'Long-term care facility'
                    WHEN Destination = 204 THEN 'Psychiatric hospital'
                    WHEN Destination = 205 THEN 'Substance abuse treatment facility'
                    WHEN Destination = 302 THEN 'Transitional Housing'
                    WHEN Destination = 329 THEN 'Halfway House'
                    WHEN Destination = 314 THEN 'Hotel/ Motel'
                    WHEN Destination = 332 THEN 'Host Home'
                    WHEN Destination = 312 THEN 'Staying or living with family, temporary tenure'
                    WHEN Destination = 313 THEN 'Staying or living with friends, temporary tenure'
                    WHEN Destination = 327 THEN 'HOPWA funded project TH'
                    WHEN Destination = 336 THEN 'Staying/ living in friends house'
                    WHEN Destination = 335 THEN 'Staying/ living in families house'
                    WHEN Destination = 422 THEN 'Staying or living with family, permanent tenure'
                    WHEN Destination = 423 THEN 'Staying or living with friends, permanent tenure'
                    WHEN Destination = 426 THEN 'HOPWA funded project PH'
                    WHEN Destination = 410 THEN 'Rental by client, no subsidy'
                    WHEN Destination = 435 THEN 'Rental by client, with subsidy'
                    WHEN Destination = 421 THEN 'Owned by client, no subsidy'
                    WHEN Destination = 411 THEN 'Owned by client, with subsidy'
                    WHEN Destination = 30 THEN 'No exit interview completed'
                    WHEN Destination = 17 THEN 'Other'
                    WHEN Destination = 24 THEN 'Deceased'
                    WHEN Destination = 37 THEN 'Unable to determine'
                    WHEN Destination = 8 THEN 'Client doesn''t know'
                    WHEN Destination = 9 THEN 'Client prefers not to answer'
                    ELSE 'Data Not Collected'
                END,
                'Data Not Collected'
            ) AS Destination,
            COUNT(*) AS Count
        FROM
            exit
        WHERE
            ExitDate IS NOT NULL
        GROUP BY
            Destination
        ORDER BY
            Destination;

        """)
        result = session.execute(query).fetchall()
        return result
    finally:
        session.close()
