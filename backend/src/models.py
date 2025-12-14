from sqlalchemy import Column, String, Date, Integer,DECIMAL
from src.core.database import Base

class Capteur(Base):
    __tablename__ = "capteur"

    uuid = Column(String(50), primary_key=True, index=True)
    type = Column(String(50), nullable=False)
    location = Column(String(50), nullable=False)
    statut = Column(String(50), nullable=True)
    nom_prop = Column(String(50), nullable=True)
    addresse_prop = Column(String(50), nullable=True)
    telephone_prop = Column(String(50), nullable=True)
    email_prop = Column(String(50), nullable=True)
    date_install = Column(Date, nullable=True)

class intervention(Base):
    __tablename__ = "intervention"

    id_interv = Column(String(50), primary_key=True, index=True)
    time_interv = Column(String(50), nullable=False)
    nature_interv = Column(String(50), nullable=False)
    duree = Column(String(50), nullable=True)
    cout = Column(DECIMAL(10,2), nullable=True)
    impact = Column(String(50), nullable=True)
    tech_interv = Column(String(50), nullable=True)
    tech_valide = Column(String(50), nullable=True)


class citoyen(Base):
    __tablename__ = "citoyen"

    id = Column(Integer, primary_key=True, index=True)
    nom_cit = Column(String(50), nullable=False)
    adresse_cit = Column(String(50), nullable=False)
    cord_cit = Column(String(50), nullable=True)
    score = Column(Integer, nullable=True)
    preference = Column(String(50), nullable=True)

class vehicule(Base):
    __tablename__ = "vehicule"

    plaque = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), nullable=False)
    energie = Column(DECIMAL(10,2), nullable=False)

class trajet(Base):
    __tablename__ = "trajet"

    id_trajet = Column(Integer, primary_key=True, index=True)
    plaque = Column(String(50), nullable=False)
    origine = Column(String(50), nullable=False)
    dest = Column(String(50), nullable=False)
    duree = Column(String(50), nullable=False)
    eco_c = Column(DECIMAL(10,2), nullable=False)

class Pollution(Base):
    __tablename__ = "pollution"

    nom_ville = Column(String, primary_key=True, index=True)
    aqi = Column(Integer, nullable=False)
    pm25 = Column(DECIMAL(4,1), nullable=False)
    pm10 = Column(DECIMAL(4,1), nullable=False)
    no2 = Column(DECIMAL(4,1), nullable=False)
    co = Column(DECIMAL(4,1), nullable=False)
    co2 = Column(DECIMAL(4,1), nullable=False)
    o3 = Column(DECIMAL(4,1), nullable=False)
    so2 = Column(DECIMAL(4,1), nullable=False)
    dechet = Column(Integer, nullable=False)