from __future__ import annotations
from pydantic import BaseModel, Field

class Point(BaseModel):
    lat: float
    lon: float

class SpillObservation(BaseModel):
    centroid: Point
    area_km2: float = Field(gt=0)
    confidence: float = Field(ge=0, le=1)
    acquisition_time: str
    polygon: list[Point] = Field(min_length=3)

class OceanForcing(BaseModel):
    current_speed_mps: float = Field(ge=0)
    current_direction_deg: float = Field(ge=0, lt=360)
    wind_speed_mps: float = Field(ge=0)
    wind_direction_deg: float = Field(ge=0, lt=360)
    windage_alpha: float = Field(default=0.03, ge=0, le=0.2)
    diffusivity_m2s: float = Field(default=120, ge=0)

class Vessel(BaseModel):
    mmsi: str
    name: str
    lat: float
    lon: float
    speed_kts: float = Field(ge=0)
    heading_deg: float = Field(ge=0, lt=360)
    timestamp: str
    ais_gap_hours: float = Field(default=0, ge=0)
    vessel_type: str = "Unknown"

class AnalysisRequest(BaseModel):
    observation: SpillObservation
    forcing: OceanForcing
    vessels: list[Vessel] = []
    horizons_hours: list[int] = [6, 12, 24, 48]
    backward_hours: int = Field(default=36, ge=6, le=168)

class AttributionRequest(BaseModel):
    observation: SpillObservation
    forcing: OceanForcing
    vessels: list[Vessel]
    origin: Point
    release_window_hours: float = Field(default=6, ge=1, le=48)
