from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, iot, users, plantations, trees, logs, analytics, jarvis
from app.services.mqtt import MQTTService
from app.dependencies import get_db
from contextlib import asynccontextmanager

mqtt_service = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global mqtt_service
    db = next(get_db())
    mqtt_service = MQTTService(db)
    mqtt_service.connect()

    yield

    # Shutdown
    if mqtt_service:
        mqtt_service.disconnect()

app = FastAPI(title="Ericsson Hackaton 2025", version="1.0.0", lifespan=lifespan)

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