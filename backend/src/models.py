from sqlalchemy import Column, String, Date
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
