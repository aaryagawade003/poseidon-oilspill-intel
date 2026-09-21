import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Incident, VesselCandidate } from '../types';
import { Layers, Eye, Compass, Navigation, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

interface MapViewProps {
  incident: Incident;
  selectedVessel: VesselCandidate | null;
  onSelectVessel: (vessel: VesselCandidate) => void;
  showCounterfactual: boolean;
  timeOffsetHours: number;
}

export const MapView: React.FC<MapViewProps> = ({
  incident,
  selectedVessel,
  onSelectVessel,
  showCounterfactual,
  timeOffsetHours
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  // Layer Visibility Toggles - Simplified Default State
  const [layers, setLayers] = useState({
    slick: true,
    hindcast: false,
    forecast: false,
    vessels: true,
    metOcean: false,
    counterfactual: false,
    satelliteTile: false,
  });

  const [showLayers, setShowLayers] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: incident.coordinates,
        zoom: incident.zoom,
        zoomControl: false,
      });

      // Default Dark Nautical Basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Zoom Control to top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      const layersGroup = L.layerGroup().addTo(map);
      layersGroupRef.current = layersGroup;
      mapRef.current = map;
    } else {
      mapRef.current.setView(incident.coordinates, incident.zoom);
    }
  }, [incident.id]);

  // Update Layers whenever state changes
  useEffect(() => {
    const map = mapRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Base Map Toggle (Satellite vs Dark)
    if (layers.satelliteTile) {
      const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri, Maxar, Earthstar Geographics',
        maxZoom: 18,
      });
      group.addLayer(satLayer);
    }

    // 2. MetOcean Vectors (Animated / Directional Arrows)
    if (layers.metOcean) {
      const { currentAngleDeg, currentSpeed, windAngleDeg, windSpeed } = incident.metOcean;
      
      // Add current vector indicator box
      const metMarker = L.circleMarker([incident.coordinates[0] - 0.12, incident.coordinates[1] + 0.18], {
        radius: 6,
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.8
      }).bindTooltip(`<b>Ocean Current:</b> ${currentSpeed}<br/>Direction: ${currentAngleDeg}° ENE`, {
        permanent: false,
        className: 'font-mono text-xs'
      });
      group.addLayer(metMarker);
    }

    // 3. Hindcast Origin Probability Corridor
    if (layers.hindcast) {
      const originPolygon = L.polygon(incident.hindcastOriginCorridor, {
        color: '#f59e0b',
        weight: 2,
        dashArray: '5, 5',
        fillColor: '#f59e0b',
        fillOpacity: 0.25,
      }).bindPopup(`
        <div class="p-2 font-mono text-xs">
          <div class="font-bold text-amber-400 mb-1">⚡ HINDCAST INFERRED ORIGIN</div>
          <div><b>Est. Time:</b> ${incident.mostLikelyReleaseTime}</div>
          <div><b>Window:</b> ${incident.releaseTimeWindow}</div>
          <div><b>Confidence:</b> 91.2% (Lagrangian Backtrack)</div>
          <div class="mt-1 text-[10px] text-slate-300">Stochastic Runge-Kutta 2nd Order Integration</div>
        </div>
      `);
      group.addLayer(originPolygon);

      // Add Origin Centroid marker
      const originIcon = L.divIcon({
        className: 'origin-marker',
        html: `
          <div class="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/30 border-2 border-amber-400 animate-ping"></div>
          <div class="absolute inset-0 flex items-center justify-center w-6 h-6">
            <div class="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      const originPoint = L.marker(incident.hindcastOriginCenter, { icon: originIcon });
      group.addLayer(originPoint);

      // Backtracked particles path
      const particlePoints = incident.hindcastParticles.map(p => [p.lat, p.lon] as [number, number]);
      const particleLine = L.polyline(particlePoints, {
        color: '#f59e0b',
        weight: 2,
        opacity: 0.7,
        dashArray: '3, 6'
      });
      group.addLayer(particleLine);

      incident.hindcastParticles.forEach((p, idx) => {
        const pMarker = L.circleMarker([p.lat, p.lon], {
          radius: 3.5,
          color: '#f59e0b',
          fillColor: '#fef08a',
          fillOpacity: 0.9,
          weight: 1
        }).bindTooltip(`t - ${p.ageH}h drift`, { className: 'font-mono text-[10px]' });
        group.addLayer(pMarker);
      });
    }

    // 4. Observed Satellite Oil Slick Polygon
    if (layers.slick) {
      const slick = L.polygon(incident.slickPolygon, {
        color: '#00f0ff',
        weight: 2.5,
        fillColor: '#001a2c',
        fillOpacity: 0.75,
      }).bindPopup(`
        <div class="p-2 font-mono text-xs">
          <div class="font-bold text-cyber-cyan mb-1 flex items-center gap-1">
            <span>🛰️ OBSERVED OIL SLICK</span>
            <span class="text-[10px] bg-cyan-950 text-cyan-300 px-1 rounded border border-cyan-800">SAR</span>
          </div>
          <div><b>Area:</b> ${incident.areaKm2} km²</div>
          <div><b>Perimeter:</b> ${incident.perimeterKm} km</div>
          <div><b>Acquisition:</b> ${incident.satelliteAcquisitionTime}</div>
          <div><b>Sensor:</b> ${incident.sensor}</div>
          <div class="mt-1 text-emerald-400 font-semibold">Classification: Heavy Hydrocarbon (94.8%)</div>
        </div>
      `);
      group.addLayer(slick);

      // Slick Centroid Label
      const centerMarker = L.divIcon({
        className: 'slick-label',
        html: `
          <div class="px-2 py-0.5 rounded bg-cyan-950/90 text-cyber-cyan border border-cyan-500/60 text-[10px] font-mono whitespace-nowrap shadow-lg">
            Slick: ${incident.areaKm2} km²
          </div>
        `,
        iconAnchor: [40, 10]
      });
      group.addLayer(L.marker(incident.coordinates, { icon: centerMarker }));
    }

    // 5. Forward Forecast Plumes (+6h, +12h, +24h)
    if (layers.forecast) {
      incident.forecastPlumes.forEach((plume) => {
        const color = plume.riskLevel === 'high' ? '#ef4444' : '#f97316';
        const forecastPoly = L.polygon(plume.polygon, {
          color: color,
          weight: 1.5,
          dashArray: '4, 4',
          fillColor: color,
          fillOpacity: 0.15,
        }).bindPopup(`
          <div class="p-2 font-mono text-xs">
            <div class="font-bold text-red-400 mb-1">🌊 FORWARD DRIFT FORECAST</div>
            <div><b>Timeline:</b> ${plume.timeOffset}</div>
            <div><b>Projected Area:</b> ${plume.areaKm2} km²</div>
            <div><b>Drift Speed:</b> ${incident.metOcean.currentSpeed}</div>
            <div class="mt-1 text-amber-300 font-semibold">Threat: Shoreline arrival risk in ~38h</div>
          </div>
        `);
        group.addLayer(forecastPoly);
      });
    }

    // 6. Counterfactual Forward Plume for Selected Vessel
    if (showCounterfactual && selectedVessel && layers.counterfactual) {
      const cfPoly = L.polygon(selectedVessel.counterfactualMatch.simulatedPlume, {
        color: '#a855f7',
        weight: 2,
        dashArray: '2, 3',
        fillColor: '#a855f7',
        fillOpacity: 0.35,
      }).bindPopup(`
        <div class="p-2 font-mono text-xs">
          <div class="font-bold text-purple-400 mb-1">🧪 COUNTERFACTUAL HYPOTHESIS TEST</div>
          <div><b>Hypothesis:</b> ${selectedVessel.name} discharged at origin</div>
          <div><b>Physical IoU Overlap:</b> ${(selectedVessel.counterfactualMatch.iouOverlap * 100).toFixed(1)}%</div>
          <div><b>Centroid Error:</b> ${selectedVessel.counterfactualMatch.centroidOffsetKm} km</div>
          <div class="mt-1 text-purple-200">Result: Physical advection reproduces satellite slick structure.</div>
        </div>
      `);
      group.addLayer(cfPoly);
    }

    // 7. AIS Vessel Tracks & Position Markers
    if (layers.vessels) {
      incident.vessels.forEach((vessel) => {
        const isSelected = selectedVessel?.id === vessel.id;
        const isSuspect = vessel.riskCategory === 'High';
        const isDark = vessel.riskCategory === 'Dark Contact';
        const isCleared = vessel.riskCategory === 'Cleared';

        let trackColor = '#3b82f6';
        if (isSuspect) trackColor = '#ef4444';
        else if (isDark) trackColor = '#a855f7';
        else if (isCleared) trackColor = '#10b981';

        const latLngs = vessel.trajectory.map(t => [t.lat, t.lon] as [number, number]);
        
        // Draw Track line
        const trackPolyline = L.polyline(latLngs, {
          color: trackColor,
          weight: isSelected ? 4 : (isSuspect ? 3 : 2),
          opacity: isSelected ? 1 : 0.75,
          dashArray: isDark ? '4, 4' : undefined
        }).on('click', () => onSelectVessel(vessel));
        group.addLayer(trackPolyline);

        // Vessel Icon at latest or interpolated point
        const latest = vessel.trajectory[Math.floor(vessel.trajectory.length / 2)];
        const vesselMarker = L.divIcon({
          className: 'vessel-marker',
          html: `
            <div class="relative cursor-pointer group">
              <div class="w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                isSuspect
                  ? 'bg-red-950 border-red-500 text-red-400 glow-danger'
                  : isDark
                  ? 'bg-purple-950 border-purple-500 text-purple-400'
                  : isCleared
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                  : 'bg-blue-950 border-blue-500 text-blue-400'
              } ${isSelected ? 'scale-125 ring-2 ring-white' : ''}">
                <div class="w-2 h-2 rounded-full ${isSuspect ? 'bg-red-400' : 'bg-cyan-400'}"></div>
              </div>
              <div class="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-navy-950/90 border border-navy-700 text-[10px] font-mono whitespace-nowrap text-slate-200">
                ${vessel.name} [${vessel.attributionScore}]
              </div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([latest.lat, latest.lon], { icon: vesselMarker });
        marker.on('click', () => onSelectVessel(vessel));
        group.addLayer(marker);

        // Mark Anomaly Point (e.g. speed drop point)
        vessel.trajectory.filter(t => t.isAnomalyPoint).forEach((pt) => {
          const anomalyIcon = L.divIcon({
            className: 'anomaly-marker',
            html: `
              <div class="w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center animate-bounce shadow-md">
                <span class="text-[9px] text-white font-bold">!</span>
              </div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });
          const aMarker = L.marker([pt.lat, pt.lon], { icon: anomalyIcon })
            .bindTooltip(`<b>Speed Anomaly:</b> ${pt.speedKts} kts at ${pt.timestamp}`, {
              className: 'font-mono text-xs'
            });
          group.addLayer(aMarker);
        });
      });
    }

  }, [incident, layers, selectedVessel, showCounterfactual, timeOffsetHours]);

  return (
    <div className="relative w-full h-[650px] bg-navy-950 rounded-xl overflow-hidden border border-navy-800 shadow-2xl">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Layer Controls Panel */}
      <div className="glass-panel-heavy absolute top-4 left-4 z-[1000] rounded-xl max-w-xs transition-all">
        <button 
          onClick={() => setShowLayers(!showLayers)}
          className="flex items-center justify-between w-full p-3 text-xs font-mono font-bold text-slate-200 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyber-cyan" />
            <span>MAP SETTINGS</span>
          </span>
          <span className="text-[10px] text-slate-400 bg-navy-800 px-2 py-0.5 rounded ml-4">EPSG:4326</span>
        </button>

        {showLayers && (
          <div className="p-3 pt-0 mt-1 border-t border-navy-800 space-y-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span>Observed SAR Slick</span>
              </span>
              <input
                type="checkbox"
                checked={layers.slick}
                onChange={(e) => setLayers({ ...layers, slick: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Hindcast Origin Corridor</span>
              </span>
              <input
                type="checkbox"
                checked={layers.hindcast}
                onChange={(e) => setLayers({ ...layers, hindcast: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span>Forecast Plumes (+24h)</span>
              </span>
              <input
                type="checkbox"
                checked={layers.forecast}
                onChange={(e) => setLayers({ ...layers, forecast: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <span>AIS Candidate Tracks</span>
              </span>
              <input
                type="checkbox"
                checked={layers.vessels}
                onChange={(e) => setLayers({ ...layers, vessels: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                <span>Counterfactual Plume</span>
              </span>
              <input
                type="checkbox"
                checked={layers.counterfactual}
                onChange={(e) => setLayers({ ...layers, counterfactual: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>MetOcean Current Vector</span>
              </span>
              <input
                type="checkbox"
                checked={layers.metOcean}
                onChange={(e) => setLayers({ ...layers, metOcean: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white text-slate-300 pt-2 border-t border-navy-800 mt-1">
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>Satellite Basemap</span>
              </span>
              <input
                type="checkbox"
                checked={layers.satelliteTile}
                onChange={(e) => setLayers({ ...layers, satelliteTile: e.target.checked })}
                className="rounded bg-navy-800 border-navy-600 text-cyber-cyan focus:ring-0"
              />
            </label>
          </div>
        )}
      </div>

      {/* Floating Tactical Compass & Quick Jump */}
      <div className="glass-panel-heavy absolute top-4 right-14 z-[1000] flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 shadow-lg">
        <button
          onClick={() => mapRef.current?.setView(incident.coordinates, incident.zoom)}
          className="hover:text-cyber-cyan flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-navy-800"
        >
          <Compass className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Slick Center</span>
        </button>
        <span className="text-navy-700">|</span>
        <button
          onClick={() => mapRef.current?.setView(incident.hindcastOriginCenter, incident.zoom + 1)}
          className="hover:text-amber-400 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-navy-800"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>Origin</span>
        </button>
      </div>

      {/* Bottom Map Legend */}
      <div className="glass-panel-heavy absolute bottom-4 left-4 z-[1000] px-3 py-2 rounded-lg flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-cyan-400 border border-white"></span>
          <span>Observed Slick</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-400/40 border border-amber-400"></span>
          <span>Hindcast Corridor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 border border-white"></span>
          <span>Top Suspect Track</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500 border border-white"></span>
          <span>Dark Vessel Contact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
          <span>Cleared Vessel</span>
        </div>
      </div>
    </div>
  );
};
