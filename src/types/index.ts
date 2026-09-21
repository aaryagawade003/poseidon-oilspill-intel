export interface MetOceanConditions {
  currentSpeed: string;
  currentDirection: string;
  currentAngleDeg: number;
  windSpeed: string;
  windDirection: string;
  windAngleDeg: number;
  waveHeight: string;
  seaSurfaceTemp: string;
}

export interface SARTelemetryMetrics {
  vvBackscatter: string;
  vhBackscatter: string;
  polarimetricRatio: string;
  glcmEntropy: string;
  glcmHomogeneity: string;
  localContrast: string;
  circularity: string;
  elongation: string;
  lookalikeProbability: string;
  oilProbability: string;
  resolution: string;
  incidenceAngle: string;
}

export interface CoastalImpactAssessment {
  sensitiveAreasNearby: string[];
  shorelineImpactHours: number;
  recommendedBoomZones: string[];
  threatLevel: 'CRITICAL' | 'WARNING' | 'MODERATE';
}

export interface ForecastPlume {
  timeOffset: string;
  hours: number;
  polygon: [number, number][];
  areaKm2: number;
  riskLevel: 'high' | 'medium' | 'low';
  spreadUncertaintyKm: number; // strictly growing with horizon (sigma ~ sqrt(2*K*t))
}

export interface TrajectoryPoint {
  lat: number;
  lon: number;
  timestamp: string;
  speedKts: number;
  headingDeg: number;
  isAnomalyPoint?: boolean;
}

export interface CounterfactualMetrics {
  originDistanceKm: number;
  centroidErrorKm: number;
  spatialScore: number;     // exp(-originDistanceKm / 10)
  centroidScore: number;    // exp(-centroidErrorKm / 10)
  driftScore: number;       // IoU(predicted, observed)
  driftConsistency: number; // 0.35*spatial + 0.40*drift + 0.25*centroid
  iouOverlap: number;
  centroidOffsetKm: number;
  boundaryDeviationKm: number;
  hausdorffKm: number;
  simulatedPlume: [number, number][];
}

export interface VesselCandidate {
  id: string;
  name: string;
  mmsi: string;
  imo: string;
  flag: string;
  flagCode: string;
  type: string;
  length: number;
  destination: string;
  lastReportedSpeed: number;
  lastReportedHeading: number;
  attributionScore: number;
  riskCategory: 'High' | 'Medium' | 'Low' | 'Cleared' | 'Dark Contact';
  scoreBreakdown: {
    spatial: number;
    temporal: number;
    alignment: number;
    behavior: number;
    aisGap: number;
  };
  keyEvidenceReasons: string[];
  trajectory: TrajectoryPoint[];
  counterfactualMatch: CounterfactualMetrics;
  speedAnomalyProfile: {
    time: string;
    speed: number;
    normalSpeed: number;
    isSpillWindow?: boolean;
  }[];
}

export interface DriftResultSchema {
  backward: {
    estimated_origin: {
      lat: number;
      lon: number;
      method: 'Gaussian_KDE_Mode';
    };
    origin_uncertainty_km: number; // 80th-percentile radius
    estimated_release_time: string;
    release_window: string;
    particle_ensemble_size: number;
    turbulent_diffusivity_k: number;
    windage_alpha: number;
  };
  counterfactual: Record<string, {
    vessel_name: string;
    mmsi: string;
    origin_distance_km: number;
    centroid_error_km: number;
    spatial_score: number;
    centroid_score: number;
    drift_score_iou: number;
    drift_consistency: number;
    hausdorff_km: number;
  }>;
  forecast: Record<string, {
    horizon_hours: number;
    area_km2: number;
    spread_uncertainty_km: number;
    risk_level: string;
    polygon_points_count: number;
  }>;
}

export interface Incident {
  id: string;
  title: string;
  locationName: string;
  coordinates: [number, number];
  zoom: number;
  satelliteAcquisitionTime: string;
  sensor: string;
  opticalSensor: string;
  confidence: number;
  areaKm2: number;
  perimeterKm: number;
  estimatedAgeHours: number;
  releaseTimeWindow: string;
  mostLikelyReleaseTime: string;
  slickPolygon: [number, number][];
  hindcastOriginCorridor: [number, number][];
  hindcastOriginCenter: [number, number];
  hindcastOriginKdeMode: [number, number];
  hindcastOriginMean: [number, number];
  originUncertaintyRadiusKm: number; // 80th percentile
  hindcastParticles: { lat: number; lon: number; ageH: number; weight: number }[];
  forecastPlumes: ForecastPlume[];
  metOcean: MetOceanConditions;
  sarMetrics: SARTelemetryMetrics;
  coastalHazard: CoastalImpactAssessment;
  vessels: VesselCandidate[];
}
