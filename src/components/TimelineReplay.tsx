import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, Clock, History } from 'lucide-react';
import { Incident } from '../types';

interface TimelineReplayProps {
  incident: Incident;
  timeOffsetHours: number;
  setTimeOffsetHours: React.Dispatch<React.SetStateAction<number>>;
}

export const TimelineReplay: React.FC<TimelineReplayProps> = ({
  incident,
  timeOffsetHours,
  setTimeOffsetHours
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);

  // Playback loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeOffsetHours((prev) => {
          if (prev >= 24) {
            setIsPlaying(false);
            return -6;
          }
          return Math.round((prev + 0.5) * 10) / 10;
        });
      }, 600 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, setTimeOffsetHours]);

  const formatTimestamp = (offset: number) => {
    // 0 = 07:18 UTC (Satellite Pass)
    const baseHour = 7.3; // 07:18
    const currentHour = baseHour + offset;
    const h = ((Math.floor(currentHour) % 24) + 24) % 24;
    const m = Math.floor((Math.abs(currentHour) % 1) * 60);
    const hStr = h.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    
    if (offset < 0) {
      return `${hStr}:${mStr} UTC (t - ${Math.abs(offset)}h)`;
    } else if (offset === 0) {
      return `${hStr}:${mStr} UTC [SATELLITE PASS]`;
    } else {
      return `${hStr}:${mStr} UTC (t + ${offset}h FORECAST)`;
    }
  };

  return (
    <div className="bg-navy-900/90 backdrop-blur-md border border-navy-700/80 rounded-xl p-3 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setTimeOffsetHours(0);
            }}
            className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 transition-colors"
            title="Reset to Satellite Pass Time"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center space-x-1 bg-navy-950 px-1 py-0.5 rounded border border-navy-800">
            {[1, 2, 5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  speed === s ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5 text-slate-300 font-bold ml-2">
            <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="text-white">{formatTimestamp(timeOffsetHours)}</span>
          </div>
        </div>

        {/* Chronological Event Milestones */}
        <div className="flex items-center space-x-3 text-[11px] text-slate-400 hidden sm:flex">
          <span className={`flex items-center gap-1 ${timeOffsetHours < -3.5 ? 'text-cyber-cyan font-bold' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>01:00 Vessel Approach</span>
          </span>
          <span>→</span>
          <span className={`flex items-center gap-1 ${timeOffsetHours >= -4.5 && timeOffsetHours <= -2.5 ? 'text-amber-400 font-bold' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>03:40 Discharge Origin</span>
          </span>
          <span>→</span>
          <span className={`flex items-center gap-1 ${Math.abs(timeOffsetHours) < 1 ? 'text-emerald-400 font-bold' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>07:18 SAR Pass</span>
          </span>
          <span>→</span>
          <span className={`flex items-center gap-1 ${timeOffsetHours > 10 ? 'text-red-400 font-bold' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span>+24h Landfall Alert</span>
          </span>
        </div>
      </div>

      {/* Scrub Slider */}
      <div className="mt-2.5">
        <input
          type="range"
          min="-6"
          max="24"
          step="0.5"
          value={timeOffsetHours}
          onChange={(e) => setTimeOffsetHours(Number(e.target.value))}
          className="w-full accent-cyber-cyan h-1.5 bg-navy-950 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
          <span>t - 6h (Historical Transit)</span>
          <span className="text-amber-400 font-bold">t - 3.8h (Origin Event)</span>
          <span className="text-cyber-cyan font-bold">t0 (Satellite Observation)</span>
          <span>t + 12h (Dispersion)</span>
          <span className="text-red-400 font-bold">t + 24h (Impact Zone)</span>
        </div>
      </div>
    </div>
  );
};
