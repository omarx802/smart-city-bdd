from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core.database import SessionLocal
from src.models import Capteur, intervention, citoyen, vehicule
from src.schemas import CapteurRead, intervRead, citoyenRead, vehiculeRead
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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



@app.get("/capteurs/dispo")
def disponibilite_par_location(db: Session = Depends(get_db)):

    tous_capteurs = db.query(Capteur).all()

    result = {}

    for c in tous_capteurs:
        loc = c.location

        if loc not in result:
            result[loc] = {
                "total_capteurs": 0,
                "capteurs_actifs": 0,
                "taux": 0,
                "capteurs": []
            }

        result[loc]["total_capteurs"] += 1

        if c.statut == "actif":
            result[loc]["capteurs_actifs"] += 1

            result[loc]["capteurs"].append({
                "uuid": c.uuid,
                "type": c.type,
                "statut": c.statut,
                "nom_prop": c.nom_prop,
                "addresse_prop": c.addresse_prop,
                "telephone_prop": c.telephone_prop,
                "email_prop": c.email_prop,
                "date_install": c.date_install
            })

    for loc, data in result.items():
        if data["total_capteurs"] > 0:
            data["taux"] = round(
                (data["capteurs_actifs"] / data["total_capteurs"]) * 100, 2
            )
    return result


@app.get("/interventions", response_model=list[intervRead])
def get_interv(db: Session = Depends(get_db)):
    return db.query(intervention).all()


@app.get("/citoyens", response_model=list[citoyenRead])
def get_interv(db: Session = Depends(get_db)):
    return db.query(citoyen).all()


@app.get("/vehicules", response_model=list[vehiculeRead])
def get_interv(db: Session = Depends(get_db)):
    return db.query(vehicule).all()
