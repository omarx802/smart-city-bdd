from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text, extract
from src.core.database import SessionLocal 
from src.models import Capteur, intervention, citoyen, vehicule, trajet
from src.schemas import CapteurRead, intervRead, citoyenRead, vehiculeRead, trajetRead
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


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

@app.get("/interventions/pred")
def get_interv_cout_nature(db: Session = Depends(get_db)):
    now = datetime.now()

    result = db.query(
        intervention.nature_interv,
        intervention.cout
    ).filter(
        extract("month", intervention.time_interv) == now.month,
        extract("year", intervention.time_interv) == now.year
    ).all()
    tot_interv=0
    tot_cout=0
    for row in result:
        if row.nature_interv == 'predictive':
            tot_interv += 1
            tot_cout += row.cout
    return [
        {
            "tot_interv": tot_interv,
            "tot_cout": tot_cout
            }
    ]


@app.get("/citoyens", response_model=list[citoyenRead])
def get_interv(db: Session = Depends(get_db)):
    return db.query(citoyen).all()

@app.get("/citoyens/top5")
def top_5_citoyens():
    db = SessionLocal()

    result = db.execute(text("""
        SELECT TOP 5 nom_cit, score
        FROM citoyen
        ORDER BY score DESC
    """)).fetchall()

    db.close()

    return [
        {"nom_cit": row[0], "score": row[1]}
        for row in result
    ]


@app.get("/vehicules", response_model=list[vehiculeRead])
def get_interv(db: Session = Depends(get_db)):
    return db.query(vehicule).all()

@app.get("/trajets", response_model=list[trajetRead])
def get_interv(db: Session = Depends(get_db)):
    return db.query(trajet).all()

@app.get("/trajets/eco")
def top_5_trajets_eco():
    db = SessionLocal()

    result = db.execute(text("""
        SELECT TOP 5 id_trajet, plaque, origine, dest, duree, eco_c
        FROM trajet
        ORDER BY eco_c DESC
    """)).fetchall()

    db.close()

    return [
        {"id_trajet": row[0],
          "plaque": row[1],
          "origine": row[2],
          "dest": row[3],
          "duree": row[4],
          "eco_c": row[5]
          }
        for row in result
    ]