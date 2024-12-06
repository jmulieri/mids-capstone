from fastapi import APIRouter
import pandas as pd
from src.queries.enrollments_by_age import enrollments_by_age as enrollments_by_age_query
from src.queries.enrollments_prior_living_situation import enrollments_prior_living_situation as enrollments_prior_living_situation_query
from src.queries.disabilities_grouped import disabilities_grouped as disabilities_grouped_query
from src.queries.exit_destinations import exit_destinations as exit_destinations_query
from src.queries.enrollments_in_projects import enrollments_in_projects as enrollments_in_projects_query




from fastapi_cache.decorator import cache

router = APIRouter()

@router.get(
    "/enrollments_by_age",
    summary="Fetch enrollment counts by age",
    description="This endpoint returns a JSON formatted list of enrollment counts by age",
    tags=["Home agAIn Endpoints"],
)

@cache(expire=86400)
async def enrollments_by_age():
    """

    This endpoint returns a JSON formatted list of enrollment counts by age.

    **Returns:**
    - A JSON object containing the enrollment counts by age.

    """
    data = [{'age': row[0], 'count': row[1]} for row in enrollments_by_age_query()]
    return {"data": data}


@router.get(
    "/disabilities_grouped",
    summary="Fetch disabilites groups counts",
    description="This endpoint returns a JSON formatted list of disabilites groups counts",
    tags=["Home agAIn Endpoints"],
)

@cache(expire=86400)
async def disabilities_grouped():
    """

    This endpoint returns a JSON formatted list of enrollment counts by age.

    **Returns:**
    - A JSON object containing the enrollment counts by age.

    """

    #query database
    query_result = disabilities_grouped_query()


    #Apply logic to filter and get groupings in python

    disability_columns = [
    'EnrollmentID', 
    'InformationDate', 
    'DisabilityType', 
    'DisabilityResponse', 
    'IndefiniteAndImpairs', 
    'DataCollectionStage'
    ]

    mass_disability = pd.DataFrame(query_result, columns=disability_columns)

    mass_disability=mass_disability[mass_disability['DataCollectionStage']==1]
    mass_disability.drop(columns='DataCollectionStage', inplace=True)


    disability_dict = {
        5: 'PhysicalDisability',
        6: 'DevelopmentalDisability',
        7: 'ChronicHealthCondition',
        8: 'HIV/AIDS',
        9: 'MentalHealthDisorder',
        10: 'SubstanceUseDisorder'
    }
    disability_pivot = mass_disability.pivot_table(index='EnrollmentID',
                                                columns='DisabilityType',
                                                values='DisabilityResponse',
                                                aggfunc='first')

    disability_pivot.rename(columns=disability_dict, inplace=True)

    disability_pivot.reset_index(inplace=True)
    disability_pivot['AlcoholUseDisorder'] = 0
    disability_pivot['DrugUseDisorder'] = 0
    disability_pivot['Alcohol&DrugUseDisorder'] = 0


    disability_pivot.loc[disability_pivot['SubstanceUseDisorder'] == 1, 'AlcoholUseDisorder'] = 1
    disability_pivot.loc[disability_pivot['SubstanceUseDisorder'] == 2, 'DrugUseDisorder'] = 1
    disability_pivot.loc[disability_pivot['SubstanceUseDisorder'] == 3, 'Alcohol&DrugUseDisorder'] = 1

    disability_pivot.drop(columns='SubstanceUseDisorder', inplace=True)
    conditions = ['PhysicalDisability', 'DevelopmentalDisability','ChronicHealthCondition','HIV/AIDS','MentalHealthDisorder','AlcoholUseDisorder','DrugUseDisorder','Alcohol&DrugUseDisorder']

    values = [disability_pivot[condition].apply(lambda x: x == 1).sum() for condition in conditions]
    
    #map results to dictionary and change into int types to return out of api
    condition_value_map = dict(zip(conditions, values))
    condition_value_map_int = {condition: int(value) for condition, value in condition_value_map.items()}
    
    return condition_value_map_int

@router.get(
    "/enrollments_prior_living_situation",
    summary="Fetch prior living situation counts",
    description="This endpoint returns a JSON formatted list prior living situation counts",
    tags=["Home agAIn Endpoints"],
)

@cache(expire=86400)
async def enrollments_prior_living_situation():
    """

    This endpoint returns a JSON formatted list of enrollment counts by age.

    **Returns:**
    - A JSON object containing the enrollment counts by age.

    """
    data = [{'situation': row[0], 'count': row[1]} for row in enrollments_prior_living_situation_query()]
    return {"data": data}


@router.get(
    "/exit_destinations",
    summary="Fetch Counts of Exit Destinations",
    description="This endpoint returns a JSON formatted list of counts of exit destinations",
    tags=["Home agAIn Endpoints"],
)

@cache(expire=86400)
async def exit_destinations():
    """

    This endpoint returns a JSON formatted list of enrollment counts by age.

    **Returns:**
    - A JSON object containing the enrollment counts by age.

    """
    data = [{'destination': row[0], 'count': row[1]} for row in exit_destinations_query()]
    return {"data": data}


@router.get(
    "/enrollments_in_projects",
    summary="Fetch enrolled projects",
    description="This endpoint returns a JSON formatted list of projects that are enrolled in",
    tags=["Home agAIn Endpoints"],
)

@cache(expire=86400)
async def enrollments_in_projects():
    """

    This endpoint returns a JSON formatted list of enrollment counts by age.

    **Returns:**
    - A JSON object containing the enrollment counts by age.

    """
    data = [{'projecttype': row[0], 'count': row[1]} for row in enrollments_in_projects_query()]
    return {"data": data}