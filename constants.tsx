import React from 'react';
import { ConfusionValues, Metric, Scenario } from './types';

export const SCENARIOS: Record<string, Scenario> = {
  balanced: { id: 'balanced', tp: 40, fp: 10, fn: 10, tn: 40, name: 'Balanced dataset (50/50)' },
  spam: { id: 'spam', tp: 4, fp: 3, fn: 1, tn: 92, name: 'Spam filter (5% spam)' },
  disease: { id: 'disease', tp: 1, fp: 5, fn: 1, tn: 93, name: 'Disease screening (2% positive)' },
  custom: { id: 'custom', tp: 40, fp: 10, fn: 10, tn: 40, name: 'Custom' },
};

const Tag = ({ type, children }: { type: string; children?: React.ReactNode }) => {
  const colors: Record<string, string> = {
    tp: 'bg-emerald-500/10 text-emerald-400',
    fp: 'bg-orange-500/10 text-orange-500',
    fn: 'bg-rose-500/10 text-rose-500',
    tn: 'bg-blue-400/10 text-blue-400',
  };
  return (
    <span className={`inline-block font-mono-plex text-xs font-semibold tracking-wider px-2 py-0.5 rounded mr-1.5 align-middle ${colors[type] || ''}`}>
      {children}
    </span>
  );
};

export const METRICS: Metric[] = [
  {
    id: 'accuracy',
    name: 'Accuracy',
    cells: ['tp', 'tn', 'fp', 'fn'],
    num: (d) => d.tp + d.tn,
    den: (d) => d.tp + d.tn + d.fp + d.fn,
    formula: '(TP + TN) / All',
    plain: <span>Of <strong>everything</strong>, how many did I get right?</span>,
    insight: (d) => {
      const total = d.tp + d.tn + d.fp + d.fn;
      const acc = total === 0 ? '0' : ((d.tp + d.tn) / total * 100).toFixed(1);
      return (
        <>
          <Tag type="tp">TP</Tag><Tag type="tn">TN</Tag> Accuracy = <strong>{acc}%</strong>. It looks at the full picture — but can be <strong>misleading with imbalanced classes</strong>. In the spam scenario, always guessing "not spam" yields 95% accuracy but catches zero spam.
        </>
      );
    },
    highlight: ['tp', 'tn'],
    dim: ['fp', 'fn'],
    dotHL: (t) => t === 'tp' || t === 'tn',
  },
  {
    id: 'recall',
    name: 'Recall (Sensitivity)',
    cells: ['tp', 'fn'],
    num: (d) => d.tp,
    den: (d) => d.tp + d.fn,
    formula: 'TP / (TP + FN)',
    plain: <span>Of all <strong>actual positives</strong>, how many did I catch?</span>,
    insight: (d) => {
      const den = d.tp + d.fn;
      const r = den === 0 ? '0' : ((d.tp / den) * 100).toFixed(1);
      return (
        <>
          <Tag type="tp">TP</Tag><Tag type="fn">FN</Tag> Recall = <strong>{r}%</strong>. The denominator is the <strong>actual positive row</strong>. Critical when <strong>missing a positive is costly</strong> — like disease screening or fraud detection.
        </>
      );
    },
    highlight: ['tp', 'fn'],
    dim: ['fp', 'tn'],
    dotHL: (t) => t === 'tp' || t === 'fn',
  },
  {
    id: 'precision',
    name: 'Precision',
    cells: ['tp', 'fp'],
    num: (d) => d.tp,
    den: (d) => d.tp + d.fp,
    formula: 'TP / (TP + FP)',
    plain: <span>Of all <strong>predicted positives</strong>, how many were right?</span>,
    insight: (d) => {
      const den = d.tp + d.fp;
      const p = den === 0 ? '0' : ((d.tp / den) * 100).toFixed(1);
      return (
        <>
          <Tag type="tp">TP</Tag><Tag type="fp">FP</Tag> Precision = <strong>{p}%</strong>. The denominator is the <strong>predicted-positive column</strong>. Critical when <strong>false alarms are costly</strong> — like spam filtering (you don't want real mail in spam).
        </>
      );
    },
    highlight: ['tp', 'fp'],
    dim: ['fn', 'tn'],
    dotHL: (t) => t === 'tp' || t === 'fp',
  },
  {
    id: 'f1',
    name: 'F1 Score',
    cells: ['tp', 'fp', 'fn'],
    num: (d) => 2 * d.tp,
    den: (d) => 2 * d.tp + d.fp + d.fn,
    formula: '2·TP / (2·TP + FP + FN)',
    plain: <span>Harmonic mean of Precision & Recall — balances both.</span>,
    insight: (d) => {
      const den = 2 * d.tp + d.fp + d.fn;
      const f = den === 0 ? '0' : ((2 * d.tp / den) * 100).toFixed(1);
      return (
        <>
          <Tag type="tp">TP</Tag><Tag type="fp">FP</Tag><Tag type="fn">FN</Tag> F1 = <strong>{f}%</strong>. Useful when classes are <strong>imbalanced</strong> and you need a single number that punishes both false alarms and misses.
        </>
      );
    },
    highlight: ['tp', 'fp', 'fn'],
    dim: ['tn'],
    dotHL: (t) => t === 'tp' || t === 'fp' || t === 'fn',
  },
  {
    id: 'specificity',
    name: 'Specificity',
    cells: ['tn', 'fp'],
    num: (d) => d.tn,
    den: (d) => d.tn + d.fp,
    formula: 'TN / (TN + FP)',
    plain: <span>Of all <strong>actual negatives</strong>, how many did I correctly reject?</span>,
    insight: (d) => {
      const den = d.tn + d.fp;
      const s = den === 0 ? '0' : ((d.tn / den) * 100).toFixed(1);
      return (
        <>
          <Tag type="tn">TN</Tag><Tag type="fp">FP</Tag> Specificity = <strong>{s}%</strong>. The mirror of recall but for <strong>negatives</strong>. Important when you need to avoid unnecessary interventions (e.g. healthy patients getting treatment).
        </>
      );
    },
    highlight: ['tn', 'fp'],
    dim: ['tp', 'fn'],
    dotHL: (t) => t === 'tn' || t === 'fp',
  },
];