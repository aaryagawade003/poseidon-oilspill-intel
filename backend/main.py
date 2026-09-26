from __future__ import annotations
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import AnalysisRequest, AttributionRequest
from .engine import analyze, estimate_origin, score_vessels

app = FastAPI(
    title="POSEIDON Forensic Engine",
    version="2.0.0",
    description="SIH26143 oil-spill detection, hindcast, AIS correlation and counterfactual analysis API",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"service": "POSEIDON", "version": "2.0.0", "status": "ready", "docs": "/docs"}

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "poseidon-forensic-engine",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

@app.post("/api/analyze")
def run_analysis(req: AnalysisRequest):
    return analyze(req)

@app.post("/api/hindcast")
def hindcast(req: AnalysisRequest):
    origin = estimate_origin(req.observation, req.forcing, req.backward_hours)
    return {
        "estimated_origin": origin,
        "method": "Lagrangian first-order backtrace",
        "production_adapter": "CMEMS/ERA5 velocity-grid compatible",
    }

@app.post("/api/attribution")
def attribution(req: AttributionRequest):
    origin = req.origin.model_dump()
    return {
        "candidates": score_vessels(req.observation, req.forcing, req.vessels, origin),
        "note": "Scores express evidence correlation, not legal responsibility.",
    }

@app.get("/api/capabilities")
def capabilities():
    return {
        "sar": ["scene ingest contract", "segmentation adapter", "look-alike rejection"],
        "met_ocean": ["CMEMS-compatible current grid", "ERA5-compatible wind grid", "Lagrangian hindcast"],
        "ais": ["spatial-temporal funnel", "behaviour features", "AIS gap detection"],
        "forensics": ["counterfactual replay", "uncertainty", "evidence dossier"],
        "deployment": ["Docker", "Render/Fly/Kubernetes compatible"],
    }
