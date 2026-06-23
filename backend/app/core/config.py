from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Parivar Restaurant OS"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Using local SQLite for easier local development without requiring external DB
    DATABASE_URL: str = "sqlite+aiosqlite:///./parivar.db"

    # JWT Settings
    SECRET_KEY: str = "parivar_super_secret_key_for_development_only_12345"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days

    class Config:
        case_sensitive = True

settings = Settings()
