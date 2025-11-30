from pydantic_settings import BaseSettings
server = r'DESKTOP-0IQFQ1V\SQLEXPRESS'  
database = 'smart_city'
DATABASE_URL = f"mssql+pyodbc://@{server}/{database}?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"


class Settings(BaseSettings):
    APP_NAME: str = "PM BDD Backend"
    DEBUG: bool = True
    DATABASE_URL: str = DATABASE_URL

def get_settings() -> Settings:
    print("DATABASE URL:", DATABASE_URL)
    return Settings()