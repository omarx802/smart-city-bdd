from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from src.core.database import SessionLocal
from src.models import Capteur
from src.schemas import CapteurRead

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get all capteurs
@app.get("/capteurs", response_model=list[CapteurRead])
def get_capteurs(db: Session = Depends(get_db)):
    return db.query(Capteur).all()


# Get single capteur by UUID
@app.get("/capteurs/{uuid}", response_model=CapteurRead)
def get_capteur(uuid: UUID, db: Session = Depends(get_db)):
    capteur = db.query(Capteur).filter(Capteur.uuid == uuid.bytes).first()
    if not capteur:
        raise HTTPException(status_code=404, detail="Capteur not found")
    return capteur
