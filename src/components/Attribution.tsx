import React, { useState } from 'react';
import { Incident, VesselCandidate } from '../types';
import { Shield, AlertOctagon, CheckCircle2, HelpCircle, Navigation, Radio, Flame, Play, FileCheck2, Cpu } from 'lucide-react';
import { TelemetryChart } from './TelemetryChart';

interface AttributionProps {
  incident: Incident;
  selectedVessel: VesselCandidate;
  onSelectVessel: (vessel: VesselCandidate) => void;
  showCounterfactual: boolean;
  setShowCounterfactual: (show: boolean) => void;
  onOpenEvidence: () => void;
}

export const Attribution: React.FC<AttributionProps> = ({
  incident,
  selectedVessel,
  onSelectVessel,
  showCounterfactual,
  setShowCounterfactual,
  onOpenEvidence,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleTestCounterfactual = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowCounterfactual(true);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-navy-900/90 border border-navy-700/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold font-mono text-white">
              COUNTERFACTUAL VESSEL ATTRIBUTION & BAYESIAN SCORING
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-mono">
              INVERSE MODELING
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Bayesian Formulation: <span className="text-cyber-cyan font-mono">S = 0.30·Spatial + 0.25·Temporal + 0.20·Alignment + 0.15·Behavior + 0.10·AIS_Gap</span>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenEvidence}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-mono font-bold flex items-center space-x-1.5 shadow-lg glow-danger transition-all"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>EXPORT ICG DOSSIER</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Ranked Candidate Leads */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Ranked Suspect Vessels</span>
            <span className="text-slate-400 text-[10px]">{incident.vessels.length} Evaluated</span>
          </div>

          <div className="space-y-2.5">
            {incident.vessels.map((vessel, index) => {
              const isSelected = selectedVessel.id === vessel.id;
              const isHigh = vessel.riskCategory === 'High';
              const isDark = vessel.riskCategory === 'Dark Contact';
              const isCleared = vessel.riskCategory === 'Cleared';

              return (
                <div
                  key={vessel.id}
                  onClick={() => onSelectVessel(vessel)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-navy-800/95 border-cyber-cyan shadow-lg shadow-cyan-500/10 scale-[1.01]'
                      : 'bg-navy-900/80 border-navy-700 hover:border-slate-500 hover:bg-navy-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        isHigh ? 'bg-red-500 text-white' : isDark ? 'bg-purple-500 text-white' : 'bg-navy-700 text-slate-300'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className="font-mono font-bold text-sm text-white truncate max-w-[150px]">
                        {vessel.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 font-mono">
                      <span className={`text-base font-extrabold ${
                        isHigh ? 'text-red-400' : isDark ? 'text-purple-400' : isCleared ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {vessel.attributionScore}
                      </span>
                      <span className="text-[10px] text-slate-400">/100</span>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="truncate">{vessel.type}</span>
                    <span className="px-1.5 py-0.2 rounded bg-navy-950 text-slate-300 border border-navy-700">
                      {vessel.flagCode}
                    </span>
                  </div>

                  {/* Progress Bar of Score */}
                  <div className="mt-2 w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        isHigh ? 'bg-red-500' : isDark ? 'bg-purple-500' : isCleared ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${vessel.attributionScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Selected Vessel Investigation Workspace */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-navy-900/90 border border-navy-700/80 rounded-xl p-4 shadow-xl">
            {/* Vessel Header info */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-navy-800 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-mono font-bold text-white">
                    {selectedVessel.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                    selectedVessel.riskCategory === 'High'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : selectedVessel.riskCategory === 'Dark Contact'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {selectedVessel.riskCategory.toUpperCase()} RISK
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  MMSI: <span className="text-slate-200">{selectedVessel.mmsi}</span> · IMO: <span className="text-slate-200">{selectedVessel.imo}</span> · Flag: <span className="text-slate-200">{selectedVessel.flag}</span>
                </div>
              </div>

              {/* Counterfactual Trigger Button */}
              <button
                onClick={handleTestCounterfactual}
                disabled={isSimulating}
                className="px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center space-x-2 shadow-lg glow-cyan transition-all"
              >
                {isSimulating ? (
                  <>
                    <Radio className="w-3.5 h-3.5 animate-spin" />
                    <span>SIMULATING DRIFT...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-3.5 h-3.5 text-amber-300" />
                    <span>TEST COUNTERFACTUAL HYPOTHESIS</span>
                  </>
                )}
              </button>
            </div>

            {/* Score Breakdown Bars */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Spatial Fit (30%):</span>
                <span className="text-white font-bold">{selectedVessel.scoreBreakdown.spatial}/100</span>
              </div>
              <div className="p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Temporal Fit (25%):</span>
                <span className="text-white font-bold">{selectedVessel.scoreBreakdown.temporal}/100</span>
              </div>
              <div className="p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Trajectory Align (20%):</span>
                <span className="text-white font-bold">{selectedVessel.scoreBreakdown.alignment}/100</span>
              </div>
              <div className="p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Behavior Anomaly (15%):</span>
                <span className="text-white font-bold">{selectedVessel.scoreBreakdown.behavior}/100</span>
              </div>
              <div className="p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">AIS Gap / Dark (10%):</span>
                <span className="text-white font-bold">{selectedVessel.scoreBreakdown.aisGap}/100</span>
              </div>
            </div>

            {/* Counterfactual Simulation Comparison Card */}
            {showCounterfactual && (
              <div className="mt-4 p-3 rounded-lg bg-purple-950/40 border border-purple-500/50">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>COUNTERFACTUAL PHYSICAL MATCH TO OBSERVED SLICK</span>
                  </span>
                  <span className="text-emerald-400">
                    MATCH CONFIDENCE: {(selectedVessel.counterfactualMatch.driftConsistency * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-navy-950 border border-purple-800/50">
                    <span className="text-slate-400 text-[10px] block">IoU Contour Overlap:</span>
                    <span className="text-cyber-cyan font-extrabold text-sm">
                      {(selectedVessel.counterfactualMatch.iouOverlap * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-2 rounded bg-navy-950 border border-purple-800/50">
                    <span className="text-slate-400 text-[10px] block">Centroid Offset Error:</span>
                    <span className="text-white font-bold text-sm">
                      {selectedVessel.counterfactualMatch.centroidOffsetKm} km
                    </span>
                  </div>
                  <div className="p-2 rounded bg-navy-950 border border-purple-800/50">
                    <span className="text-slate-400 text-[10px] block">Boundary Deviation:</span>
                    <span className="text-white font-bold text-sm">
                      {selectedVessel.counterfactualMatch.boundaryDeviationKm} km
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-purple-200">
                  Hypothesis evaluation: Simulating a continuous discharge along this vessel's AIS trajectory between {incident.releaseTimeWindow} advects into the exact observed SAR footprint.
                </div>
              </div>
            )}

            {/* Forensic Reasons */}
            <div className="mt-4">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Forensic Attribution Evidence Log:
              </h4>
              <ul className="space-y-1.5 text-xs">
                {selectedVessel.keyEvidenceReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-200 bg-navy-950/60 p-2 rounded border border-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Telemetry Anomaly Chart */}
            <div className="mt-4">
              <TelemetryChart vessel={selectedVessel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
