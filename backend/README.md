# POSEIDON Forensic Engine

FastAPI backend for SIH26143. It exposes replaceable contracts for SAR observation, CMEMS/ERA5 forcing, historical AIS and counterfactual analysis.

## Run locally

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

From the repository root:

```bash
uvicorn backend.main:app --reload --port 8000
```

Open `/docs` for Swagger.

## Production adapters

The numerical core has explicit boundaries so real providers can replace the offline-safe implementation without changing the UI contract:

- Sentinel-1 GRD -> `SpillObservation`
- CMEMS current vector grid + ERA5 10m winds -> `OceanForcing`
- AIS historical tracks -> `Vessel[]`
- ML segmentation -> observation polygon/confidence

The deterministic engine should be labeled scenario/demo data when real provider feeds are not connected.
