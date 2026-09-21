import React from 'react';
import { Incident, VesselCandidate } from '../types';
import { Shield, FileText, Printer, X, AlertTriangle, CheckCircle2, Award } from 'lucide-react';

interface EvidenceModalProps {
  incident: Incident;
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  incident,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const topSuspect = incident.vessels[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-navy-900 border border-navy-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-navy-950 px-6 py-3 border-b border-navy-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-red-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>RESTRICTED // MARITIME LAW ENFORCEMENT EVIDENCE DOSSIER</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-200 font-sans print:bg-white print:text-black">
          {/* Official Emblem & Header */}
          <div className="text-center border-b border-navy-700 pb-6 print:border-gray-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-800 border border-cyber-cyan mb-2">
              <Shield className="w-6 h-6 text-cyber-cyan" />
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              Government of India · Ministry of Defence · Indian Coast Guard
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1 print:text-black">
              NATIONAL MARITIME POLLUTION FORENSIC ATTRIBUTION REPORT
            </div>
            <div className="text-xs text-cyber-cyan font-mono mt-0.5">
              NTRO Space Applications Wing · INCOIS Ocean Modeling · POSEIDON Decision Support
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
              <span><b>Dossier ID:</b> {incident.id}-ICG-LE</span>
              <span><b>Date:</b> 21 AUGUST 2026</span>
              <span><b>Jurisdiction:</b> Exclusive Economic Zone (EEZ) of India</span>
            </div>
          </div>

          {/* Section 1: Incident Description */}
          <div>
            <h4 className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider mb-2 border-b border-navy-800 pb-1">
              01 · SATELLITE DETECTION & SLICK CHARACTERIZATION
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-navy-950/80 p-3 rounded-xl border border-navy-800 print:bg-gray-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Observation Time:</span>
                <span className="font-bold text-white print:text-black">{incident.satelliteAcquisitionTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Primary Sensor:</span>
                <span className="font-bold text-white print:text-black">{incident.sensor.split(' ')[0]} SAR</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Slick Surface Extent:</span>
                <span className="font-bold text-white print:text-black">{incident.areaKm2} km² ({incident.perimeterKm} km)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Detection Confidence:</span>
                <span className="font-bold text-emerald-400">{(incident.confidence * 100).toFixed(1)}% (U-Net)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Ocean Dynamics & Inferred Origin */}
          <div>
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 border-b border-navy-800 pb-1">
              02 · METOCEAN FORCING & LAGRANGIAN BACKTRACKING
            </h4>
            <div className="text-xs space-y-2 bg-navy-950/80 p-3 rounded-xl border border-navy-800 print:bg-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono">
                <div>Current: <span className="text-white print:text-black font-semibold">{incident.metOcean.currentSpeed} ({incident.metOcean.currentDirection})</span></div>
                <div>Wind Field: <span className="text-white print:text-black font-semibold">{incident.metOcean.windSpeed} ({incident.metOcean.windDirection})</span></div>
                <div>Wave Sea State: <span className="text-white print:text-black font-semibold">{incident.metOcean.waveHeight} Hs</span></div>
              </div>
              <div className="pt-2 border-t border-navy-800/80 font-mono text-[11px] text-slate-300 print:text-black">
                <b>Hindcast Origin Centroid:</b> {incident.hindcastOriginCenter[0]}° N, {incident.hindcastOriginCenter[1]}° E | <b>Release Window:</b> {incident.releaseTimeWindow} (Peak probability: {incident.mostLikelyReleaseTime})
              </div>
            </div>
          </div>

          {/* Section 3: Vessel Attribution Summary */}
          <div>
            <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2 border-b border-navy-800 pb-1">
              03 · ATTRIBUTED CULPRIT VESSEL IDENTIFICATION
            </h4>
            <div className="bg-navy-950/80 p-4 rounded-xl border border-red-500/40 print:bg-gray-100 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-base font-bold font-mono text-white print:text-black flex items-center gap-2">
                    <span>{topSuspect.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-mono">
                      CONFIRMED SUSPECT ({topSuspect.attributionScore}/100)
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    MMSI: {topSuspect.mmsi} · IMO: {topSuspect.imo} · Flag: {topSuspect.flag} ({topSuspect.flagCode}) · Type: {topSuspect.type}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-slate-400 block">Physical Match:</span>
                  <span className="text-sm font-bold text-cyber-cyan">IoU: {(topSuspect.counterfactualMatch.iouOverlap * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Evidence Reasons */}
              <div className="space-y-1.5 text-xs text-slate-300 print:text-black">
                <div className="font-mono font-bold text-[11px] text-slate-400">Supporting Evidence Chain:</div>
                {topSuspect.keyEvidenceReasons.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Operational Law Enforcement Directives */}
          <div>
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 border-b border-navy-800 pb-1">
              04 · STATUTORY DIRECTIVES & LAW ENFORCEMENT ACTIONS
            </h4>
            <div className="space-y-2 text-xs font-mono bg-navy-950/80 p-3 rounded-xl border border-navy-800 print:bg-gray-100">
              <div className="flex items-start gap-2">
                <span className="font-bold text-red-400">1. INTERCEPT DIRECTIVE:</span>
                <span>Task Indian Coast Guard Fast Patrol Vessel (FPV) and Dornier-228 for aerial slick surveillance and visual documentation of vessel hull.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-400">2. PORT STATE DETENTION:</span>
                <span>Issue detention order to Mercantile Marine Department (MMD) upon vessel arrival at JNPT/Mumbai crude terminal under Merchant Shipping Act 1958.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-cyber-cyan">3. FORENSIC SAMPLING:</span>
                <span>Board vessel to seize oil record books, conduct GC-MS chemical fingerprinting of slop tanks, and extract VDR navigation logs.</span>
              </div>
            </div>
          </div>

          {/* Signatures & Chain of Custody */}
          <div className="pt-6 border-t border-navy-800 grid grid-cols-2 gap-8 text-xs font-mono text-slate-400 print:text-black">
            <div>
              <div className="font-bold text-white print:text-black">INVESTIGATING OFFICER</div>
              <div className="mt-1">Commandant, Marine Environment Protection</div>
              <div>Coast Guard Regional HQ (West), Mumbai</div>
              <div className="mt-4 border-b border-slate-700 w-48"></div>
              <div className="text-[10px] mt-1">Signature / Digital Key Verified</div>
            </div>
            <div>
              <div className="font-bold text-white print:text-black">SCIENTIFIC VERIFICATION</div>
              <div className="mt-1">Senior Scientist, Remote Sensing Application</div>
              <div>National Technical Research Organisation (NTRO)</div>
              <div className="mt-4 border-b border-slate-700 w-48"></div>
              <div className="text-[10px] mt-1">Algorithm Hash: SHA256-POSEIDON-V24</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
