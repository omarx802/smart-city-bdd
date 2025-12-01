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


