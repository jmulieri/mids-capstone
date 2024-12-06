from datetime import datetime
from pydantic import BaseModel
from fastapi import FastAPI, Query
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis
from typing import Annotated, List

from .cors import add_cors_middleware
from .analytics import router as analytics_router
from .cases import router as cases_router

app = FastAPI(
    title="Home Again MIDS Capstone",
    summary="API documentation for Home Again endpoints",
    contact={
        "name": "Jonathan Mulieri",
        "email": "jmulieri@ischool.berkeley.edu",
    }
)
add_cors_middleware(app)
app.include_router(analytics_router, prefix="/analytics", tags=["Home Again Endpoints"])
app.include_router(cases_router, prefix="/cases", tags=["Home Again Endpoints"])


class HelloResponse(BaseModel):
    message: str = "hello friend"

    
@app.get(
    "/hello",
    summary="Greet by name",
    description="This endpoint returns a JSON formatted greeting using a provided name",
    tags=["Home Again Endpoints"],
    response_model=HelloResponse,
)
async def hello(name: str = Query(..., description="Name to use in greeting", min_length=1)):
    """
    
    This endpoint takes a required query parameter `name` and returns a JSON object
    with a greeting message.

    **Arguments:**
    - `name`: The name to use in the greeting. (Required)

    **Returns:**
    - A JSON object containing the greeting message.

    """
    return {"message": f"hello {name}"}


class HealthResponse(BaseModel):
    time: str = "2024-04-13T16:19:00.314082"


@app.get(
    "/health",
    summary="Health check",
    description="This endpoint provides a mechanism for checking the service's health and "
                "returns the current time in ISO 8601 format as a JSON formatted response",
    tags=["Home Again Endpoints"],
    response_model=HealthResponse,
)
async def health():
    """

    This endpoint returns a JSON object with the current date and time in ISO 8601 format.

    **Arguments:**
    - None

    **Returns:**
    - A JSON object containing the current date and time in ISO 8601 format.

    """
    return {"time": datetime.now().isoformat()}


@app.on_event("startup")
async def startup_event():
    redis = aioredis.from_url("redis://redis", encoding="utf-8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
