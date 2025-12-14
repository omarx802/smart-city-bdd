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
        from_attributes = True


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
        from_attributes = True


class citoyenRead(BaseModel):
    id: int
    nom_cit: str
    adresse_cit: str
    cord_cit: str | None
    score: int | None
    preference: str | None

    class Config:
        from_attributes = True


class vehiculeRead(BaseModel):
    plaque: int
    type: str
    energie: float

    class Config:
        from_attributes = True

class trajetRead(BaseModel):
    id_trajet: int
    plaque: str | None
    origine: str | None
    dest: str | None
    duree: str | None
    eco_c: float | None
    class Config:
        from_attributes = True

class PollutionRead(BaseModel):
    nom_ville: str
    aqi: int | None
    pm25: float| None
    pm10: float| None
    no2: float| None
    co: float| None
    co2: float| None
    o3: float| None
    so2: float| None
    dechet: float| None

    class Config:
        from_attributes = True