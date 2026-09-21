import React, { useState } from 'react';
import { Incident } from '../types';
import { Satellite, Cpu, CheckCircle2, XCircle, AlertCircle, Sliders, Scan, Layers, Sparkles } from 'lucide-react';

interface SARInspectionProps {
  incident: Incident;
}

export const SARInspection: React.FC<SARInspectionProps> = ({ incident }) => {
  const [viewMode, setViewMode] = useState<'raw' | 'segmentation' | 'overlay' | 'feature_heat'>('overlay');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const { sarMetrics } = incident;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-navy-900/90 border border-navy-700/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center space-x-2">
            <Satellite className="w-5 h-5 text-cyber-cyan" />
            <h2 className="text-lg font-bold font-mono text-white">
              SAR SATELLITE SENSING & LOOK-ALIKE DISCRIMINATION
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-cyber-cyan border border-blue-500/30 font-mono">
              LEVEL-2 ARD
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sensor: <span className="text-slate-200 font-mono">{incident.sensor}</span> · Pass Time: <span className="text-slate-200 font-mono">{incident.satelliteAcquisitionTime}</span>
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center space-x-1.5 bg-navy-950 p-1.5 rounded-lg border border-navy-800">
          <button
            onClick={() => setViewMode('raw')}
            className={`px-3 py-1 text-xs font-mono rounded ${
              viewMode === 'raw' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Raw SAR (σ⁰ dB)
          </button>
          <button
            onClick={() => setViewMode('segmentation')}
            className={`px-3 py-1 text-xs font-mono rounded ${
              viewMode === 'segmentation' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            U-Net Mask
          </button>
          <button
            onClick={() => setViewMode('overlay')}
            className={`px-3 py-1 text-xs font-mono rounded ${
              viewMode === 'overlay' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Split Swipe
          </button>
          <button
            onClick={() => setViewMode('feature_heat')}
            className={`px-3 py-1 text-xs font-mono rounded ${
              viewMode === 'feature_heat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            GLCM Entropy
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Image Canvas / Radar Simulation */}
        <div className="lg:col-span-7 bg-navy-900/90 border border-navy-700/80 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <Scan className="w-4 h-4 text-cyber-cyan" />
              <span>CO-REGISTERED RADAR CHIP [2048 × 2048 SIGMA-0]</span>
            </span>
            <span className="text-emerald-400">IoU: 0.892 · Dice: 0.941</span>
          </div>

          {/* Interactive Radar Chip Canvas */}
          <div className="relative w-full h-[400px] mt-3 rounded-lg overflow-hidden bg-navy-950 border border-navy-800 flex items-center justify-center select-none group">
            {/* Synthetic Grayscale SAR Background with Radar Speckle & Dark Slick Pattern */}
            <div className="absolute inset-0 bg-[#070e1b] overflow-hidden">
              {/* Synthetic Sea Texture (Speckle Noise Simulation) */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
                    repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 4px)`
                }}
              />

              {/* Raw Dark Slick Patch (Suppressed Capillary Waves) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                <defs>
                  {/* Radar Gradient */}
                  <linearGradient id="slickDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#010408" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#030914" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#051224" stopOpacity="0.88" />
                  </linearGradient>

                  {/* AI Mask Glow */}
                  <linearGradient id="aiMask" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.65" />
                  </linearGradient>
                </defs>

                {/* The Synthetic Hydrocarbon Slick Path */}
                {viewMode === 'raw' && (
                  <path
                    d="M 120 180 C 180 140, 260 160, 340 190 C 420 220, 480 210, 520 240 C 500 270, 420 260, 350 240 C 270 220, 190 230, 130 220 Z"
                    fill="url(#slickDark)"
                    stroke="#020813"
                    strokeWidth="3"
                  />
                )}

                {viewMode === 'segmentation' && (
                  <g>
                    <path
                      d="M 120 180 C 180 140, 260 160, 340 190 C 420 220, 480 210, 520 240 C 500 270, 420 260, 350 240 C 270 220, 190 230, 130 220 Z"
                      fill="url(#aiMask)"
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                    <circle cx="340" cy="205" r="4" fill="#f59e0b" />
                    <text x="350" y="210" fill="#f59e0b" fontSize="11" fontFamily="monospace">Centroid [19.42°N, 71.33°E]</text>
                  </g>
                )}

                {viewMode === 'overlay' && (
                  <g>
                    {/* Underlying Raw Slick */}
                    <path
                      d="M 120 180 C 180 140, 260 160, 340 190 C 420 220, 480 210, 520 240 C 500 270, 420 260, 350 240 C 270 220, 190 230, 130 220 Z"
                      fill="url(#slickDark)"
                      stroke="#020813"
                      strokeWidth="3"
                    />
                    {/* Clamped AI Overlay based on Split Slider */}
                    <clipPath id="splitClip">
                      <rect x="0" y="0" width={`${(sliderPosition / 100) * 600}`} height="400" />
                    </clipPath>
                    <path
                      d="M 120 180 C 180 140, 260 160, 340 190 C 420 220, 480 210, 520 240 C 500 270, 420 260, 350 240 C 270 220, 190 230, 130 220 Z"
                      fill="url(#aiMask)"
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                      clipPath="url(#splitClip)"
                    />
                  </g>
                )}

                {viewMode === 'feature_heat' && (
                  <g>
                    <path
                      d="M 120 180 C 180 140, 260 160, 340 190 C 420 220, 480 210, 520 240 C 500 270, 420 260, 350 240 C 270 220, 190 230, 130 220 Z"
                      fill="#ef4444"
                      fillOpacity="0.75"
                      stroke="#f97316"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </svg>

              {/* Slider bar for Split Swipe */}
              {viewMode === 'overlay' && (
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-cyber-cyan shadow-[0_0_10px_#00f0ff] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-navy-950 border-2 border-cyber-cyan flex items-center justify-center text-[10px] text-cyber-cyan font-mono shadow-lg">
                    ↔
                  </div>
                </div>
              )}
            </div>

            {/* Canvas HUD labels */}
            <div className="absolute top-3 left-3 bg-navy-950/80 px-2 py-1 rounded border border-navy-700 text-[10px] font-mono text-slate-300">
              POL: VV+VH · INC: {sarMetrics.incidenceAngle}
            </div>
            <div className="absolute bottom-3 right-3 bg-navy-950/80 px-2 py-1 rounded border border-navy-700 text-[10px] font-mono text-cyber-cyan">
              {viewMode === 'raw' && 'MODE: RAW SAR CALIBRATED BACKSCATTER (dB)'}
              {viewMode === 'segmentation' && 'MODE: U-NET++ PREDICTED OIL MASK'}
              {viewMode === 'overlay' && 'MODE: SWIPE COMPARISON (RAW vs PREDICTED)'}
              {viewMode === 'feature_heat' && 'MODE: GLCM TEXTURE ENTROPY SUPPRESSION'}
            </div>
          </div>

          {/* Slider input if overlay */}
          {viewMode === 'overlay' && (
            <div className="mt-3 flex items-center space-x-3 text-xs font-mono text-slate-400">
              <span>Raw SAR</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full accent-cyber-cyan"
              />
              <span>AI Mask</span>
            </div>
          )}
        </div>

        {/* Right 5 Cols: Scientific Evidence Breakdown (Observed -> Derived -> Inferred) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Scientific Workflow Progression */}
          <div className="bg-navy-900/90 border border-navy-700/80 rounded-xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Scientific Inference Chain</span>
            </h3>

            <div className="space-y-3 text-xs">
              {/* 1. OBSERVED */}
              <div className="p-2.5 rounded-lg bg-navy-950 border border-blue-500/30">
                <div className="flex items-center justify-between text-blue-400 font-mono font-bold mb-1">
                  <span>1. OBSERVED (Direct Sensor Telemetry)</span>
                  <span className="text-[10px] bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800">RAW DATA</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px] mt-1.5">
                  <div>VV Backscatter: <span className="text-white">{sarMetrics.vvBackscatter}</span></div>
                  <div>VH Backscatter: <span className="text-white">{sarMetrics.vhBackscatter}</span></div>
                  <div>Polarimetric Ratio: <span className="text-white">{sarMetrics.polarimetricRatio}</span></div>
                  <div>Resolution: <span className="text-white">{sarMetrics.resolution}</span></div>
                </div>
              </div>

              {/* 2. DERIVED */}
              <div className="p-2.5 rounded-lg bg-navy-950 border border-amber-500/30">
                <div className="flex items-center justify-between text-amber-400 font-mono font-bold mb-1">
                  <span>2. DERIVED (Mathematical Feature Space)</span>
                  <span className="text-[10px] bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">CALCULATED</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px] mt-1.5">
                  <div>GLCM Entropy: <span className="text-white">{sarMetrics.glcmEntropy}</span></div>
                  <div>Homogeneity: <span className="text-white">{sarMetrics.glcmHomogeneity}</span></div>
                  <div>Local Contrast: <span className="text-white">{sarMetrics.localContrast}</span></div>
                  <div>Circularity 4πA/P²: <span className="text-white">{sarMetrics.circularity}</span></div>
                </div>
              </div>

              {/* 3. INFERRED */}
              <div className="p-2.5 rounded-lg bg-navy-950 border border-emerald-500/30">
                <div className="flex items-center justify-between text-emerald-400 font-mono font-bold mb-1">
                  <span>3. INFERRED (Deep Learning Classifier)</span>
                  <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">ML INFERENCE</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px] mt-1.5">
                  <div>Oil Slick Prob: <span className="text-emerald-400 font-bold">{sarMetrics.oilProbability}</span></div>
                  <div>Look-alike Prob: <span className="text-slate-400">{sarMetrics.lookalikeProbability}</span></div>
                  <div>Affected Area: <span className="text-white font-bold">{incident.areaKm2} km²</span></div>
                  <div>Boundary Sharpness: <span className="text-white">High (0.87)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Look-Alike Rejection Module */}
          <div className="bg-navy-900/90 border border-navy-700/80 rounded-xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>False-Positive / Look-Alike Validation</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2.5 p-2 rounded bg-navy-950 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Low-Wind Calm Sea: REJECTED</div>
                  <div className="text-[11px] text-slate-400">
                    ERA5 wind speed is 14.2 kts (7.3 m/s), well above the 3.0 m/s calm-sea wind threshold.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-2 rounded bg-navy-950 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Biogenic / Algae Slick: REJECTED</div>
                  <div className="text-[11px] text-slate-400">
                    Sentinel-2 MSI corroboration confirmed absence of chlorophyll bloom / fluorescence signatures.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-2 rounded bg-navy-950 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Ship Wake: REJECTED</div>
                  <div className="text-[11px] text-slate-400">
                    Slick morphology lacks divergent Kelvin wave signature; width exceeds normal wake boundary.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
