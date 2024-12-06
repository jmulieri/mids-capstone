import pytest
from fastapi.testclient import TestClient

from unittest import mock
mock.patch("fastapi_cache.decorator.cache", lambda *args, **kwargs: lambda f: f).start()

from src import __version__
from src.main import app


client = TestClient(app)


def test_version():
    assert __version__ == "0.1.0"


def test_root_endpoint():
    """
    Test that the root endpoint returns a 404.
    """
    response = client.get("/")
    assert response.status_code == 404


class TestPredictEndpoint:
    HOUSE_FEATURES = {
        "MedInc": 8.3252,
        "HouseAge": 41.0,
        "AveRooms": 6.98412698,
        "AveBedrms": 1.02380952,
        "Population": 322.0,
        "AveOccup": 2.55555556,
        "Latitude": 37.88,
        "Longitude": -122.23
    }

    def test_with_valid_features(self):
        """
        Test that the predict endpoint returns a 200 and the expected message
        when valid input features are provided.
        """
        response = client.post("/predict", json=self.HOUSE_FEATURES)
        assert response.status_code == 200
        assert "prediction" in response.json()
        price = response.json()["prediction"]
        assert (4 < price < 5)

    def test_with_no_params(self):
        """
        Test that the predict endpoint returns a 422.
        """
        response = client.post("/predict")
        assert response.status_code == 422

    @pytest.mark.parametrize(
        "missing_param",
        ["MedInc", "HouseAge", "AveRooms", "AveBedrms", "Population", "AveOccup", "Latitude", "Longitude"]
    )
    def test_with_missing_param(self, missing_param):
        """
        Test that the predict endpoint returns a 422 and the expected message
        when the input features are missing a value.
        """
        features = self.HOUSE_FEATURES.copy()
        del features[missing_param]
        response = client.post("/predict", json=features)
        assert response.status_code == 422
        error = response.json()["detail"][0]
        assert error["type"] == "missing"
        assert error["loc"] == ["body", missing_param]


class TestHealthEndpoint:
    def test(self):
        """
        Test that the health endpoint returns a 200 and the expected message.
        """
        response = client.get("/health")
        assert "time" in response.json()


class TestHelloEndpoint:
    MISSING_NAME_RESPONSE = {
            "detail": [{
                "input": None,
                "loc": ["query", "name"],
                "msg": "Field required",
                "type": "missing",
                "url": "https://errors.pydantic.dev/2.4/v/missing"
            }]
        }

    def test_with_name(self):
        """
        Test that the hello endpoint returns a 200 and the expected message
        when a name is provided.
        """
        response = client.get("/hello?name=Jon")
        assert response.status_code == 200
        assert response.json() == {"message": "hello Jon"}

    def test_with_no_params(self):
        """
        Test that the hello endpoint returns a 422 and the expected message
        when no params are provided.
        """
        response = client.get("/hello")
        assert response.status_code == 422
        assert response.json() == self.MISSING_NAME_RESPONSE

    def test_with_wrong_param(self):
        """
        Test that the hello endpoint returns a 422 and the expected message
        when an incorrect param is provided.
        """
        response = client.get("/hello?foobar=Jon")
        assert response.status_code == 422
        assert response.json() == self.MISSING_NAME_RESPONSE


class TestDocsEndpoint:
    TITLE_TAG = "<title>Home Again MIDS Capstone - Swagger UI</title>"

    def test_with_no_params(self):
        """
        Test that the docs endpoint returns a 200 and the expected content
        when no params are provided.
        """
        response = client.get("/docs")
        self._assert_valid_response(response)

    def test_with_arbitrary_params(self):
        """
        Test that the docs endpoint returns a 200 and the expected content
        when arbitrary params are provided.
        """
        response = client.get("/docs?foo=bar&baz=qux")
        self._assert_valid_response(response)

    def _assert_valid_response(self, response):
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
        assert self.TITLE_TAG in response.text


class TestOpenAPIEndpoint:
    def test_with_no_params(self):
        """
        Test that the openapi endpoint returns a 200 and the expected OpenAPI spec version.
        """
        response = client.get("/openapi.json")
        self._assert_valid_response(response)

    def test_with_arbitrary_params(self):
        """
        Test that the openapi endpoint returns a 200 and the expected OpenAPI spec version
        when arbitrary params are provided.
        """
        response = client.get("/openapi.json?foo=bar&baz=qux")
        self._assert_valid_response(response)

    @staticmethod
    def _assert_valid_response(response):
        assert response.status_code == 200
        assert "application/json" in response.headers["content-type"]
        assert response.json()["openapi"] >= "3.0.0"
