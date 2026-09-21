import React from 'react';
import { Incident } from '../types';
import { Crosshair, Wind, Waves, Clock, AlertOctagon, Cpu, Compass } from 'lucide-react';

interface MetricCardsProps {
  incident: Incident;
  onSelectSuspect: () => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ incident, onSelectSuspect }) => {
  const topSuspect = incident.vessels[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 glass-panel border-b-0 mb-4 z-10 relative max-w-6xl mx-auto w-full">
      {/* 1. Slick Extent - Simplified */}
      <div className="glass-panel rounded-xl p-4 relative overflow-hidden group hover:border-cyber-blue/50 transition-all hover:scale-[1.02]">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="flex items-center space-x-2">
            <Waves className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-sm uppercase tracking-wide">Confirmed Slick</span>
          </span>
        </div>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
            {incident.areaKm2}
          </span>
          <span className="text-sm text-slate-400 font-mono">sq km</span>
        </div>
      </div>

      {/* 2. Release Window - Simplified */}
      <div className="glass-panel rounded-xl p-4 relative overflow-hidden group hover:border-amber-400/50 transition-all hover:scale-[1.02]">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm uppercase tracking-wide">Est. Release Window</span>
          </span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-2xl font-bold text-amber-300 font-mono tracking-tight">
            {incident.releaseTimeWindow}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Approx. {incident.estimatedAgeHours} hours ago
          </span>
        </div>
      </div>

      {/* 3. Top Suspect - Simplified */}
      <div 
        onClick={onSelectSuspect}
        className="glass-panel border-red-500/40 rounded-xl p-4 relative overflow-hidden group hover:border-red-400 cursor-pointer transition-all hover:scale-[1.02] md:col-span-1 sm:col-span-2 lg:col-span-1"
      >
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="font-bold text-sm text-red-400 uppercase tracking-wide">Prime Suspect</span>
          </span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-2xl font-bold text-white font-mono truncate">
            {topSuspect.name}
          </span>
          <span className="text-sm text-red-300 mt-1 flex justify-between items-center">
            <span>Risk Score: {topSuspect.attributionScore}/100</span>
            <span className="text-xs underline opacity-70 group-hover:opacity-100">Review &rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
};
