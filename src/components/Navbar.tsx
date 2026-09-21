import React from 'react';
import { Shield, Satellite, Radio, FileText, Network, AlertTriangle, Layers } from 'lucide-react';
import { incidents } from '../data/incidents';
import { Incident } from '../types';

interface NavbarProps {
  selectedIncident: Incident;
  onSelectIncident: (incident: Incident) => void;
  onOpenEvidence: () => void;
  onOpenArchitecture: () => void;
  activeTab: 'map' | 'sar' | 'drift' | 'attribution';
  setActiveTab: (tab: 'map' | 'sar' | 'drift' | 'attribution') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedIncident,
  onSelectIncident,
  onOpenEvidence,
  onOpenArchitecture,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="glass-panel-heavy sticky top-0 z-50">
      {/* Top Banner */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between border-b border-navy-800/80 text-xs">
        <div className="flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-cyber-cyan border border-blue-500/30 font-mono font-semibold">
            SIH 2026 · PROBLEM STATEMENT SIH26143
          </span>
          <span className="text-slate-400 hidden sm:inline">
            NTRO · Indian Coast Guard · INCOIS Maritime Intelligence Platform
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SENTINEL-1A SAR: ONLINE (10m IW)</span>
          </div>
          <div className="text-slate-400 font-mono hidden md:inline">
            COPERNICUS CMEMS + ERA5 ACTIVE
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 p-0.5 flex items-center justify-center glow-cyan shadow-lg">
            <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyber-cyan" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyber-cyan bg-clip-text text-transparent font-mono">
                POSEIDON
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyber-cyan border border-cyan-800 font-mono uppercase">
                v2.4 DSS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Satellite Oil Slick Detection, Lagrangian Drift & AIS Attribution Engine
            </p>
          </div>
        </div>

        {/* Incident Selector */}
        <div className="flex items-center space-x-2 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-navy-700">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-400 font-mono uppercase">Active Incident:</span>
          <select
            value={selectedIncident.id}
            onChange={(e) => {
              const inc = incidents.find(i => i.id === e.target.value);
              if (inc) onSelectIncident(inc);
            }}
            className="bg-navy-800 text-xs font-mono text-white rounded px-2.5 py-1 border border-navy-600 focus:outline-none focus:border-cyber-cyan"
          >
            {incidents.map(inc => (
              <option key={inc.id} value={inc.id}>
                [{inc.id}] {inc.locationName}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center space-x-1 bg-navy-950/90 p-1 rounded-lg border border-navy-800 shadow-inner">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'map'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-navy-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Map Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('sar')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'sar'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-navy-800'
            }`}
          >
            <Satellite className="w-4 h-4" />
            <span>Satellite Data</span>
          </button>
          <button
            onClick={() => setActiveTab('attribution')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'attribution'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-navy-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Vessel Tracking</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenArchitecture}
            className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-600 text-xs font-medium flex items-center space-x-1.5 transition-colors"
            title="View full SIH Architecture Pipeline"
          >
            <Network className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="hidden sm:inline">Pipeline Architecture</span>
          </button>
          <button
            onClick={onOpenEvidence}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg glow-danger transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ICG Evidence Pack</span>
          </button>
        </div>
      </div>
    </header>
  );
};
