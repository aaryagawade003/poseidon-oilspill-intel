import React from 'react';
import { Shield, Satellite, Crosshair, Waves, Ship, Map, AlertTriangle, ArrowRight, LucideIcon } from 'lucide-react';

interface LandingProps { onLaunch: () => void; }

const featureCards: Array<{ icon: LucideIcon; title: string; desc: string; border: string }> = [
  { icon: Satellite, title: 'Satellite Intelligence', desc: 'Sentinel-1 SAR features, slick segmentation, look-alike rejection', border: '#0b829e' },
  { icon: Waves, title: 'Ocean Dynamics', desc: 'Backward particle hindcast and forward uncertainty envelopes', border: '#1769aa' },
  { icon: Ship, title: 'Vessel Intelligence', desc: 'AIS funnel, behavioural anomalies and candidate scoring', border: '#ef8b22' },
  { icon: Map, title: 'Impact Coordination', desc: 'Forecast shoreline risk, evidence layers and response zones', border: '#4caf50' },
];

export const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen gdacs-app flex flex-col overflow-auto">
      <header className="gdacs-header">
        <div className="max-w-[1500px] mx-auto w-full px-5 lg:px-10 py-2 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-3"><span className="font-bold tracking-[0.2em]">POSEIDON</span><span className="text-white/65">Global Marine Spill Awareness & Forensic Coordination</span></div>
          <span className="font-mono text-white/70">SIH 2026 · SIH26143</span>
        </div>
        <div className="border-t border-white/15 bg-black/5">
          <div className="max-w-[1500px] mx-auto px-5 lg:px-10 flex gap-0"><span className="px-4 py-2 text-xs font-semibold border-b-2 border-white">HOME</span><span className="px-4 py-2 text-xs text-white/75">INCIDENTS</span><span className="px-4 py-2 text-xs text-white/75">MAPS & SATELLITE</span><span className="px-4 py-2 text-xs text-white/75">VESSEL INTELLIGENCE</span><span className="px-4 py-2 text-xs text-white/75">FORECASTS</span></div>
        </div>
      </header>

      <main className="flex-1 max-w-[1500px] mx-auto w-full px-5 lg:px-10 py-7">
        <div className="gdacs-news-ribbon rounded-md px-4 py-2 flex items-center gap-3 text-xs mb-5"><span className="font-bold uppercase tracking-wider">LATEST SYSTEM</span><span>Multi-source marine incident coordination · Sentinel-1 · Ocean forcing · AIS · Counterfactual attribution</span></div>

        <section className="gdacs-hero p-7 lg:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 radar-grid"/>
          <div className="relative grid lg:grid-cols-[1.35fr_.65fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-50 mb-4"><span className="gdacs-live-dot w-2 h-2 rounded-full bg-emerald-300"/> OPERATIONAL MARITIME INTELLIGENCE PLATFORM</div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]">POSEIDON</h1>
              <p className="mt-4 text-base lg:text-lg text-white/85 max-w-2xl leading-7">A decision-support system for detecting marine oil slicks, reconstructing their probable origin, forecasting drift and producing explainable AIS-based vessel correlations.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={onLaunch} className="group inline-flex items-center gap-3 px-5 py-3 rounded-md bg-white text-[#075985] font-bold text-sm shadow-lg hover:bg-cyan-50 transition"><Crosshair className="w-4 h-4"/> OPEN INVESTIGATION CONSOLE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition"/></button>
                <div className="px-4 py-3 rounded-md border border-white/20 bg-white/10 text-xs text-white/85 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-200"/> Human-in-the-loop evidence review</div>
              </div>
            </div>
            <div className="hidden lg:block rounded-lg bg-[#082c3b]/65 border border-white/20 p-5 backdrop-blur-sm">
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Mission chain</div>
              <div className="mt-4 space-y-2">{[['01','DETECT','SAR anomaly'],['02','CHARACTERISE','slick geometry'],['03','HINDCAST','origin corridor'],['04','FILTER','AIS traffic'],['05','REPLAY','counterfactual release'],['06','DOSSIER','evidence trail']].map(([n,t,d])=><div key={n} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0"><span className="text-[9px] font-mono text-cyan-200 w-5">{n}</span><span className="text-[10px] font-bold w-24">{t}</span><span className="text-[10px] text-white/65">{d}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {featureCards.map(({ icon: Icon, title, desc, border }) => <div key={title} className="gdacs-panel p-5 border-t-4" style={{ borderTopColor: border }}><Icon className="w-7 h-7 text-slate-600 mb-4"/><h3 className="text-sm font-extrabold text-slate-800">{title}</h3><p className="text-xs text-slate-500 leading-5 mt-2">{desc}</p></div>)}
        </section>

        <section className="mt-6 gdacs-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4"><div><div className="gdacs-section-title">Operational model</div><h2 className="text-lg font-extrabold text-slate-800 mt-1">From observation to explainable forensic hypothesis</h2></div><span className="gdacs-alert-blue px-2.5 py-1 rounded text-[10px] font-bold border">MULTI-SOURCE</span></div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">{['SAR observation','Slick characterisation','Ocean / wind forcing','Probable origin','AIS correlation','Counterfactual validation'].map((x,i)=><div key={x} className="bg-slate-50 border border-slate-200 rounded-md p-3"><div className="text-[9px] font-mono text-cyan-700">0{i+1}</div><div className="text-xs font-bold text-slate-700 mt-2">{x}</div></div>)}</div>
        </section>
      </main>
      <footer className="max-w-[1500px] mx-auto w-full px-5 lg:px-10 py-4 text-[9px] text-slate-400 font-mono flex justify-between"><span>POSEIDON · SIH26143 · INDIAN MARITIME INTELLIGENCE CONCEPT</span><span>Demo data must be independently verified before operational use.</span></footer>
    </div>
  );
};
