from typing import Optional

from fastapi import APIRouter, Security, HTTPException
from .authentication import get_current_user
from .database import SessionLocal
from .models.case import Case
from sqlalchemy.orm import Session
from fastapi_cache.decorator import cache
from pydantic import BaseModel, ValidationError
from .model import Model
from .services.services_recommender import ServicesRecommender

router = APIRouter()
model = Model()


@router.get(
    "",
    summary="Get all cases",
    description="This endpoint returns a JSON formatted list of cases for the current user.",
    tags=["Home agAIn Endpoints"],
)
@router.get("/", include_in_schema=False)
async def cases_index(current_user: dict = Security(get_current_user)):
    print(f"current_user => (user_id: {current_user['sub']}, email: {current_user['email']})")
    session: Session = SessionLocal()
    data = []
    try:
        cases = session.query(Case).all()
        data = [case.__dict__ for case in cases]
    finally:
        session.close()
    return {"data": data}


@router.get(
    "/{case_id}",
    summary="Get a case by ID",
    description="This endpoint returns a JSON formatted case for the given ID.",
    tags=["Home agAIn Endpoints"],
)
async def get_case_by_id(case_id: int, current_user: dict = Security(get_current_user)):
    session: Session = SessionLocal()
    try:
        case = session.query(Case).filter(Case.id == case_id).first()
        if case:
            return {"data": case.__dict__}
        else:
            return {"error": "Case not found"}, 404
    finally:
        session.close()


class CaseCreate(BaseModel):
    name: str
    dob: str
    gender: str
    race: str
    disability_status: str
    living_situation: str
    chronically_homeless: bool
    entered_at: Optional[str] = None
    entry_income: Optional[int] = 0
    services: Optional[dict] = None
    program_type: Optional[str] = None
    program_name: Optional[str] = None


class CaseResponse(BaseModel):
    id: int
    name: str
    age: int
    dob: str
    gender: str
    race: str
    disability_status: str
    living_situation: str
    chronically_homeless: bool
    has_dependents: bool
    has_pets: bool
    is_veteran: bool
    completed_high_school: bool
    entered_at: str
    entry_income: int
    services: list
    program_type: str
    program_name: str
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


@router.post(
    "",
    summary="Create a new case",
    description="This endpoint creates a new case and returns the created case.",
    tags=["Home agAIn Endpoints"],
)
async def create_case(case_data: dict, current_user: dict = Security(get_current_user)):
    session: Session = SessionLocal()
    try:
        case_info = case_data.get("caseData")
        if not case_info:
            raise HTTPException(status_code=400, detail="Missing caseData parameter")

        print(case_info)
        print("-------------")
        new_case = Case(
            name=case_info["name"],
            dob=case_info["dob"],
            gender=case_info["gender"],
            race=case_info["race"],
            living_situation=case_info["livingSituation"],
            chronically_homeless=case_info["chronicallyHomeless"],
            disability_status=case_info["disabilityStatus"],
            entry_income=case_info["entryIncome"],
            services=case_info.get("services", []),
            program_type=case_info.get("programType"),
            program_name=case_info.get("programName"),
            entered_at=case_info.get("enteredAt"),
            has_dependents=case_info.get("hasDependents", False),
            has_pets=case_info.get("hasPets", False),
            is_veteran=case_info.get("isVeteran", False),
            completed_high_school=case_info.get("completedHighSchool", False),
        )
        print(new_case)
        session.add(new_case)
        session.commit()
        session.refresh(new_case)
        return {"data": new_case.__dict__}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()

@router.delete(
    "/{case_id}",
    summary="Delete a case by ID",
    description="This endpoint deletes a case for the given ID.",
    tags=["Home agAIn Endpoints"],
)
async def delete_case(case_id: int, current_user: dict = Security(get_current_user)):
    session: Session = SessionLocal()
    try:
        case = session.query(Case).filter(Case.id == case_id).first()
        if case:
            session.delete(case)
            session.commit()
            return {"message": "Case deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Case not found")
    finally:
        session.close()

@router.patch(
    "/{case_id}",
    summary="Update a case by ID",
    description="This endpoint updates a case for the given ID with the provided data.",
    tags=["Home agAIn Endpoints"],
)
async def update_case(case_id: int, case_data: dict, current_user: dict = Security(get_current_user)):
    session: Session = SessionLocal()
    try:
        case = session.query(Case).filter(Case.id == case_id).first()
        if not case:
            raise HTTPException(status_code=404, detail="Case not found")

        case_info = case_data.get("caseData")
        if not case_info:
            raise HTTPException(status_code=400, detail="Missing caseData parameter")

        # Mapping of camelCase to snake_case
        attribute_mapping = {
            "name": "name",
            "dob": "dob",
            "gender": "gender",
            "race": "race",
            "livingSituation": "living_situation",
            "chronicallyHomeless": "chronically_homeless",
            "disabilityStatus": "disability_status",
            "entryIncome": "entry_income",
            "services": "services",
            "programType": "program_type",
            "programName": "program_name",
            "enteredAt": "entered_at",
            "hasDependents": "has_dependents",
            "hasPets": "has_pets",
            "isVeteran": "is_veteran",
            "completedHighSchool": "completed_high_school",
        }

        for key, value in case_info.items():
            if key in attribute_mapping:
                setattr(case, attribute_mapping[key], value)

        print(case)
        session.commit()
        session.refresh(case)
        return {"data": case.__dict__}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()


class PredictResponse(BaseModel):
    prediction: float = 0.413
    prediction_with_recommendations: float = 0.826
    recommended_services: list = []


@router.get(
    "/prediction/{case_id}",
    summary="Predict likelihood of permanent housing for a given case",
    description="This endpoint uses the specified participant case data to provide a prediction of "
                "likelihood of a permanent housing outcome.",
    tags=["Home Again Endpoints"],
    response_model=PredictResponse,
)
async def prediction(case_id: int, current_user: dict = Security(get_current_user)):
    """

    This endpoint takes a required Case ID and returns a JSON object with a prediction
    of the likelihood of a permanent housing outcome.

    **Arguments:**
    - `case_id`: The ID of the case to use for prediction. (Required)

    **Returns:**
    - A JSON object containing the prediction of the likelihood of a permanent housing outcome.

    """
    num_recommendations = 6
    session: Session = SessionLocal()
    try:
        case = session.query(Case).filter(Case.id == case_id).first()
        if case:
            services_recommender = ServicesRecommender(case)
            recommended_services = services_recommender.generate_recommendations()[:num_recommendations]
            prediction_without_recommendations = model.predict(case)
            prediction_with_recommendations = model.predict(case, recommended_services)
            return {
                "prediction": round(prediction_without_recommendations[0], 5),
                "prediction_with_recommendations": round(prediction_with_recommendations[0], 5),
                "recommended_services": recommended_services,
            }
        else:
            return {"error": "Case not found for prediction"}, 404
    finally:
        session.close()
