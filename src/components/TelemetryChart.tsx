import React from 'react';
import { VesselCandidate } from '../types';
import { Activity, AlertTriangle } from 'lucide-react';

interface TelemetryChartProps {
  vessel: VesselCandidate;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({ vessel }) => {
  const data = vessel.speedAnomalyProfile;
  if (!data || data.length === 0) return null;

  const maxSpeed = 16;
  const chartHeight = 140;
  const chartWidth = 440;
  const padding = 30;

  const getX = (index: number) => {
    return padding + (index / (data.length - 1)) * (chartWidth - padding * 2);
  };

  const getY = (speed: number) => {
    return chartHeight - padding - (speed / maxSpeed) * (chartHeight - padding * 2);
  };

  // SVG points for speed line
  const points = data.map((d, i) => `${getX(i)},${getY(d.speed)}`).join(' ');
  const baselinePoints = data.map((d, i) => `${getX(i)},${getY(d.normalSpeed)}`).join(' ');

  return (
    <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800">
      <div className="flex items-center justify-between mb-2 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-slate-200 font-bold">
          <Activity className="w-4 h-4 text-cyber-cyan" />
          <span>SOG SPEED TELEMETRY & BEHAVIORAL ANOMALY</span>
        </span>
        <span className="text-[11px] text-red-400 font-bold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>43-MIN SPEED DROP (-59%)</span>
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none">
          {/* Grid lines */}
          <line x1={padding} y1={getY(0)} x2={chartWidth - padding} y2={getY(0)} stroke="#1c2541" strokeWidth="1" />
          <line x1={padding} y1={getY(5)} x2={chartWidth - padding} y2={getY(5)} stroke="#1c2541" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={padding} y1={getY(10)} x2={chartWidth - padding} y2={getY(10)} stroke="#1c2541" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={padding} y1={getY(15)} x2={chartWidth - padding} y2={getY(15)} stroke="#1c2541" strokeWidth="1" strokeDasharray="2 2" />

          {/* Y Axis Labels */}
          <text x={padding - 8} y={getY(0) + 4} fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">0k</text>
          <text x={padding - 8} y={getY(5) + 4} fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">5k</text>
          <text x={padding - 8} y={getY(10) + 4} fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">10k</text>
          <text x={padding - 8} y={getY(15) + 4} fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">15k</text>

          {/* Anomaly highlight zone */}
          <rect
            x={getX(3)}
            y={getY(maxSpeed)}
            width={getX(6) - getX(3)}
            height={getY(0) - getY(maxSpeed)}
            fill="#ef4444"
            fillOpacity="0.12"
          />
          <text
            x={(getX(3) + getX(6)) / 2}
            y={getY(14)}
            fill="#ef4444"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            DISCHARGE / BILGE DUMP WINDOW
          </text>

          {/* Normal Transit Speed Baseline */}
          <polyline
            points={baselinePoints}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Actual Speed line */}
          <polyline
            points={points}
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
          />

          {/* Data dots */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(d.speed)}
                r={d.isSpillWindow ? 4 : 2.5}
                fill={d.isSpillWindow ? '#ef4444' : '#00f0ff'}
                stroke="#060a14"
                strokeWidth="1.5"
              />
              <text
                x={getX(i)}
                y={chartHeight - 10}
                fill="#94a3b8"
                fontSize="8"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {d.time}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span>Actual SOG Recorded</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-slate-500"></span>
          <span>Baseline Route Speed</span>
        </span>
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span>Anomaly Deviation</span>
        </span>
      </div>
    </div>
  );
};
