import React from 'react';
import { Shield, Satellite, FileText, Network, AlertTriangle, Layers, Waves, Ship, Activity } from 'lucide-react';
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

export const Navbar: React.FC<NavbarProps> = ({ selectedIncident, onSelectIncident, onOpenEvidence, onOpenArchitecture, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'map' as const, label: 'Situation Map', icon: Layers },
    { id: 'sar' as const, label: 'Satellite Intelligence', icon: Satellite },
    { id: 'drift' as const, label: 'Drift & Forecast', icon: Waves },
    { id: 'attribution' as const, label: 'AIS Attribution', icon: Ship },
  ];

  return (
    <header className="gdacs-header sticky top-0 z-50">
      <div className="px-4 lg:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/15 text-[10px]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-bold tracking-[0.18em] uppercase whitespace-nowrap">POSEIDON</span>
          <span className="hidden md:inline text-white/65">MARINE OIL-SPILL INTELLIGENCE & COORDINATION</span>
          <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 font-mono">SIH26143</span>
        </div>
        <div className="flex items-center gap-3 font-mono whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-emerald-100"><span className="gdacs-live-dot w-1.5 h-1.5 rounded-full bg-emerald-300"/> SYSTEM OPERATIONAL</span>
          <span className="hidden sm:inline text-white/65">UTC · {new Date().toISOString().slice(11,16)}</span>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-2.5 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 mr-auto min-w-[260px]">
          <div className="w-11 h-11 rounded-md bg-white/95 flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6 text-[#087f9f]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-[0.12em] text-white">POSEIDON</h1>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#075985] border border-white/20 text-white font-mono">DSS v3</span>
            </div>
            <p className="text-[10px] text-white/75">Global Marine Spill Awareness & Forensic Coordination</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-white/10 border border-white/20 px-2.5 py-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-200" />
          <span className="hidden lg:inline text-[10px] uppercase tracking-wider text-white/65">Active event</span>
          <select value={selectedIncident.id} onChange={(e) => { const inc = incidents.find(i => i.id === e.target.value); if (inc) onSelectIncident(inc); }} className="bg-transparent text-white text-xs font-semibold rounded outline-none max-w-[210px]">
            {incidents.map(inc => <option className="text-slate-900" key={inc.id} value={inc.id}>[{inc.id}] {inc.locationName}</option>)}
          </select>
        </div>

        <button onClick={onOpenArchitecture} className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold">
          <Network className="w-3.5 h-3.5" /> Architecture
        </button>
        <button onClick={onOpenEvidence} className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#d93025] hover:bg-[#bd261e] border border-red-200/30 text-white text-xs font-bold shadow-sm">
          <FileText className="w-3.5 h-3.5" /> Evidence Pack
        </button>
      </div>

      <nav className="px-4 lg:px-6 flex items-stretch gap-0 border-t border-white/10 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)} className={`gdacs-nav-tab flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap ${activeTab === id ? 'gdacs-nav-tab-active' : ''}`}>
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
        <div className="ml-auto hidden lg:flex items-center gap-2 px-4 text-[10px] font-mono text-white/70">
          <Activity className="w-3 h-3" /> SENTINEL-1 · CMEMS · ERA5 · AIS
        </div>
      </nav>
    </header>
  );
};
