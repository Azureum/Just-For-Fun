import sys
from pathlib import Path

api_path = Path(__file__).resolve().parents[1] / "apps" / "api"
sys.path.insert(0, str(api_path))

from app.main import app  # noqa: E402
