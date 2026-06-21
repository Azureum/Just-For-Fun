import jwt

from app.config import settings


def decode_supabase_jwt(token: str) -> dict:
    """Verify and decode an access token issued by Supabase Auth."""
    return jwt.decode(
        token,
        settings.supabase_jwt_secret,
        algorithms=["HS256"],
        audience="authenticated",
    )
