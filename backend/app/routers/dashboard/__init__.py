from fastapi import APIRouter

from app.routers.dashboard import auth, knowledge, locations, personality

router = APIRouter(prefix="/api/dashboard")
router.include_router(auth.router)
router.include_router(locations.router)
router.include_router(knowledge.router)
router.include_router(personality.router)
