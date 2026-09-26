import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, Database, Satellite, Waves } from 'lucide-react';
import { checkBackend } from '../api';

export const LiveApiStatus: React.FC = () => {
  const [backend, setBackend] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    let mounted = true;
    const probe = async () => {
      const ok = await checkBackend();
      if (mounted) setBackend(ok ? 'online' : 'offline');
    };
    probe();
    const interval = window.setInterval(probe, 10000);
    return () => { mounted = false; window.clearInterval(interval); };
  }, []);

  const mode = backend === 'online' ? 'BACKEND CONNECTED' : backend === 'offline' ? 'OFFLINE-SAFE DEMO' : 'CHECKING ENGINE';
  const dot = backend === 'online' ? 'bg-emerald-500' : backend === 'offline' ? 'bg-amber-500' : 'bg-slate-400';

  return (
    <div className="absolute bottom-4 right-4 z-[1000] w-80 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-panel overflow-hidden transition-all print:hidden">
      <div className="flex items-center justify-between p-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dot}`} />
          <span className="text-xs font-ibm font-bold text-slate-700">{mode}</span>
        </div>
        <Activity className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div className="p-3 space-y-2 bg-slate-900 text-[10px] font-mono text-slate-300">
        <div className="flex items-center gap-2"><Satellite className="w-3.5 h-3.5 text-cyan-400" /> Sentinel-1 SAR: observation contract ready</div>
        <div className="flex items-center gap-2"><Waves className="w-3.5 h-3.5 text-blue-400" /> CMEMS / ERA5: forcing adapter boundary</div>
        <div className="flex items-center gap-2"><Database className="w-3.5 h-3.5 text-violet-400" /> AIS: historical/synthetic evidence layer</div>
        <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Counterfactual replay: enabled</div>
      </div>
    </div>
  );
};
