import React, { useState } from 'react';
import { incidents } from './data/incidents';
import { Incident, VesselCandidate } from './types';
import { Navbar } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { MapView } from './components/MapView';
import { SARInspection } from './components/SARInspection';
import { DriftEngine } from './components/DriftEngine';
import { Attribution } from './components/Attribution';
import { TimelineReplay } from './components/TimelineReplay';
import { EvidenceModal } from './components/EvidenceModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Landing } from './components/Landing';

export const App: React.FC = () => {
  const [isAppLaunched, setIsAppLaunched] = useState<boolean>(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident>(incidents[0]);
  const [selectedVessel, setSelectedVessel] = useState<VesselCandidate>(incidents[0].vessels[0]);
  const [activeTab, setActiveTab] = useState<'map' | 'sar' | 'drift' | 'attribution'>('map');
  const [showCounterfactual, setShowCounterfactual] = useState<boolean>(true);
  const [timeOffsetHours, setTimeOffsetHours] = useState<number>(0);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  // When switching incident, select top suspect by default
  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setSelectedVessel(incident.vessels[0]);
    setTimeOffsetHours(0);
  };

  if (!isAppLaunched) {
    return <Landing onLaunch={() => setIsAppLaunched(true)} />;
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col justify-between">
      {/* Top Navigation */}
      <div>
        <Navbar
          selectedIncident={selectedIncident}
          onSelectIncident={handleSelectIncident}
          onOpenEvidence={() => setIsEvidenceOpen(true)}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* High-Level Incident KPIs */}
        <MetricCards
          incident={selectedIncident}
          onSelectSuspect={() => {
            setSelectedVessel(selectedIncident.vessels[0]);
            setActiveTab('attribution');
          }}
        />

        {/* Main Content View Switcher */}
        <main className="p-4 max-w-[1600px] mx-auto w-full space-y-4">
          {activeTab === 'map' && (
            <div className="space-y-4">
              <MapView
                incident={selectedIncident}
                selectedVessel={selectedVessel}
                onSelectVessel={(v) => {
                  setSelectedVessel(v);
                  setShowCounterfactual(true);
                }}
                showCounterfactual={showCounterfactual}
                timeOffsetHours={timeOffsetHours}
              />
            </div>
          )}

          {activeTab === 'sar' && (
            <SARInspection incident={selectedIncident} />
          )}

          {activeTab === 'drift' && (
            <DriftEngine
              incident={selectedIncident}
              onRunSimulation={() => {
                setActiveTab('map');
              }}
            />
          )}

          {activeTab === 'attribution' && (
            <Attribution
              incident={selectedIncident}
              selectedVessel={selectedVessel}
              onSelectVessel={setSelectedVessel}
              showCounterfactual={showCounterfactual}
              setShowCounterfactual={setShowCounterfactual}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />
          )}

          {/* Always-accessible Bottom 4D Timeline Replay Control - Only shown on Map Overview to reduce clutter */}
          {activeTab === 'map' && (
            <div className="pt-2">
              <TimelineReplay
                incident={selectedIncident}
                timeOffsetHours={timeOffsetHours}
                setTimeOffsetHours={setTimeOffsetHours}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="px-6 py-3 glass-panel text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2 mt-4 z-10 relative">
        <div>
          POSEIDON Marine Intelligence Platform · Team Poseidon · Smart India Hackathon 2026 (Problem Statement SIH26143)
        </div>
        <div className="flex items-center space-x-3 text-slate-400">
          <span>Sentinel-1 SAR</span>
          <span>•</span>
          <span>OpenDrift Lagrangian RK2</span>
          <span>•</span>
          <span>AIS Spatiotemporal Attribution</span>
          <span>•</span>
          <span className="text-cyber-cyan font-bold">NTRO / ICG / INCOIS</span>
        </div>
      </footer>

      {/* Official Forensic Evidence Pack Modal */}
      <EvidenceModal
        incident={selectedIncident}
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
      />

      {/* Architecture & Pipeline Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
};

export default App;
