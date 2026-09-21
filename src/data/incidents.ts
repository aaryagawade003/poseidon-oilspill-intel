import { Incident } from '../types';

export const incidents: Incident[] = [
  {
    id: 'OS-24-081',
    title: 'Mumbai High Offshore Oil Slick & Discharge',
    locationName: 'Arabian Sea · 160 km West of Mumbai Basin',
    coordinates: [19.42, 71.32],
    zoom: 11,
    satelliteAcquisitionTime: '2026-08-21 07:18 UTC',
    sensor: 'Sentinel-1A SAR (IW Mode, Dual-Pol VV+VH, 10m)',
    opticalSensor: 'Sentinel-2B MSI (Cloud-free multispectral)',
    confidence: 0.948,
    areaKm2: 18.4,
    perimeterKm: 34.2,
    estimatedAgeHours: 3.8,
    releaseTimeWindow: '01:30 – 05:50 UTC',
    mostLikelyReleaseTime: '03:40 UTC (±35 min)',
    originUncertaintyRadiusKm: 3.85,
    slickPolygon: [
      [19.465, 71.265],
      [19.458, 71.305],
      [19.442, 71.348],
      [19.425, 71.382],
      [19.398, 71.392],
      [19.382, 71.365],
      [19.395, 71.315],
      [19.418, 71.272],
      [19.445, 71.252],
      [19.465, 71.265],
    ],
    hindcastOriginCenter: [19.268, 71.042],
    hindcastOriginKdeMode: [19.268, 71.042], // KDE Mode (densest cluster)
    hindcastOriginMean: [19.282, 71.058],    // Plain mean (skewed by outliers)
    hindcastOriginCorridor: [
      [19.295, 71.015],
      [19.298, 71.075],
      [19.255, 71.092],
      [19.232, 71.045],
      [19.248, 70.998],
      [19.295, 71.015],
    ],
    hindcastParticles: [
      { lat: 19.425, lon: 71.332, ageH: 0.5, weight: 0.92 },
      { lat: 19.395, lon: 71.285, ageH: 1.2, weight: 0.88 },
      { lat: 19.362, lon: 71.232, ageH: 1.8, weight: 0.85 },
      { lat: 19.330, lon: 71.175, ageH: 2.4, weight: 0.82 },
      { lat: 19.298, lon: 71.118, ageH: 3.0, weight: 0.79 },
      { lat: 19.274, lon: 71.065, ageH: 3.6, weight: 0.78 },
      { lat: 19.268, lon: 71.042, ageH: 3.8, weight: 0.95 }, // KDE Mode Peak
      { lat: 19.262, lon: 71.038, ageH: 4.1, weight: 0.74 },
      { lat: 19.258, lon: 71.025, ageH: 4.5, weight: 0.65 },
    ],
    forecastPlumes: [
      {
        timeOffset: '+6 Hours',
        hours: 6,
        areaKm2: 24.8,
        riskLevel: 'medium',
        spreadUncertaintyKm: 3.4,
        polygon: [
          [19.510, 71.370],
          [19.495, 71.430],
          [19.460, 71.465],
          [19.420, 71.445],
          [19.435, 71.380],
          [19.485, 71.340],
          [19.510, 71.370],
        ]
      },
      {
        timeOffset: '+12 Hours',
        hours: 12,
        areaKm2: 38.5,
        riskLevel: 'high',
        spreadUncertaintyKm: 5.8,
        polygon: [
          [19.580, 71.490],
          [19.555, 71.560],
          [19.490, 71.595],
          [19.445, 71.555],
          [19.470, 71.465],
          [19.540, 71.435],
          [19.580, 71.490],
        ]
      },
      {
        timeOffset: '+24 Hours',
        hours: 24,
        areaKm2: 62.1,
        riskLevel: 'high',
        spreadUncertaintyKm: 9.2,
        polygon: [
          [19.695, 71.720],
          [19.645, 71.830],
          [19.545, 71.865],
          [19.475, 71.790],
          [19.515, 71.660],
          [19.630, 71.635],
          [19.695, 71.720],
        ]
      },
      {
        timeOffset: '+48 Hours',
        hours: 48,
        areaKm2: 108.4,
        riskLevel: 'high',
        spreadUncertaintyKm: 15.6,
        polygon: [
          [19.860, 72.080],
          [19.780, 72.220],
          [19.620, 72.260],
          [19.530, 72.150],
          [19.580, 71.950],
          [19.750, 71.920],
          [19.860, 72.080],
        ]
      },
      {
        timeOffset: '+72 Hours',
        hours: 72,
        areaKm2: 172.0,
        riskLevel: 'high',
        spreadUncertaintyKm: 22.4,
        polygon: [
          [20.040, 72.450],
          [19.920, 72.620],
          [19.710, 72.680],
          [19.590, 72.480],
          [19.670, 72.240],
          [19.910, 72.210],
          [20.040, 72.450],
        ]
      }
    ],
    metOcean: {
      currentSpeed: '0.46 m/s (0.9 kts)',
      currentDirection: '068° ENE (Copernicus CMEMS)',
      currentAngleDeg: 68,
      windSpeed: '14.2 kts (7.3 m/s)',
      windDirection: '235° WSW (ECMWF ERA5)',
      windAngleDeg: 235,
      waveHeight: '1.85 m (Significant Hs)',
      seaSurfaceTemp: '28.4 °C'
    },
    sarMetrics: {
      vvBackscatter: '-23.8 dB (Water: -16.4 dB)',
      vhBackscatter: '-29.1 dB (Depolarization damping)',
      polarimetricRatio: '5.3 dB (VV/VH)',
      glcmEntropy: '4.82 (Uniform slick suppression)',
      glcmHomogeneity: '0.741 (High surface regularity)',
      localContrast: '7.4 dB delta',
      circularity: '0.218 (Highly elongated trail)',
      elongation: '4.65',
      lookalikeProbability: '3.8% (Wind shadow rejected)',
      oilProbability: '94.8% (Confirmed slick signature)',
      resolution: '10m pixel spacing',
      incidenceAngle: '38.4°'
    },
    coastalHazard: {
      sensitiveAreasNearby: [
        'Dahanu Coastal Mangrove Reserve (110 km ENE)',
        'Tarapur Nuclear Power Station Cooling Intake (135 km E)',
        'Maharashtra Coastal Fishery Zone #4 (85 km E)'
      ],
      shorelineImpactHours: 38,
      recommendedBoomZones: [
        'Offshore Interception Line B-2 (Tier-2 Skimmers)',
        'Dahanu Creek Protective Containment Boom (Tier-1 Standby)'
      ],
      threatLevel: 'WARNING'
    },
    vessels: [
      {
        id: 'v-01',
        name: 'MV Eastern Star',
        mmsi: '354891000',
        imo: '9312048',
        flag: 'Panama',
        flagCode: 'PA',
        type: 'VLCC Crude Oil Tanker',
        length: 333,
        destination: 'JNPT / Mumbai Crude Berth',
        lastReportedSpeed: 14.1,
        lastReportedHeading: 62,
        attributionScore: 87,
        riskCategory: 'High',
        scoreBreakdown: {
          spatial: 92,
          temporal: 90,
          alignment: 88,
          behavior: 84,
          aisGap: 72
        },
        keyEvidenceReasons: [
          'Spatial Proximity: Passed within 1.8 km of inferred origin centroid',
          'Temporal Alignment: Traversed origin corridor at 03:22 UTC (18 min prior to peak release model)',
          'Track Alignment: Vessel heading 062° aligns with slick centerline (065°)',
          'Behavioral Anomaly: Sharp speed drop from 14.2 kts to 5.8 kts lasting 43 minutes in open sea',
          'Course Zigzag: Sinuosity index 1.48 during anomaly window indicative of bilge/sludge discharge'
        ],
        speedAnomalyProfile: [
          { time: '01:00', speed: 14.3, normalSpeed: 14.0 },
          { time: '02:00', speed: 14.1, normalSpeed: 14.0 },
          { time: '03:00', speed: 13.8, normalSpeed: 14.0 },
          { time: '03:15', speed: 10.4, normalSpeed: 14.0, isSpillWindow: true },
          { time: '03:30', speed: 5.8, normalSpeed: 14.0, isSpillWindow: true },
          { time: '03:45', speed: 6.2, normalSpeed: 14.0, isSpillWindow: true },
          { time: '04:00', speed: 9.5, normalSpeed: 14.0, isSpillWindow: true },
          { time: '04:30', speed: 13.9, normalSpeed: 14.0 },
          { time: '05:30', speed: 14.2, normalSpeed: 14.0 },
        ],
        trajectory: [
          { lat: 19.120, lon: 70.780, timestamp: '01:00 UTC', speedKts: 14.3, headingDeg: 62 },
          { lat: 19.185, lon: 70.895, timestamp: '02:00 UTC', speedKts: 14.1, headingDeg: 62 },
          { lat: 19.245, lon: 71.010, timestamp: '03:00 UTC', speedKts: 13.8, headingDeg: 61 },
          { lat: 19.262, lon: 71.040, timestamp: '03:30 UTC', speedKts: 5.8, headingDeg: 64, isAnomalyPoint: true },
          { lat: 19.290, lon: 71.085, timestamp: '04:00 UTC', speedKts: 9.5, headingDeg: 66, isAnomalyPoint: true },
          { lat: 19.345, lon: 71.180, timestamp: '05:00 UTC', speedKts: 14.0, headingDeg: 63 },
          { lat: 19.410, lon: 71.295, timestamp: '06:00 UTC', speedKts: 14.2, headingDeg: 62 },
          { lat: 19.475, lon: 71.410, timestamp: '07:00 UTC', speedKts: 14.1, headingDeg: 62 },
        ],
        counterfactualMatch: {
          originDistanceKm: 1.82,
          centroidErrorKm: 1.14,
          spatialScore: 0.834,    // exp(-1.82 / 10) = 0.8336
          centroidScore: 0.892,   // exp(-1.14 / 10) = 0.8922
          driftScore: 0.892,      // IoU
          driftConsistency: 0.872, // 0.35*0.834 + 0.40*0.892 + 0.25*0.892 = 0.8717
          iouOverlap: 0.892,
          centroidOffsetKm: 1.14,
          boundaryDeviationKm: 0.62,
          hausdorffKm: 0.74,
          simulatedPlume: [
            [19.462, 71.268],
            [19.455, 71.308],
            [19.440, 71.345],
            [19.422, 71.378],
            [19.395, 71.388],
            [19.380, 71.362],
            [19.392, 71.318],
            [19.415, 71.275],
            [19.442, 71.255],
            [19.462, 71.268],
          ]
        }
      },
      {
        id: 'v-02',
        name: 'MT Ocean Pride',
        mmsi: '636018221',
        imo: '9420813',
        flag: 'Liberia',
        flagCode: 'LR',
        type: 'Chemical & Product Tanker',
        length: 183,
        destination: 'Kandla Liquid Terminal',
        lastReportedSpeed: 12.8,
        lastReportedHeading: 48,
        attributionScore: 68,
        riskCategory: 'Medium',
        scoreBreakdown: {
          spatial: 74,
          temporal: 65,
          alignment: 70,
          behavior: 62,
          aisGap: 55
        },
        keyEvidenceReasons: [
          'Spatial Proximity: Passed 6.4 km North-West of inferred origin',
          'Temporal Alignment: Passed at 04:50 UTC (near tail end of estimated release window)',
          'Track Alignment: Heading 048° deviates by 17° from observed drift centerline',
          'Minor Speed Variation: Decelerated by 1.8 kts briefly during passing'
        ],
        speedAnomalyProfile: [
          { time: '01:00', speed: 13.0, normalSpeed: 13.0 },
          { time: '02:00', speed: 12.9, normalSpeed: 13.0 },
          { time: '03:00', speed: 12.8, normalSpeed: 13.0 },
          { time: '04:00', speed: 11.2, normalSpeed: 13.0 },
          { time: '04:50', speed: 11.0, normalSpeed: 13.0 },
          { time: '06:00', speed: 12.8, normalSpeed: 13.0 },
        ],
        trajectory: [
          { lat: 19.180, lon: 70.820, timestamp: '02:00 UTC', speedKts: 12.9, headingDeg: 48 },
          { lat: 19.260, lon: 70.920, timestamp: '03:30 UTC', speedKts: 12.8, headingDeg: 48 },
          { lat: 19.325, lon: 71.010, timestamp: '04:50 UTC', speedKts: 11.0, headingDeg: 48 },
          { lat: 19.410, lon: 71.120, timestamp: '06:00 UTC', speedKts: 12.8, headingDeg: 48 },
          { lat: 19.490, lon: 71.220, timestamp: '07:00 UTC', speedKts: 12.8, headingDeg: 48 },
        ],
        counterfactualMatch: {
          originDistanceKm: 6.42,
          centroidErrorKm: 5.82,
          spatialScore: 0.526,    // exp(-6.42 / 10) = 0.526
          centroidScore: 0.559,   // exp(-5.82 / 10) = 0.5587
          driftScore: 0.442,      // IoU
          driftConsistency: 0.501, // 0.35*0.526 + 0.40*0.442 + 0.25*0.559 = 0.5006
          iouOverlap: 0.442,
          centroidOffsetKm: 5.82,
          boundaryDeviationKm: 3.41,
          hausdorffKm: 4.85,
          simulatedPlume: [
            [19.490, 71.210],
            [19.480, 71.250],
            [19.440, 71.280],
            [19.410, 71.260],
            [19.420, 71.210],
            [19.460, 71.190],
            [19.490, 71.210],
          ]
        }
      },
      {
        id: 'v-03',
        name: 'SAR Contact #X-89',
        mmsi: 'UNREGISTERED-DARK',
        imo: 'N/A (AIS Inactive)',
        flag: 'Unknown / Non-Broadcasting',
        flagCode: 'UN',
        type: 'Unidentified Dark Vessel (SAR Hard Target)',
        length: 125,
        destination: 'Unknown Corridor',
        lastReportedSpeed: 9.4,
        lastReportedHeading: 70,
        attributionScore: 62,
        riskCategory: 'Dark Contact',
        scoreBreakdown: {
          spatial: 82,
          temporal: 75,
          alignment: 60,
          behavior: 40,
          aisGap: 98
        },
        keyEvidenceReasons: [
          'SAR Target Correlation: Distinct radar backscatter echo (125m hull) identified on Sentinel-1 scene',
          'AIS Non-Transmission: Zero matching AIS dynamic reports recorded in Indian Coastal Surveillance Network',
          'Position: In vicinity (3.9 km) of backtracked corridor at 03:15 UTC',
          'Action Required: Visual confirmation tasking by Indian Coast Guard Dornier-228 Maritime Reconnaissance'
        ],
        speedAnomalyProfile: [
          { time: '02:00', speed: 9.0, normalSpeed: 10.0 },
          { time: '03:15', speed: 9.4, normalSpeed: 10.0 },
          { time: '04:30', speed: 9.2, normalSpeed: 10.0 },
        ],
        trajectory: [
          { lat: 19.230, lon: 70.960, timestamp: '02:00 UTC (Estimated)', speedKts: 9.2, headingDeg: 70 },
          { lat: 19.275, lon: 71.045, timestamp: '03:15 UTC (Radar Fix)', speedKts: 9.4, headingDeg: 70, isAnomalyPoint: true },
          { lat: 19.330, lon: 71.150, timestamp: '04:45 UTC (Estimated)', speedKts: 9.5, headingDeg: 70 },
        ],
        counterfactualMatch: {
          originDistanceKm: 3.90,
          centroidErrorKm: 3.25,
          spatialScore: 0.677,    // exp(-3.9 / 10) = 0.677
          centroidScore: 0.723,   // exp(-3.25 / 10) = 0.7225
          driftScore: 0.612,      // IoU
          driftConsistency: 0.662, // 0.35*0.677 + 0.40*0.612 + 0.25*0.723 = 0.6625
          iouOverlap: 0.612,
          centroidOffsetKm: 3.25,
          boundaryDeviationKm: 2.10,
          hausdorffKm: 2.80,
          simulatedPlume: [
            [19.450, 71.280],
            [19.435, 71.320],
            [19.410, 71.350],
            [19.385, 71.340],
            [19.395, 71.290],
            [19.425, 71.265],
            [19.450, 71.280],
          ]
        }
      },
      {
        id: 'v-04',
        name: 'MV Sagar Kanya',
        mmsi: '419001420',
        imo: '8021115',
        flag: 'India',
        flagCode: 'IN',
        type: 'Oceanographic Research Vessel',
        length: 100,
        destination: 'Goa NIO Anchorage',
        lastReportedSpeed: 11.2,
        lastReportedHeading: 165,
        attributionScore: 19,
        riskCategory: 'Cleared',
        scoreBreakdown: {
          spatial: 22,
          temporal: 28,
          alignment: 15,
          behavior: 12,
          aisGap: 10
        },
        keyEvidenceReasons: [
          'Spatial Separation: Never approached closer than 26.5 km to the origin envelope',
          'Course Perpendicular: Transiting South (165°) across shipping corridor',
          'Speed Uniformity: Stable 11.2 kts speed profile with zero engine deceleration',
          'Conclusion: Physically impossible source of observed slick (Excluded from suspect ranking)'
        ],
        speedAnomalyProfile: [
          { time: '01:00', speed: 11.2, normalSpeed: 11.2 },
          { time: '02:00', speed: 11.1, normalSpeed: 11.2 },
          { time: '03:00', speed: 11.2, normalSpeed: 11.2 },
          { time: '04:00', speed: 11.2, normalSpeed: 11.2 },
          { time: '05:00', speed: 11.3, normalSpeed: 11.2 },
        ],
        trajectory: [
          { lat: 19.550, lon: 70.920, timestamp: '01:00 UTC', speedKts: 11.2, headingDeg: 165 },
          { lat: 19.420, lon: 70.960, timestamp: '02:30 UTC', speedKts: 11.2, headingDeg: 165 },
          { lat: 19.280, lon: 71.000, timestamp: '04:00 UTC', speedKts: 11.1, headingDeg: 165 },
          { lat: 19.140, lon: 71.040, timestamp: '05:30 UTC', speedKts: 11.3, headingDeg: 165 },
        ],
        counterfactualMatch: {
          originDistanceKm: 26.5,
          centroidErrorKm: 28.4,
          spatialScore: 0.071,   // exp(-2.65) = 0.0706
          centroidScore: 0.058,  // exp(-2.84) = 0.0584
          driftScore: 0.021,     // IoU
          driftConsistency: 0.048,
          iouOverlap: 0.021,
          centroidOffsetKm: 28.4,
          boundaryDeviationKm: 18.2,
          hausdorffKm: 24.5,
          simulatedPlume: [
            [19.320, 71.180],
            [19.310, 71.210],
            [19.280, 71.200],
            [19.290, 71.160],
            [19.320, 71.180],
          ]
        }
      }
    ]
  },
  {
    id: 'OS-24-042',
    title: 'Bay of Bengal · Paradip Port Outer Approaches',
    locationName: 'Bay of Bengal · 45 km SE of Paradip Port',
    coordinates: [19.92, 86.88],
    zoom: 11,
    satelliteAcquisitionTime: '2026-08-18 12:45 UTC',
    sensor: 'Sentinel-1B SAR (IW Mode, VV+VH)',
    opticalSensor: 'Sentinel-2A MSI (Sun-glint enhanced)',
    confidence: 0.923,
    areaKm2: 12.6,
    perimeterKm: 28.4,
    estimatedAgeHours: 4.5,
    releaseTimeWindow: '06:00 – 09:30 UTC',
    mostLikelyReleaseTime: '07:45 UTC',
    originUncertaintyRadiusKm: 4.2,
    slickPolygon: [
      [19.940, 86.820],
      [19.935, 86.870],
      [19.915, 86.910],
      [19.890, 86.925],
      [19.880, 86.890],
      [19.905, 86.840],
      [19.940, 86.820],
    ],
    hindcastOriginCenter: [19.820, 86.710],
    hindcastOriginKdeMode: [19.820, 86.710],
    hindcastOriginMean: [19.832, 86.725],
    hindcastOriginCorridor: [
      [19.845, 86.680],
      [19.850, 86.740],
      [19.805, 86.755],
      [19.790, 86.695],
      [19.845, 86.680],
    ],
    hindcastParticles: [
      { lat: 19.910, lon: 86.860, ageH: 0.8, weight: 0.88 },
      { lat: 19.880, lon: 86.810, ageH: 1.9, weight: 0.84 },
      { lat: 19.850, lon: 86.760, ageH: 3.1, weight: 0.82 },
      { lat: 19.820, lon: 86.710, ageH: 4.5, weight: 0.94 },
    ],
    forecastPlumes: [
      {
        timeOffset: '+6 Hours',
        hours: 6,
        areaKm2: 18.2,
        riskLevel: 'medium',
        spreadUncertaintyKm: 3.6,
        polygon: [
          [19.970, 86.910],
          [19.960, 86.960],
          [19.930, 86.980],
          [19.910, 86.940],
          [19.940, 86.890],
          [19.970, 86.910],
        ]
      },
      {
        timeOffset: '+12 Hours',
        hours: 12,
        areaKm2: 24.5,
        riskLevel: 'high',
        spreadUncertaintyKm: 6.2,
        polygon: [
          [20.010, 86.970],
          [20.000, 87.030],
          [19.950, 87.050],
          [19.925, 87.010],
          [19.960, 86.950],
          [20.010, 86.970],
        ]
      },
      {
        timeOffset: '+24 Hours',
        hours: 24,
        areaKm2: 38.0,
        riskLevel: 'high',
        spreadUncertaintyKm: 10.4,
        polygon: [
          [20.080, 87.060],
          [20.050, 87.150],
          [19.990, 87.180],
          [19.950, 87.110],
          [20.000, 87.030],
          [20.080, 87.060],
        ]
      },
      {
        timeOffset: '+48 Hours',
        hours: 48,
        areaKm2: 68.2,
        riskLevel: 'high',
        spreadUncertaintyKm: 17.5,
        polygon: [
          [20.190, 87.240],
          [20.140, 87.360],
          [20.040, 87.390],
          [19.980, 87.280],
          [20.060, 87.180],
          [20.190, 87.240],
        ]
      },
      {
        timeOffset: '+72 Hours',
        hours: 72,
        areaKm2: 112.5,
        riskLevel: 'high',
        spreadUncertaintyKm: 25.8,
        polygon: [
          [20.310, 87.450],
          [20.240, 87.620],
          [20.100, 87.660],
          [20.020, 87.490],
          [20.140, 87.360],
          [20.310, 87.450],
        ]
      }
    ],
    metOcean: {
      currentSpeed: '0.38 m/s (0.7 kts)',
      currentDirection: '045° NE (Bay of Bengal Gyre)',
      currentAngleDeg: 45,
      windSpeed: '16.5 kts',
      windDirection: '215° SW',
      windAngleDeg: 215,
      waveHeight: '2.10 m',
      seaSurfaceTemp: '29.2 °C'
    },
    sarMetrics: {
      vvBackscatter: '-22.4 dB',
      vhBackscatter: '-28.2 dB',
      polarimetricRatio: '5.8 dB',
      glcmEntropy: '4.71',
      glcmHomogeneity: '0.762',
      localContrast: '6.8 dB',
      circularity: '0.231',
      elongation: '4.12',
      lookalikeProbability: '5.2%',
      oilProbability: '92.3%',
      resolution: '10m pixel spacing',
      incidenceAngle: '41.2°'
    },
    coastalHazard: {
      sensitiveAreasNearby: [
        'Gahirmatha Marine Sanctuary / Olive Ridley Nesting Grounds (55 km NE)',
        'Bhitarkanika Mangrove National Park (70 km NNE)'
      ],
      shorelineImpactHours: 24,
      recommendedBoomZones: [
        'Dhamra Estuary Rapid Defense Perimeter',
        'Gahirmatha Coastal Buffer Line'
      ],
      threatLevel: 'CRITICAL'
    },
    vessels: [
      {
        id: 'v-b01',
        name: 'MV Bengal Carrier',
        mmsi: '419088210',
        imo: '9514890',
        flag: 'India',
        flagCode: 'IN',
        type: 'Capesize Bulk Ore Carrier',
        length: 292,
        destination: 'Paradip Port Ore Berth',
        lastReportedSpeed: 11.5,
        lastReportedHeading: 42,
        attributionScore: 84,
        riskCategory: 'High',
        scoreBreakdown: {
          spatial: 89,
          temporal: 88,
          alignment: 85,
          behavior: 76,
          aisGap: 70
        },
        keyEvidenceReasons: [
          'Spatial match: Transited directly through hindcast origin zone (0.8 km)',
          'Timing: In corridor at 07:35 UTC during peak discharge window',
          'Heading aligns with plume elongation axis',
          'SOG telemetry recorded ballast water pump-out deceleration'
        ],
        speedAnomalyProfile: [
          { time: '05:00', speed: 12.0, normalSpeed: 12.0 },
          { time: '06:00', speed: 11.9, normalSpeed: 12.0 },
          { time: '07:30', speed: 7.2, normalSpeed: 12.0, isSpillWindow: true },
          { time: '08:00', speed: 7.8, normalSpeed: 12.0, isSpillWindow: true },
          { time: '09:00', speed: 11.5, normalSpeed: 12.0 },
        ],
        trajectory: [
          { lat: 19.740, lon: 86.620, timestamp: '06:00 UTC', speedKts: 11.9, headingDeg: 42 },
          { lat: 19.815, lon: 86.705, timestamp: '07:30 UTC', speedKts: 7.2, headingDeg: 42, isAnomalyPoint: true },
          { lat: 19.890, lon: 86.810, timestamp: '09:00 UTC', speedKts: 11.5, headingDeg: 42 },
        ],
        counterfactualMatch: {
          originDistanceKm: 0.82,
          centroidErrorKm: 1.42,
          spatialScore: 0.921,
          centroidScore: 0.868,
          driftScore: 0.865,
          driftConsistency: 0.884,
          iouOverlap: 0.865,
          centroidOffsetKm: 1.42,
          boundaryDeviationKm: 0.85,
          hausdorffKm: 1.15,
          simulatedPlume: [
            [19.935, 86.825],
            [19.930, 86.865],
            [19.910, 86.905],
            [19.885, 86.920],
            [19.875, 86.885],
            [19.900, 86.835],
            [19.935, 86.825],
          ]
        }
      }
    ]
  },
  {
    id: 'OS-24-019',
    title: 'Gulf of Kutch · Vadinar Offshore Terminal',
    locationName: 'Arabian Sea · Entrance to Gulf of Kutch',
    coordinates: [22.58, 69.65],
    zoom: 11,
    satelliteAcquisitionTime: '2026-08-14 05:30 UTC',
    sensor: 'Sentinel-1A SAR (IW Mode, VV+VH)',
    opticalSensor: 'Sentinel-2B MSI',
    confidence: 0.961,
    areaKm2: 9.8,
    perimeterKm: 21.6,
    estimatedAgeHours: 2.5,
    releaseTimeWindow: '02:00 – 04:30 UTC',
    mostLikelyReleaseTime: '03:10 UTC',
    originUncertaintyRadiusKm: 2.9,
    slickPolygon: [
      [22.610, 69.600],
      [22.605, 69.645],
      [22.585, 69.680],
      [22.560, 69.695],
      [22.555, 69.660],
      [22.575, 69.620],
      [22.610, 69.600],
    ],
    hindcastOriginCenter: [22.525, 69.520],
    hindcastOriginKdeMode: [22.525, 69.520],
    hindcastOriginMean: [22.532, 69.528],
    hindcastOriginCorridor: [
      [22.545, 69.495],
      [22.550, 69.545],
      [22.510, 69.555],
      [22.500, 69.505],
      [22.545, 69.495],
    ],
    hindcastParticles: [
      { lat: 22.580, lon: 69.640, ageH: 0.6, weight: 0.90 },
      { lat: 22.555, lon: 69.585, ageH: 1.5, weight: 0.86 },
      { lat: 22.525, lon: 69.520, ageH: 2.5, weight: 0.96 },
    ],
    forecastPlumes: [
      {
        timeOffset: '+6 Hours',
        hours: 6,
        areaKm2: 14.5,
        riskLevel: 'high',
        spreadUncertaintyKm: 2.8,
        polygon: [
          [22.640, 69.680],
          [22.630, 69.730],
          [22.600, 69.755],
          [22.580, 69.725],
          [22.610, 69.670],
          [22.640, 69.680],
        ]
      },
      {
        timeOffset: '+12 Hours',
        hours: 12,
        areaKm2: 21.0,
        riskLevel: 'high',
        spreadUncertaintyKm: 4.9,
        polygon: [
          [22.680, 69.740],
          [22.665, 69.790],
          [22.625, 69.815],
          [22.595, 69.780],
          [22.635, 69.720],
          [22.680, 69.740],
        ]
      },
      {
        timeOffset: '+24 Hours',
        hours: 24,
        areaKm2: 34.2,
        riskLevel: 'high',
        spreadUncertaintyKm: 8.5,
        polygon: [
          [22.730, 69.820],
          [22.710, 69.880],
          [22.660, 69.910],
          [22.620, 69.860],
          [22.670, 69.790],
          [22.730, 69.820],
        ]
      },
      {
        timeOffset: '+48 Hours',
        hours: 48,
        areaKm2: 58.0,
        riskLevel: 'high',
        spreadUncertaintyKm: 14.8,
        polygon: [
          [22.810, 69.940],
          [22.770, 70.040],
          [22.700, 70.080],
          [22.640, 69.990],
          [22.720, 69.900],
          [22.810, 69.940],
        ]
      },
      {
        timeOffset: '+72 Hours',
        hours: 72,
        areaKm2: 92.4,
        riskLevel: 'high',
        spreadUncertaintyKm: 21.5,
        polygon: [
          [22.890, 70.120],
          [22.830, 70.250],
          [22.740, 70.290],
          [22.670, 70.180],
          [22.780, 70.070],
          [22.890, 70.120],
        ]
      }
    ],
    metOcean: {
      currentSpeed: '0.62 m/s (1.2 kts)',
      currentDirection: '075° ENE (Tidal flood stream)',
      currentAngleDeg: 75,
      windSpeed: '11.0 kts',
      windDirection: '240° WSW',
      windAngleDeg: 240,
      waveHeight: '1.20 m',
      seaSurfaceTemp: '29.8 °C'
    },
    sarMetrics: {
      vvBackscatter: '-24.2 dB',
      vhBackscatter: '-30.1 dB',
      polarimetricRatio: '5.9 dB',
      glcmEntropy: '4.95',
      glcmHomogeneity: '0.785',
      localContrast: '8.1 dB',
      circularity: '0.210',
      elongation: '4.88',
      lookalikeProbability: '2.4%',
      oilProbability: '96.1%',
      resolution: '10m pixel spacing',
      incidenceAngle: '36.8°'
    },
    coastalHazard: {
      sensitiveAreasNearby: [
        'Marine National Park & Sanctuary (Jamnagar) (18 km SE)',
        'Pirotan Island Coral Reef Sanctuary (24 km ESE)'
      ],
      shorelineImpactHours: 14,
      recommendedBoomZones: [
        'Vadinar SBM Containment Zone',
        'Pirotan Island Rapid Deflection Line'
      ],
      threatLevel: 'CRITICAL'
    },
    vessels: [
      {
        id: 'v-k01',
        name: 'MT Desert Pearl',
        mmsi: '636015502',
        imo: '9385518',
        flag: 'Marshall Islands',
        flagCode: 'MH',
        type: 'Suezmax Crude Tanker',
        length: 274,
        destination: 'Vadinar SPM Berth #2',
        lastReportedSpeed: 9.8,
        lastReportedHeading: 72,
        attributionScore: 89,
        riskCategory: 'High',
        scoreBreakdown: {
          spatial: 94,
          temporal: 92,
          alignment: 90,
          behavior: 82,
          aisGap: 75
        },
        keyEvidenceReasons: [
          'SPM crude de-ballasting operations correlated with backscatter suppression',
          'Passed within 1.1 km of origin during 03:00-03:20 UTC interval',
          'Tidal vector advection matches slick evolution geometry precisely'
        ],
        speedAnomalyProfile: [
          { time: '01:00', speed: 10.2, normalSpeed: 10.0 },
          { time: '02:30', speed: 9.8, normalSpeed: 10.0 },
          { time: '03:10', speed: 3.5, normalSpeed: 10.0, isSpillWindow: true },
          { time: '04:00', speed: 9.8, normalSpeed: 10.0 },
        ],
        trajectory: [
          { lat: 22.480, lon: 69.430, timestamp: '01:30 UTC', speedKts: 10.2, headingDeg: 72 },
          { lat: 22.520, lon: 69.515, timestamp: '03:10 UTC', speedKts: 3.5, headingDeg: 72, isAnomalyPoint: true },
          { lat: 22.570, lon: 69.620, timestamp: '04:45 UTC', speedKts: 9.8, headingDeg: 72 },
        ],
        counterfactualMatch: {
          originDistanceKm: 1.10,
          centroidErrorKm: 0.88,
          spatialScore: 0.896,
          centroidScore: 0.916,
          driftScore: 0.914,
          driftConsistency: 0.908,
          iouOverlap: 0.914,
          centroidOffsetKm: 0.88,
          boundaryDeviationKm: 0.52,
          hausdorffKm: 0.68,
          simulatedPlume: [
            [22.608, 69.602],
            [22.603, 69.643],
            [22.583, 69.678],
            [22.558, 69.693],
            [22.553, 69.658],
            [22.573, 69.622],
            [22.608, 69.602],
          ]
        }
      }
    ]
  }
];
