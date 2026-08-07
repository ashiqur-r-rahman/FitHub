import { useState } from 'react';
import { Plus } from 'lucide-react';
import { kgToLbs } from '../../utils/healthCalculations';

export default function WeightTrendChart({ weightHistory = [], currentWeight = 65, unitSystem = 'metric', onAddWeight }) {
  const [newWeightInput, setNewWeightInput] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Normalize data for chart display
  const logs = weightHistory.length > 0 ? weightHistory : [
    { date: 'Aug 1', weight: currentWeight },
    { date: 'Today', weight: currentWeight },
  ];

  const weights = logs.map((item) => item.weight);
  const minW = Math.min(...weights) - 1;
  const maxW = Math.max(...weights) + 1;
  const range = maxW - minW || 1;

  const firstW = weights[0];
  const lastW = weights[weights.length - 1];
  const diff = Math.round((lastW - firstW) * 10) / 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newWeightInput) return;
    const val = Number(newWeightInput);
    if (val > 0) {
      onAddWeight(val);
      setNewWeightInput('');
      setShowAddForm(false);
    }
  };

  const displayWeight = (kg) => (unitSystem === 'imperial' ? `${kgToLbs(kg)} lbs` : `${kg} kg`);

  return (
    <div className="overview-card weight-trend-card">
      <div className="card-header-sm">
        <div>
          <h4>Weight History</h4>
          <p className="subtext">
            Current: <strong>{displayWeight(currentWeight)}</strong>
            {diff !== 0 && (
              <span className={`diff-tag ${diff < 0 ? 'down' : 'up'}`}>
                {diff > 0 ? `+${diff}` : diff} kg
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          className="icon-btn-sm"
          title="Add weight entry"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} /> Log
        </button>
      </div>

      {showAddForm && (
        <form className="mini-inline-form" onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.1"
            className="input-sm"
            placeholder={unitSystem === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}
            value={newWeightInput}
            onChange={(e) => setNewWeightInput(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn-sm">Save</button>
        </form>
      )}

      <div className="trend-bar-chart">
        {logs.map((item, idx) => {
          const heightPct = Math.max(15, Math.min(100, ((item.weight - minW) / range) * 100));
          return (
            <div key={item.id || idx} className="chart-col">
              <div className="bar-wrapper" title={`${item.date}: ${item.weight} kg`}>
                <div className="bar-fill" style={{ height: `${heightPct}%` }} />
              </div>
              <span className="col-label">{item.date?.slice(5) || item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
