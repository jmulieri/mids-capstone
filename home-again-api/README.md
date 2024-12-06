# MIDS Capstone - Home Again API

- [Introduction](#introduction)
- [Build Instructions](#build-instructions)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)


## Introduction

The application is implemented using the `FastAPI` framework and makes use of 
Swagger for generating documentation according to the OpenAPI specification.

The following endpoints are provided:

- `GET /health` - returns a JSON response with the current time formatted as an ISO 8601 string
  - example response: `{"time": "2023-09-01T17:56:46.425347"}`
- `GET /hello?name={name}` - returns a JSON response with a friendly greeting
  - example response: `{"message": "hello Jon"}`
- `GET /docs` - returns the HTML page containing the Swagger documentation for the API
- `GET /openapi.json` - returns a JSON response with the app's OpenAPI specification

## Build Instructions

The application can be built using the `Dockerfile` provided in the root
directory. The `Dockerfile` uses multi-stage builds to first build the
application using `poetry` and then package the application into a Docker image
using `python:3.10-slim` as the base image. The application image can be
built without dev dependencies using the following command:

```bash
docker build --build-arg POETRY_OPTIONS="--only main" -t mids_capstone_home_again .
```

## Running the Application

Once the application image has been built, the application can be run as a
docker container using the following commands:

```bash
docker network create mids_capstone_home_again
# redis is needed for request caching
docker run --network=mids_capstone_home_again -d --rm -p 6379:6379 --name redis redis
docker run --network=mids_capstone_home_again -d --rm -p 8000:8000 --name mids_capstone_home_again mids_capstone_home_again
```

Once the container is running, you can access the application documentation
by visiting `http://localhost:8000/docs` in your browser, from here you can
manually test the various endpoints. You can also access the OpenAPI
specification by visiting `http://localhost:8000/openapi.json` in your browser.
And lastly, you can curl the endpoints using the following commands:

```bash
curl -s -X GET "http://localhost:8000/hello?name=Jon"
# returns {"message":"hello Jon"}
```

When you are done, you can stop the application, clean-up the built image and docker
resources via:

```bash
docker stop mids_capstone_home_again
docker rmi -f mids_capstone_home_again
```

## Running Tests

When developing the application locally, it can be tested using `poetry` and
`pytest`. First install the dev dependencies using the following command:

```bash
poetry install
```

Then run the tests using the following command:

```bash
poetry run pytest -vv -s
```
