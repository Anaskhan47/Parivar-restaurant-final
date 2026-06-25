import sys
import os
import shutil
from pathlib import Path

# Add backend directory to Python path so it can find app.* modules
backend_dir = Path(__file__).parent.parent / "backend"
sys.path.append(str(backend_dir))

# Vercel Serverless File System is Read-Only.
# We must copy the SQLite database to /tmp to allow writes (like booking a table).
# Note: Data will NOT persist across cold starts in serverless environments.
db_source = Path(__file__).parent / "parivar.db"
db_target = Path("/tmp/parivar.db")

if not db_target.exists() and db_source.exists():
    try:
        shutil.copy(db_source, db_target)
    except Exception:
        pass

# Force the FastAPI app to use the writable /tmp database
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:////tmp/parivar.db"

# Import the FastAPI app
from app.main import app
