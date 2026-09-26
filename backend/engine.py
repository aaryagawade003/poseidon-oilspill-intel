from __future__ import annotations
from math import atan2, cos, exp, radians, sin, sqrt

EARTH_KM = 6371.0088


def haversine_km(a_lat, a_lon, b_lat, b_lon):
    p1, p2 = radians(a_lat), radians(b_lat)
    dp = radians(b_lat - a_lat)
    dl = radians(b_lon - a_lon)
    h = sin(dp/2)**2 + cos(p1)*cos(p2)*sin(dl/2)**2
    return 2 * EARTH_KM * atan2(sqrt(h), sqrt(max(0, 1-h)))


def destination(lat, lon, distance_km, bearing_deg):
    br = radians(bearing_deg)
    p1 = radians(lat)
    l1 = radians(lon)
    d = distance_km / EARTH_KM
    p2 = asin_safe(sin(p1)*cos(d) + cos(p1)*sin(d)*cos(br))
    l2 = l1 + atan2(sin(br)*sin(d)*cos(p1), cos(d)-sin(p1)*sin(p2))
    return p2 * 180/3.141592653589793, ((l2*180/3.141592653589793)+540)%360-180


def asin_safe(x):
    from math import asin
    return asin(max(-1, min(1, x)))


def estimate_origin(obs, forcing, backward_hours):
    drift_speed = forcing.current_speed_mps + forcing.wind_speed_mps * forcing.windage_alpha
    travel_km = drift_speed * backward_hours * 3.6
    back_bearing = (forcing.current_direction_deg + 180) % 360
    lat, lon = destination(obs.centroid.lat, obs.centroid.lon, travel_km, back_bearing)
    uncertainty = max(3.0, sqrt(max(forcing.diffusivity_m2s, 1) * backward_hours * 3600) / 1000 * 1.65)
    return {"lat": lat, "lon": lon, "uncertainty_km": round(uncertainty, 2), "travel_km": round(travel_km, 2)}


def polygon_translate(points, distance_km, bearing_deg):
    return [{"lat": destination(p["lat"], p["lon"], distance_km, bearing_deg)[0], "lon": destination(p["lat"], p["lon"], distance_km, bearing_deg)[1]} for p in points]


def forecast(obs, forcing, horizons):
    results = []
    for h in horizons:
        distance = (forcing.current_speed_mps + forcing.wind_speed_mps * forcing.windage_alpha) * h * 3.6
        uncertainty = sqrt(max(forcing.diffusivity_m2s, 1) * h * 3600) / 1000
        polygon = polygon_translate([p.model_dump() for p in obs.polygon], distance, forcing.current_direction_deg)
        area = obs.area_km2 * (1 + 0.018 * h)
        risk = "high" if h <= 12 else "medium" if h <= 24 else "low"
        results.append({"horizon_hours": h, "area_km2": round(area, 2), "spread_uncertainty_km": round(uncertainty, 2), "risk_level": risk, "polygon": polygon})
    return results


def score_vessels(obs, forcing, vessels, origin):
    rows = []
    for v in vessels:
        spatial = 100 * exp(-haversine_km(v.lat, v.lon, origin["lat"], origin["lon"]) / 18)
        temporal = 100 * exp(-v.ais_gap_hours / 18)
        heading_error = abs(((v.heading_deg - forcing.current_direction_deg + 180) % 360) - 180)
        alignment = 100 * (1 - min(heading_error, 180) / 180)
        behavior = min(100, 55 + min(v.speed_kts, 25) * 1.8 + min(v.ais_gap_hours, 10) * 2)
        ais_gap = 100 * exp(-v.ais_gap_hours / 8)
        score = 0.34*spatial + 0.24*temporal + 0.18*alignment + 0.14*behavior + 0.10*ais_gap
        if v.ais_gap_hours >= 8 and score > 35:
            category = "Dark Contact"
        elif score >= 70:
            category = "High"
        elif score >= 48:
            category = "Medium"
        else:
            category = "Low"
        rows.append({"mmsi": v.mmsi, "name": v.name, "vessel_type": v.vessel_type, "attribution_score": round(score, 1), "risk_category": category, "distance_to_origin_km": round(haversine_km(v.lat, v.lon, origin["lat"], origin["lon"]), 2), "score_breakdown": {"spatial": round(spatial,1), "temporal": round(temporal,1), "alignment": round(alignment,1), "behavior": round(behavior,1), "ais_gap": round(ais_gap,1)}, "evidence": ["Spatial proximity to inferred origin corridor", "Temporal compatibility with release window" if v.ais_gap_hours < 8 else "Extended AIS gap overlaps the release window", "Course compatibility with prevailing current vector" if alignment >= 60 else "Weak course alignment with forcing vector"]})
    return sorted(rows, key=lambda x: x["attribution_score"], reverse=True)


def analyze(req):
    origin = estimate_origin(req.observation, req.forcing, req.backward_hours)
    ranked = score_vessels(req.observation, req.forcing, req.vessels, origin)
    return {"pipeline": ["detect", "characterise", "hindcast", "origin", "ais_funnel", "counterfactual", "dossier"], "provenance": {"sar": "request observation", "ocean": "forcing contract", "ais": "historical/synthetic request data", "mode": "OFFLINE-SAFE"}, "origin": {**origin, "release_window_hours": 6, "confidence": round(max(0.35, req.observation.confidence * exp(-origin['uncertainty_km']/80)), 3)}, "forecast": forecast(req.observation, req.forcing, req.horizons_hours), "attribution": ranked, "counterfactual": counterfactual(req, ranked, origin)}


def counterfactual(req, ranked, origin):
    out = []
    for row in ranked[:10]:
        d = row["distance_to_origin_km"]
        drift = max(0, 1 - d/80)
        centroid = max(0, 1 - d/100)
        consistency = 0.35*(row["score_breakdown"]["spatial"]/100) + 0.40*drift + 0.25*centroid
        out.append({"mmsi": row["mmsi"], "name": row["name"], "origin_distance_km": d, "iou_overlap": round(drift,3), "centroid_score": round(centroid,3), "drift_consistency": round(consistency,3), "status": "correlation candidate"})
    return out
