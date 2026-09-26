import { Incident } from './types';

const API_BASE = (import.meta.env.VITE_POSEIDON_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export interface BackendAnalysis {
  origin: { lat: number; lon: number; uncertainty_km: number; travel_km: number; release_window_hours: number; confidence: number };
  forecast: Array<{ horizon_hours: number; area_km2: number; spread_uncertainty_km: number; risk_level: string }>;
  attribution: Array<{ mmsi: string; name: string; attribution_score: number; risk_category: string; distance_to_origin_km: number }>;
  counterfactual: Array<{ mmsi: string; name: string; origin_distance_km: number; iou_overlap: number; drift_consistency: number; status: string }>;
}

function isoToSafeString(value: string) {
  return value.includes('T') ? value : new Date(value).toISOString();
}

export async function checkBackend(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1800) });
    return response.ok;
  } catch {
    return false;
  }
}

export async function runForensicAnalysis(incident: Incident): Promise<BackendAnalysis> {
  const forcing = {
    current_speed_mps: Math.max(0.1, parseFloat(incident.metOcean.currentSpeed) * 0.514444),
    current_direction_deg: incident.metOcean.currentAngleDeg,
    wind_speed_mps: Math.max(0.1, parseFloat(incident.metOcean.windSpeed) * 0.514444),
    wind_direction_deg: incident.metOcean.windAngleDeg,
    windage_alpha: 0.03,
    diffusivity_m2s: 120,
  };

  const body = {
    observation: {
      centroid: { lat: incident.hindcastOriginCenter[0], lon: incident.hindcastOriginCenter[1] },
      area_km2: incident.areaKm2,
      confidence: incident.confidence,
      acquisition_time: isoToSafeString(incident.satelliteAcquisitionTime),
      polygon: incident.slickPolygon.map(([lat, lon]) => ({ lat, lon })),
    },
    forcing,
    vessels: incident.vessels.map(v => ({
      mmsi: v.mmsi,
      name: v.name,
      lat: v.trajectory[0]?.lat ?? incident.coordinates[0],
      lon: v.trajectory[0]?.lon ?? incident.coordinates[1],
      speed_kts: v.lastReportedSpeed,
      heading_deg: v.lastReportedHeading,
      timestamp: v.trajectory[0]?.timestamp ?? incident.satelliteAcquisitionTime,
      ais_gap_hours: v.riskCategory === 'Dark Contact' ? 12 : v.scoreBreakdown.aisGap < 50 ? 4 : 1,
      vessel_type: v.type,
    })),
    horizons_hours: incident.forecastPlumes.map(p => p.hours),
    backward_hours: 36,
  };

  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`POSEIDON backend returned ${response.status}`);
  return response.json();
}
