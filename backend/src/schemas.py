from pydantic import BaseModel
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


class intervRead(BaseModel):
    id_interv: int
    time_interv: str
    nature_interv: str
    duree: str | None
    cout: float | None
    impact: str | None
    tech_interv: str | None
    tech_valide: str | None

    class Config:
        orm_mode = True


class citoyenRead(BaseModel):
    id: int
    nom_cit: str
    adresse_cit: str
    cord_cit: str | None
    score: int | None
    preference: str | None

    class Config:
        orm_mode = True


class vehiculeRead(BaseModel):
    plaque: int
    type: str
    energie: float

    class Config:
        orm_mode = True