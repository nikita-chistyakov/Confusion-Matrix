import React from 'react';

export interface ConfusionValues {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface Scenario {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  name: string;
  id: string;
}

export interface Metric {
  id: string;
  name: string;
  cells: (keyof ConfusionValues)[];
  num: (d: ConfusionValues) => number;
  den: (d: ConfusionValues) => number;
  formula: string;
  plain: React.ReactNode;
  insight: (d: ConfusionValues) => React.ReactNode;
  highlight: (keyof ConfusionValues)[];
  dim: (keyof ConfusionValues)[];
  dotHL: (type: keyof ConfusionValues) => boolean;
}
