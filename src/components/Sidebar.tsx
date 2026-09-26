import React, { useState } from 'react';
import { Waves, Clock, AlertTriangle, ChevronDown, ChevronUp, Ship, MapPinned, FileCheck2 } from 'lucide-react';
import { Incident, VesselCandidate } from '../types';

interface SidebarProps { incident: Incident; selectedVessel: VesselCandidate | null; onSelectVessel: (vessel: VesselCandidate) => void; onViewEvidence: () => void; }

const riskBadgeClass = (risk: string) => {
  if (risk === 'High') return 'gdacs-alert-red border';
  if (risk === 'Medium') return 'gdacs-alert-orange border';
  if (risk === 'Cleared') return 'gdacs-alert-green border';
  if (risk === 'Dark Contact') return 'bg-purple-50 text-purple-700 border-purple-200 border';
  return 'bg-slate-50 text-slate-600 border-slate-200 border';
};
const riskDotClass = (risk: string) => risk === 'High' ? 'bg-red-600' : risk === 'Medium' ? 'bg-orange-500' : risk === 'Cleared' ? 'bg-green-500' : risk === 'Dark Contact' ? 'bg-purple-500' : 'bg-slate-400';

export const Sidebar: React.FC<SidebarProps> = ({ incident, selectedVessel, onSelectVessel, onViewEvidence }) => {
  const [expanded, setExpanded] = useState(true);
  const candidates = incident.vessels.filter(v => v.riskCategory !== 'Cleared');
  return (
    <aside className="gdacs-sidebar w-72 flex-shrink-0 flex flex-col overflow-hidden sidebar-scroll">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-2">
          <span className="gdacs-section-title">Active incident</span>
          <span className="gdacs-alert-orange px-2 py-0.5 rounded text-[9px] font-bold border">ORANGE / INVESTIGATION</span>
        </div>
        <div className="text-xl font-extrabold text-slate-800 mt-2">{incident.id}</div>
        <div className="text-sm font-semibold text-slate-600 mt-0.5">{incident.locationName}</div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">ACQUIRED · {incident.satelliteAcquisitionTime}</div>
      </div>

      <div className="p-4 border-b border-slate-200 space-y-3">
        <div className="gdacs-section-title">Event summary</div>
        <div className="gdacs-kpi p-3"><div className="flex items-center justify-between"><span className="gdacs-caption flex items-center gap-1.5"><Waves className="w-3.5 h-3.5 text-cyan-700"/> Slick extent</span><strong className="text-slate-800">{incident.areaKm2} km²</strong></div></div>
        <div className="flex items-center justify-between"><span className="gdacs-caption flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-orange-500"/> Release window</span><span className="gdacs-data text-[10px] font-semibold">{incident.releaseTimeWindow}</span></div>
        <div className="flex items-center justify-between"><span className="gdacs-caption flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-red-600"/> Detection confidence</span><span className="gdacs-data text-[10px] font-semibold text-green-700">{(incident.confidence*100).toFixed(1)}%</span></div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#0b829e] to-[#4caf50]" style={{ width:`${incident.confidence*100}%` }}/></div>
      </div>

      <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2"><Ship className="w-4 h-4 text-cyan-700"/><span className="gdacs-section-title">AIS candidate funnel</span><span className="gdacs-alert-red w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border">{candidates.length}</span></div>
        <button onClick={() => setExpanded(!expanded)} aria-label="Toggle AIS candidates">{expanded ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}</button>
      </div>

      {expanded && <div className="flex-1 overflow-y-auto sidebar-scroll divide-y divide-slate-100">
        {incident.vessels.map(v => {
          const selected = selectedVessel?.id === v.id;
          return <button key={v.id} onClick={() => onSelectVessel(v)} className={`w-full text-left p-3.5 transition-all border-l-4 ${selected ? 'bg-cyan-50 border-l-cyan-600' : 'bg-white border-l-transparent hover:bg-slate-50'}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0"><div className={`w-2 h-2 rounded-full shrink-0 ${riskDotClass(v.riskCategory)}`}/><span className="font-bold text-slate-700 text-sm truncate">{v.name}</span></div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${riskBadgeClass(v.riskCategory)}`}>{v.attributionScore}</span>
            </div>
            <div className="ml-4 mt-1.5 flex items-center justify-between"><span className="text-[10px] text-slate-500">{v.type.split(' ').slice(0,2).join(' ')}</span><span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${riskBadgeClass(v.riskCategory)}`}>{v.riskCategory}</span></div>
            <div className="ml-4 mt-2 h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#0b829e] rounded-full" style={{ width:`${v.attributionScore}%` }}/></div>
          </button>;
        })}
      </div>}

      <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
        <button onClick={onViewEvidence} className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#d93025] hover:bg-[#bd261e] text-white text-xs font-bold rounded-md shadow-sm"><FileCheck2 className="w-4 h-4"/> Export investigation dossier</button>
        <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-slate-400"><MapPinned className="w-3 h-3"/> HUMAN-IN-THE-LOOP · SIH26143</div>
      </div>
    </aside>
  );
};
