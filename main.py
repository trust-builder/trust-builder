from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# Configuración de CORS para que el HTML pueda hablar con Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de datos
class Artesano(BaseModel):
    nombre: str
    especialidad: str

class Valoracion(BaseModel):
    artesano_id: int
    puntos: int

# Inicialización de la DB
def init_db():
    conn = sqlite3.connect('trustbuilder.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS artesanos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            especialidad TEXT NOT NULL,
            puntuacion REAL DEFAULT 0.0,
            votos INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

@app.on_event("startup")
def startup():
    init_db()

@app.get("/")
def read_root():
    return {"status": "MOTOR ONLINE"}

@app.post("/registrar")
def registrar_artesano(artesano: Artesano):
    conn = sqlite3.connect('trustbuilder.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO artesanos (nombre, especialidad) VALUES (?, ?)', 
                   (artesano.nombre, artesano.especialidad))
    conn.commit()
    conn.close()
    return {"message": "Guardado con éxito"}

@app.get("/artesanos")
def get_artesanos():
    conn = sqlite3.connect('trustbuilder.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, nombre, especialidad, puntuacion FROM artesanos ORDER BY id DESC')
    data = cursor.fetchall()
    conn.close()
    return {"artesanos": [{"id": r[0], "nombre": r[1], "especialidad": r[2], "puntuacion": r[3]} for r in data]}

@app.post("/valorar")
def valorar(v: Valoracion):
    conn = sqlite3.connect('trustbuilder.db')
    cursor = conn.cursor()
    cursor.execute('SELECT puntuacion, votos FROM artesanos WHERE id = ?', (v.artesano_id,))
    res = cursor.fetchone()
    if res:
        score_act, votos_act = res
        nuevo_score = ((score_act * votos_act) + v.puntos) / (votos_act + 1)
        cursor.execute('UPDATE artesanos SET puntuacion = ?, votos = ? WHERE id = ?', 
                       (round(nuevo_score, 1), votos_act + 1, v.artesano_id))
    conn.commit()
    conn.close()
    return {"message": "Voto recibido"}