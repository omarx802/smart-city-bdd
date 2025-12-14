import random
from src.core.database import SessionLocal
from src.models import Pollution

villes_sousse = [
    "sousse", "khezama", "akouda", "bouficha", "hammam sousse",
    "sidi bou ali", "msaken", "enfidha", "kalaa kbira", "sahloul"
]

def generate_aqi_data(ville):
    return Pollution(
        nom_ville=ville,
        aqi=random.randint(30, 70),
        pm25=round(random.uniform(0, 150), 1),
        pm10=round(random.uniform(0, 200), 1),
        no2=round(random.uniform(0, 200), 1),
        co=round(random.uniform(0, 50), 1),
        co2=round(random.uniform(300, 800), 1),
        o3=round(random.uniform(0, 200), 1),
        so2=round(random.uniform(0, 100), 1),
        dechet=round(random.uniform(30, 50), 1),
    )

def insert_pollution_data():
    db = SessionLocal()
    try:
        data = [generate_aqi_data(v) for v in villes_sousse]
        db.add_all(data)
        db.commit()
        print("✅ Données pollution insérées avec succès")
    except Exception as e:
        db.rollback()
        print("❌ Erreur :", e)
    finally:
        db.close()

if __name__ == "__main__":
    insert_pollution_data()
