from fastapi import APIRouter

from app.routers.dashboard import auth

router = APIRouter(prefix="/api/dashboard")
router.include_router(auth.router)
