import React from 'react';
import { ConfusionValues, Metric } from '../types';

interface ConfusionMatrixProps {
  values: ConfusionValues;
  activeMetric: Metric | null;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ values, activeMetric }) => {
  const getCellClass = (type: keyof ConfusionValues) => {
    const base = "relative flex flex-col justify-center items-center p-4 min-h-[100px] rounded-xl border transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) cursor-default select-none";
    
    let colorClass = "";
    switch (type) {
      case 'tp': colorClass = "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"; break;
      case 'tn': colorClass = "bg-blue-400/10 border-blue-400/25 text-blue-400"; break;
      case 'fp': colorClass = "bg-orange-500/10 border-orange-500/25 text-orange-500"; break;
      case 'fn': colorClass = "bg-rose-500/10 border-rose-500/25 text-rose-500"; break;
    }

    let stateClass = "";
    if (activeMetric) {
      if (activeMetric.highlight.includes(type)) {
        stateClass = "scale-[1.05] z-10 shadow-[0_0_24px_rgba(255,255,255,0.06)]";
      } else if (activeMetric.dim.includes(type)) {
        stateClass = "opacity-25 scale-[0.97] blur-[1px]";
      }
    }

    return `${base} ${colorClass} ${stateClass}`;
  };

  const labels = {
    tp: 'Correctly caught',
    fn: 'Missed',
    fp: 'False alarm',
    tn: 'Correctly ignored'
  };

  return (
    <div className="relative">
      <div className="text-center font-semibold text-[0.82rem] uppercase tracking-[0.12em] text-[#8892a8] mb-2.5">
        Predicted
      </div>
      
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap font-semibold text-[0.82rem] uppercase tracking-[0.12em] text-[#8892a8]">
        Actual
      </div>

      <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-1 ml-8">
        {/* Header Row */}
        <div className="w-0 h-0"></div> {/* Corner */}
        <div className="flex items-center justify-center p-2 font-mono-plex text-xs font-semibold text-[#8892a8]">Positive</div>
        <div className="flex items-center justify-center p-2 font-mono-plex text-xs font-semibold text-[#8892a8]">Negative</div>

        {/* Row 1: Actual Positive */}
        <div className="flex items-center justify-center p-2 font-mono-plex text-xs font-semibold text-[#8892a8]">Positive</div>
        
        {/* Cells */}
        <div className={getCellClass('tp')}>
          <div className="font-mono-plex text-[0.72rem] font-semibold tracking-widest uppercase mb-1 opacity-90">TP</div>
          <div className="font-serif-display text-[2.2rem] leading-none">{values.tp}</div>
          <div className="text-[0.72rem] mt-1 opacity-80">{labels.tp}</div>
        </div>
        
        <div className={getCellClass('fn')}>
          <div className="font-mono-plex text-[0.72rem] font-semibold tracking-widest uppercase mb-1 opacity-90">FN</div>
          <div className="font-serif-display text-[2.2rem] leading-none">{values.fn}</div>
          <div className="text-[0.72rem] mt-1 opacity-80">{labels.fn}</div>
        </div>

        {/* Row 2: Actual Negative */}
        <div className="flex items-center justify-center p-2 font-mono-plex text-xs font-semibold text-[#8892a8]">Negative</div>
        
        <div className={getCellClass('fp')}>
          <div className="font-mono-plex text-[0.72rem] font-semibold tracking-widest uppercase mb-1 opacity-90">FP</div>
          <div className="font-serif-display text-[2.2rem] leading-none">{values.fp}</div>
          <div className="text-[0.72rem] mt-1 opacity-80">{labels.fp}</div>
        </div>

        <div className={getCellClass('tn')}>
          <div className="font-mono-plex text-[0.72rem] font-semibold tracking-widest uppercase mb-1 opacity-90">TN</div>
          <div className="font-serif-display text-[2.2rem] leading-none">{values.tn}</div>
          <div className="text-[0.72rem] mt-1 opacity-80">{labels.tn}</div>
        </div>
      </div>
    </div>
  );
};
