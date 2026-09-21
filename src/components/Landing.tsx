import React from 'react';
import { Shield, Satellite, Radio, Crosshair } from 'lucide-react';

interface LandingProps {
  onLaunch: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="z-10 text-center max-w-4xl px-6 mt-10">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 p-0.5 glow-cyan shadow-2xl hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
              <Shield className="w-10 h-10 text-cyber-cyan" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-sans drop-shadow-lg">
          POSEIDON
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Geospatial Intelligence for Marine Oil Spill Detection, Lagrangian Drift Modeling, & Forensic AIS Attribution.
        </p>

        <button 
          onClick={onLaunch}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-blue-600/90 font-mono rounded-xl hover:bg-blue-500 glow-cyan hover:scale-105 border border-blue-400/50"
        >
          <span className="mr-3 tracking-widest text-sm">LAUNCH DSS PLATFORM</span>
          <Crosshair className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      <div className="z-10 mt-32 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-6 w-full">
        <div className="glass-panel p-8 rounded-2xl text-left border-t-2 border-t-cyan-500 hover:-translate-y-2 transition-transform duration-300">
          <Satellite className="w-8 h-8 text-cyan-400 mb-5" />
          <h3 className="text-lg font-bold text-slate-100 mb-3 font-mono">SAR Intelligence</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Automated U-Net++ slick detection pipeline utilizing Sentinel-1 dual-polarization imagery.</p>
        </div>
        <div className="glass-panel p-8 rounded-2xl text-left border-t-2 border-t-amber-500 hover:-translate-y-2 transition-transform duration-300">
          <Radio className="w-8 h-8 text-amber-400 mb-5" />
          <h3 className="text-lg font-bold text-slate-100 mb-3 font-mono">Lagrangian Drift</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Backward hindcasting and forward probabilistic forecasting of ocean pollutants via OpenDrift.</p>
        </div>
        <div className="glass-panel p-8 rounded-2xl text-left border-t-2 border-t-red-500 hover:-translate-y-2 transition-transform duration-300">
          <Shield className="w-8 h-8 text-red-400 mb-5" />
          <h3 className="text-lg font-bold text-slate-100 mb-3 font-mono">Vessel Attribution</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Bayesian correlation engine matching dark fleets and historical AIS traffic against drift geometries.</p>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-xs text-slate-600 font-mono">
        SIH 2026 · Problem Statement SIH26143 · Indian Coast Guard & NTRO
      </div>
    </div>
  );
};
