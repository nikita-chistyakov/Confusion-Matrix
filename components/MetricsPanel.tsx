import React from 'react';
import { ConfusionValues, Metric } from '../types';
import { METRICS } from '../constants';

interface MetricsPanelProps {
  values: ConfusionValues;
  activeMetricId: string | null;
  onSelect: (id: string) => void;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ values, activeMetricId, onSelect }) => {
  return (
    <div className="flex flex-col gap-4">
      {METRICS.map((m) => {
        const isActive = activeMetricId === m.id;
        const den = m.den(values);
        const val = den === 0 ? '—' : (m.num(values) / den * 100).toFixed(1) + '%';
        
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`
              relative text-left group overflow-hidden rounded-xl border p-4 pl-5 transition-all duration-200
              ${isActive 
                ? 'bg-[#1f2330] border-[#ffffff33]' 
                : 'bg-[#181b24] border-[#2a2f3e] hover:border-[#444]'
              }
            `}
          >
            {/* Active Indicator Bar */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-200 ${isActive ? 'bg-emerald-400' : 'bg-[#8892a8]'}`}
            />

            <div className="font-bold text-[0.95rem] mb-0.5 text-[#e2e8f0]">{m.name}</div>
            <div className="font-mono-plex text-[0.78rem] text-[#8892a8] mb-1.5">{m.formula}</div>
            
            <div className="flex items-baseline gap-2.5">
              <div className="font-serif-display text-[1.6rem] text-emerald-400 leading-none">{val}</div>
              <div className="text-[0.82rem] text-[#8892a8] leading-[1.45]">
                {m.plain}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
