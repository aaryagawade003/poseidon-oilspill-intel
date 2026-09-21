import React from 'react';
import { Network, X, Database, Cpu, Radio, Shield, Waves, Satellite, CheckCircle } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-navy-900 border border-navy-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-navy-950 px-6 py-3 border-b border-navy-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-cyber-cyan font-bold">
            <Network className="w-4 h-4" />
            <span>POSEIDON SYSTEM ARCHITECTURE & SCIENTIFIC WORKFLOW</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs font-mono">
          {/* Executive Overview */}
          <div className="bg-navy-950 p-4 rounded-xl border border-navy-800">
            <h3 className="text-sm font-bold text-white mb-1">
              End-to-End Decision Support Architecture (SIH26143)
            </h3>
            <p className="text-slate-400 font-sans text-xs">
              Unlike classical oil-spill tools that stop at image detection, POSEIDON bridges space observation, fluid dynamics, and maritime telemetry into a verifiable inverse-modeling framework:
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-cyber-cyan font-bold">
              <span>SATELLITE SAR</span>
              <span>→</span>
              <span>U-NET SEGMENTATION</span>
              <span>→</span>
              <span>HINDCAST BACKTRACK</span>
              <span>→</span>
              <span>AIS SPATIOTEMPORAL FUNNEL</span>
              <span>→</span>
              <span>COUNTERFACTUAL FORWARD DRIFT</span>
              <span>→</span>
              <span>ICG EVIDENCE DOSSIER</span>
            </div>
          </div>

          {/* Architecture Pipeline Stages */}
          <div className="space-y-3">
            {/* Stage 1 */}
            <div className="p-3 rounded-lg bg-navy-950 border border-blue-500/30">
              <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Satellite className="w-4 h-4" />
                  <span>01 · MULTI-MODAL SENSOR INGESTION</span>
                </span>
                <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded border border-blue-800">RAW STREAMS</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">
                Ingests dual-pol Sentinel-1 SAR (VV+VH C-band) and optical Sentinel-2 imagery; pulls real-time and historical AIS records via MarineCadastre/Coastal Radars; fetches Copernicus CMEMS surface currents and ECMWF ERA5 10m wind fields.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-3 rounded-lg bg-navy-950 border border-cyan-500/30">
              <div className="flex items-center justify-between text-cyber-cyan font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>02 · SAR SEGMENTATION & LOOK-ALIKE FILTER</span>
                </span>
                <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">DEEP LEARNING</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">
                Applies radiometric calibration, speckle filtering, and land masking. A dual-attention U-Net++ outputs pixel-level slick probability masks. A second-stage classifier utilizes GLCM texture entropy and ERA5 wind thresholds to reject low-wind calm areas, biogenic slicks, and normal ship wakes.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-3 rounded-lg bg-navy-950 border border-amber-500/30">
              <div className="flex items-center justify-between text-amber-400 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-4 h-4" />
                  <span>03 · STOCHASTIC LAGRANGIAN HINDCASTING</span>
                </span>
                <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded border border-amber-800">OCEAN PHYSICS</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">
                Integrates the advection-diffusion differential equation backwards in time using a 2nd-order Runge-Kutta solver over a 1,000-particle ensemble. Computes the probable origin polygon corridor and most likely discharge time window (±35 min).
              </p>
            </div>

            {/* Stage 4 */}
            <div className="p-3 rounded-lg bg-navy-950 border border-purple-500/30">
              <div className="flex items-center justify-between text-purple-400 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  <span>04 · COUNTERFACTUAL VESSEL ATTRIBUTION</span>
                </span>
                <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded border border-purple-800">INVERSE MODEL</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">
                Filters vessels traversing the origin corridor. For each candidate ship, the system forward-simulates a hypothetical discharge at time t_r. Candidate plumes are matched against the observed satellite slick using IoU overlap and Hausdorff metrics. A Bayesian scoring formula fuses spatial proximity, temporal fit, track alignment, speed anomalies, and AIS gaps.
              </p>
            </div>

            {/* Stage 5 */}
            <div className="p-3 rounded-lg bg-navy-950 border border-red-500/30">
              <div className="flex items-center justify-between text-red-400 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-4 h-4" />
                  <span>05 · FORWARD FORECAST & IMPACT DECISION SUPPORT</span>
                </span>
                <span className="text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-800">RESPONSE OPS</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">
                Projects +6h to +48h trajectory evolution towards coastlines, identifying threatened Marine Protected Areas (MPAs) and industrial intakes, generating actionable containment recommendations and official Indian Coast Guard evidence dossiers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
