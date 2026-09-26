import React, { useState } from 'react';
import { incidents } from './data/incidents';
import { Incident, VesselCandidate } from './types';
import { Navbar } from './components/Navbar';
import { MapView } from './components/MapView';
import { SARInspection } from './components/SARInspection';
import { DriftEngine } from './components/DriftEngine';
import { Attribution } from './components/Attribution';
import { TimelineReplay } from './components/TimelineReplay';
import { EvidenceModal } from './components/EvidenceModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Landing } from './components/Landing';
import { Sidebar } from './components/Sidebar';
import { CommandCenter } from './components/CommandCenter';

export const App: React.FC = () => {
  const [isAppLaunched, setIsAppLaunched] = useState<boolean>(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident>(incidents[0]);
  const [selectedVessel, setSelectedVessel] = useState<VesselCandidate>(incidents[0].vessels[0]);
  const [activeTab, setActiveTab] = useState<'command' | 'map' | 'sar' | 'drift' | 'attribution'>('command');
  const [showCounterfactual, setShowCounterfactual] = useState<boolean>(true);
  const [timeOffsetHours, setTimeOffsetHours] = useState<number>(0);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setSelectedVessel(incident.vessels[0]);
    setTimeOffsetHours(0);
  };

  if (!isAppLaunched) return <Landing onLaunch={() => setIsAppLaunched(true)} />;

  const navbarTab = activeTab === 'command' ? 'map' : activeTab;
  const handleNavbarTab = (tab: 'map' | 'sar' | 'drift' | 'attribution') => setActiveTab(tab);

  return (
    <div className="gdacs-app h-screen flex flex-col overflow-hidden">
      <Navbar selectedIncident={selectedIncident} onSelectIncident={handleSelectIncident} onOpenEvidence={() => setIsEvidenceOpen(true)} onOpenArchitecture={() => setIsArchitectureOpen(true)} activeTab={navbarTab} setActiveTab={handleNavbarTab} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar incident={selectedIncident} selectedVessel={selectedVessel} onSelectVessel={(v) => { setSelectedVessel(v); setActiveTab('attribution'); }} onViewEvidence={() => setIsEvidenceOpen(true)} />
        <main className="flex-1 overflow-hidden flex flex-col min-w-0">
          {activeTab === 'command' && <div className="flex-1 overflow-auto p-4 lg:p-5"><CommandCenter incident={selectedIncident} onOpenEvidence={() => setIsEvidenceOpen(true)} onOpenArchitecture={() => setIsArchitectureOpen(true)} /></div>}
          {activeTab === 'map' && <div className="flex-1 flex flex-col overflow-hidden"><MapView incident={selectedIncident} selectedVessel={selectedVessel} onSelectVessel={(v) => { setSelectedVessel(v); setShowCounterfactual(true); }} showCounterfactual={showCounterfactual} timeOffsetHours={timeOffsetHours} /><div className="bg-white border-t border-slate-200 shadow-sm"><TimelineReplay incident={selectedIncident} timeOffsetHours={timeOffsetHours} setTimeOffsetHours={setTimeOffsetHours} /></div></div>}
          {activeTab === 'sar' && <div className="flex-1 overflow-auto p-4 lg:p-5"><SARInspection incident={selectedIncident} /></div>}
          {activeTab === 'drift' && <div className="flex-1 overflow-auto p-4 lg:p-5"><DriftEngine incident={selectedIncident} onRunSimulation={() => setActiveTab('map')} /></div>}
          {activeTab === 'attribution' && <div className="flex-1 overflow-auto p-4 lg:p-5"><Attribution incident={selectedIncident} selectedVessel={selectedVessel} onSelectVessel={setSelectedVessel} showCounterfactual={showCounterfactual} setShowCounterfactual={setShowCounterfactual} onOpenEvidence={() => setIsEvidenceOpen(true)} /></div>}
        </main>
      </div>
      <EvidenceModal incident={selectedIncident} isOpen={isEvidenceOpen} onClose={() => setIsEvidenceOpen(false)} />
      <ArchitectureModal isOpen={isArchitectureOpen} onClose={() => setIsArchitectureOpen(false)} />
    </div>
  );
};

export default App;
