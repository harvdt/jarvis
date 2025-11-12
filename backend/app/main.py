from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, iot, users, plantations, trees, logs, analytics, jarvis

app = FastAPI(title="Ericsson Hackaton 2025", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(iot.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(plantations.router, prefix="/api")
app.include_router(trees.router, prefix="/api")
app.include_router(logs.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(jarvis.router, prefix="/api")