import React, { useState } from 'react';
import { ConfusionValues } from './types';
import { SCENARIOS, METRICS } from './constants';
import { CustomPanel } from './components/CustomPanel';
import { ConfusionMatrix } from './components/ConfusionMatrix';
import { MetricsPanel } from './components/MetricsPanel';
import { DotsVisualizer } from './components/DotsVisualizer';
import { Pencil } from 'lucide-react';

export default function App() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('balanced');
  const [customValues, setCustomValues] = useState<ConfusionValues>({ tp: 40, fp: 10, fn: 10, tn: 40 });
  const [activeMetricId, setActiveMetricId] = useState<string | null>(null);

  // Derive current values based on scenario
  const currentValues: ConfusionValues = activeScenarioId === 'custom' 
    ? customValues 
    : SCENARIOS[activeScenarioId];

  const activeMetric = activeMetricId ? METRICS.find(m => m.id === activeMetricId) || null : null;

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    if (id === 'custom') {
       // When switching to custom, populate it with current static values if needed, 
       // but here we keep custom independent or pre-filled.
       // Let's reset custom to balanced start if it was empty, 
       // or just keep previous custom state. Keeping state is better UX.
    }
  };

  const handleCustomChange = (key: keyof ConfusionValues, val: number) => {
    setCustomValues(prev => ({ ...prev, [key]: val }));
  };

  const handleMetricSelect = (id: string) => {
    setActiveMetricId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e2e8f0] pb-16">
      <div className="max-w-[960px] mx-auto px-6 py-10">
        
        {/* Header */}
        <h1 className="text-4xl text-white mb-1 tracking-tight">Interactive Classification Metrics Table</h1>
        <p className="text-[#8892a8] text-[1.05rem] font-light mb-10">
          Click a scenario, then click any metric to see which cells it uses.
        </p>

        {/* Scenario Selector */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {Object.values(SCENARIOS).map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s.id)}
              className={`
                px-4 py-2 rounded-lg text-sm transition-all border
                ${activeScenarioId === s.id 
                  ? 'bg-[#1f2330] border-emerald-400/50 text-white shadow-[0_0_12px_rgba(52,211,153,0.15)]' 
                  : 'bg-[#181b24] border-[#2a2f3e] text-[#8892a8] hover:border-[#555] hover:text-[#e2e8f0]'
                }
              `}
            >
              {s.name} {s.id === 'custom' && <Pencil className="inline w-3 h-3 ml-1 mb-0.5"/>}
            </button>
          ))}
        </div>

        {/* Custom Sliders (Conditional) */}
        {activeScenarioId === 'custom' && (
          <CustomPanel values={customValues} onChange={handleCustomChange} />
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left: Matrix */}
          <ConfusionMatrix values={currentValues} activeMetric={activeMetric} />

          {/* Right: Metrics List */}
          <MetricsPanel 
            values={currentValues} 
            activeMetricId={activeMetricId} 
            onSelect={handleMetricSelect} 
          />
          
        </div>

        {/* Insight Box */}
        <div className="mt-8 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border border-[#2a2f3e] rounded-xl p-6 text-[0.92rem] leading-relaxed text-[#e2e8f0]">
          {activeMetric 
            ? activeMetric.insight(currentValues)
            : "Click a metric above to see how it's calculated and when it matters."
          }
        </div>

        {/* Dots Visualization */}
        <DotsVisualizer values={currentValues} activeMetric={activeMetric} />

      </div>
    </div>
  );
}
