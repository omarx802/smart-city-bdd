from pydantic import BaseModel
from uuid import UUID
from datetime import date

class CapteurRead(BaseModel):
    uuid: str
    type: str
    location: str
    statut: str | None
    nom_prop: str | None
    addresse_prop: str | None
    telephone_prop: str | None
    email_prop: str | None
    date_install: date | None

    class Config:
        orm_mode = True
