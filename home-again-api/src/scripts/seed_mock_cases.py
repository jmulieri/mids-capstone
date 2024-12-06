from datetime import date, timedelta
from random import randint, choice
from src.models.case import Case, Gender, LivingSituation, DisabilityStatus, ProgramType, Race
from src.database import SessionLocal


def calculate_dob(age):
    return date.today() - timedelta(days=age * 365)


names = [
    "Alex Johnson",
    "Taylor Smith",
    "Jordan Lee",
    "Morgan Brown",
    "Casey Davis",
    "Drew White",
    "Robin Clark",
    "Charlie Green",
    "Blake Carter",
    "Jamie Morgan"
]

# create 10 mock case instances
cases = [
    Case(
        name=f"{names[i]}",
        entered_at=date.today(),
        gender=choice([g.value for g in Gender]),
        race=choice([r.value for r in Race]),
        living_situation=choice([l.value for l in LivingSituation]),
        disability_status=choice([d.value for d in DisabilityStatus]),
        program_name=f"Program {i + 1}",
        program_type=choice([p.value for p in ProgramType]),
        dob=calculate_dob(randint(20, 50)),
        chronically_homeless=choice([True, False]),
        entry_income=randint(10000, 50000),
        services={"service_count": randint(1, 10), "service_type": choice(["counseling", "housing", "job training"])},
    )
    for i in range(10)
]

session = SessionLocal()
session.add_all(cases)
session.commit()

for case in session.query(Case).all():
    print(case)
