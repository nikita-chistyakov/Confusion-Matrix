import React, { useMemo } from 'react';
import { ConfusionValues, Metric } from '../types';

interface DotsVisualizerProps {
  values: ConfusionValues;
  activeMetric: Metric | null;
}

export const DotsVisualizer: React.FC<DotsVisualizerProps> = ({ values, activeMetric }) => {
  
  const dots = useMemo(() => {
    const total = values.tp + values.tn + values.fp + values.fn;
    // Cap visual dots to ~200 for performance and layout aesthetics if total is huge
    const scale = total > 200 ? 200 / total : 1;

    const types: (keyof ConfusionValues)[] = ['tp', 'fp', 'fn', 'tn'];
    const result: { type: keyof ConfusionValues; isDim: boolean }[] = [];

    types.forEach(type => {
      const count = Math.round(values[type] * scale);
      const isDim = activeMetric ? !activeMetric.dotHL(type) : false;
      for (let i = 0; i < count; i++) {
        result.push({ type, isDim });
      }
    });
    return result;
  }, [values, activeMetric]);

  const getColor = (type: keyof ConfusionValues) => {
    switch(type) {
      case 'tp': return 'bg-emerald-400';
      case 'tn': return 'bg-blue-400';
      case 'fp': return 'bg-orange-500';
      case 'fn': return 'bg-rose-500';
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-1 text-white">Every Prediction, Visualized</h2>
      <p className="text-[#8892a8] text-sm mb-4 font-light">Each dot is one sample. Highlighted dots are used by the selected metric.</p>
      
      <div className="bg-[#181b24] border border-[#2a2f3e] rounded-[14px] p-6 flex flex-wrap gap-[6px] content-start min-h-[80px]">
        {dots.map((d, i) => (
          <div
            key={i}
            className={`
              w-[18px] h-[18px] rounded-full transition-all duration-300
              ${getColor(d.type)}
              ${d.isDim ? 'opacity-15 scale-75 grayscale' : 'opacity-100 scale-100'}
            `}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 ml-1">
        {[
          { label: 'True Positive', color: 'bg-emerald-400' },
          { label: 'True Negative', color: 'bg-blue-400' },
          { label: 'False Positive', color: 'bg-orange-500' },
          { label: 'False Negative', color: 'bg-rose-500' },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-1.5 text-xs text-[#8892a8]">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};
