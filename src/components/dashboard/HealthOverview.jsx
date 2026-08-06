import React from 'react';
import BmiGauge from './BmiGauge';
import WeightTrendChart from './WeightTrendChart';

export default function HealthOverview() {
  return (
    <div>
      <h3>HealthOverview Component</h3>
      <BmiGauge />
      <WeightTrendChart />
    </div>
  );
}
