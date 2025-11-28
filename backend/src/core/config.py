from pydantic_settings import BaseSettings

DATABASE_URL = (
    "mssql+pyodbc:///?odbc_connect="
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=(localdb)\\smart_city;"
    "Database=smart_city;"
    "Trusted_Connection=yes;"
)

class Settings(BaseSettings):
    APP_NAME: str = "PM BDD Backend"
    DEBUG: bool = True
    DATABASE_URL: str = DATABASE_URL

def get_settings() -> Settings:
    print("DATABASE URL:", DATABASE_URL)
    return Settings()