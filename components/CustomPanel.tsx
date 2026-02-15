import React from 'react';
import { ConfusionValues } from '../types';

interface CustomPanelProps {
  values: ConfusionValues;
  onChange: (key: keyof ConfusionValues, val: number) => void;
}

export const CustomPanel: React.FC<CustomPanelProps> = ({ values, onChange }) => {
  const sliders: { key: keyof ConfusionValues; label: string }[] = [
    { key: 'tp', label: 'TP' },
    { key: 'fp', label: 'FP' },
    { key: 'fn', label: 'FN' },
    { key: 'tn', label: 'TN' },
  ];

  return (
    <div className="mb-6 bg-[#181b24] border border-[#2a2f3e] rounded-xl p-5 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {sliders.map(({ key, label }) => (
          <label key={key} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm text-[#8892a8] font-bold">
              <span>{label}</span>
              <span className="text-[#e2e8f0] font-mono-plex">{values[key]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={values[key]}
              onChange={(e) => onChange(key, parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#2a2f3e] rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
            />
          </label>
        ))}
      </div>
    </div>
  );
};
