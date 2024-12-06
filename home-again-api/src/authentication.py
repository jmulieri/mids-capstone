import base64
import os
import jwt
import httpx

from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicNumbers
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict, Any
from dotenv import load_dotenv
load_dotenv()

security = HTTPBearer()

COGNITO_REGION = "us-east-2"
USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID")
COGNITO_CLIENT_ID = os.getenv("COGNITO_CLIENT_ID")
JWKS_URL = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{USER_POOL_ID}/.well-known/jwks.json"
ALGORITHM = "RS256"


def decode_value(val):
    """Decode JWT base64 value to integer"""
    decoded = base64.urlsafe_b64decode(val + '=' * (-len(val) % 4))
    return int.from_bytes(decoded, 'big')


def convert_jwk_to_pem(jwk):
    """Convert JWK to PEM format"""
    e = decode_value(jwk['e'])
    n = decode_value(jwk['n'])

    # Create RSA public numbers
    public_numbers = RSAPublicNumbers(e=e, n=n)
    public_key = public_numbers.public_key(backend=default_backend())

    # Get PEM
    pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    return pem

async def get_jwks():
    async with httpx.AsyncClient() as client:
        response = await client.get(JWKS_URL)
        response.raise_for_status()
        return response.json()

async def verify_token(token: str) -> Dict[str, Any]:
    """Verify the JWT token from Cognito"""
    try:
        jwks = await get_jwks()
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = convert_jwk_to_pem(key)
                break
        if not rsa_key:
            raise HTTPException(status_code=401, detail="Key not found")

        payload = jwt.decode(token, key=rsa_key, algorithms=[ALGORITHM], audience=COGNITO_CLIENT_ID)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=403, detail="Could not validate credentials")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict:
    """Dependency to get the current authenticated user"""
    token = credentials.credentials
    payload = await verify_token(token)
    return payload
