import { calculateBMI } from '../../utils/healthCalculations';

export default function BmiGauge({ weight, height }) {
  const { bmi, category, categoryCode } = calculateBMI(weight, height);

  // Map BMI (15 to 35) to angle (-90deg to 90deg)
  const minBmi = 15;
  const maxBmi = 35;
  const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi || 22));
  const percentage = (clampedBmi - minBmi) / (maxBmi - minBmi);
  const angle = -90 + percentage * 180;

  const categoryColors = {
    underweight: '#3A5A8C',
    normal: '#3E8E7E',
    overweight: '#C98A3C',
    obese: '#B3454A',
  };

  const badgeColor = categoryColors[categoryCode] || '#3A5A8C';

  return (
    <div className="overview-card bmi-card">
      <div className="card-header-sm">
        <h4>BMI Index</h4>
        <span className="badge" style={{ backgroundColor: badgeColor, color: '#fff' }}>
          {category}
        </span>
      </div>

      <div className="gauge-container">
        <svg viewBox="0 0 100 55" className="gauge-svg">
          {/* Gauge Background Arcs */}
          <path d="M 10 50 A 40 40 0 0 1 30 18" fill="none" stroke="#DCE8F7" strokeWidth="8" strokeLinecap="round" />
          <path d="M 32 16 A 40 40 0 0 1 68 16" fill="none" stroke="#7FA8D9" strokeWidth="8" />
          <path d="M 70 18 A 40 40 0 0 1 90 50" fill="none" stroke="#3A5A8C" strokeWidth="8" strokeLinecap="round" />

          {/* Center Text */}
          <text x="50" y="44" textAnchor="middle" className="gauge-value">
            {bmi || '--'}
          </text>
          <text x="50" y="52" textAnchor="middle" className="gauge-sub">
            kg/m²
          </text>

          {/* Needle Indicator */}
          <g transform={`rotate(${angle}, 50, 48)`}>
            <polygon points="48,48 52,48 50,15" fill="#0B1F3A" />
            <circle cx="50" cy="48" r="4" fill="#0B1F3A" />
          </g>
        </svg>
      </div>

      <div className="gauge-legend">
        <span>18.5 (Under)</span>
        <span>24.9 (Normal)</span>
        <span>29.9 (Over)</span>
      </div>
    </div>
  );
}
