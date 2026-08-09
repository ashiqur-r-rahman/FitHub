import { calculateBMI } from '../../utils/healthCalculations';

export default function BmiGauge({ weight, height }) {
  const { bmi, category, categoryCode } = calculateBMI(weight, height);

  // Gauge Range: BMI 15 to 35 mapped across 220 degree arc (-110deg to +110deg)
  const minBmi = 15;
  const maxBmi = 35;
  const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi || 22));
  const percentage = (clampedBmi - minBmi) / (maxBmi - minBmi);
  const angle = -110 + percentage * 220;

  const categoryColors = {
    underweight: '#3A5A8C',
    normal: '#3E8E7E',
    overweight: '#C98A3C',
    obese: '#B3454A',
  };

  const badgeColor = categoryColors[categoryCode] || '#3E8E7E';

  // Generate tick mark coordinates
  const ticks = [];
  const totalTicks = 11;
  for (let i = 0; i < totalTicks; i++) {
    const tickAngle = -110 + (i / (totalTicks - 1)) * 220;
    const rad = (tickAngle - 90) * (Math.PI / 180);
    const x1 = 100 + 72 * Math.cos(rad);
    const y1 = 100 + 72 * Math.sin(rad);
    const x2 = 100 + 80 * Math.cos(rad);
    const y2 = 100 + 80 * Math.sin(rad);
    ticks.push({ x1, y1, x2, y2, key: i });
  }

  return (
    <div className="overview-card bmi-card premium-gauge">
      <div className="card-header-sm">
        <div>
          <h4>BMI Index Clock</h4>
          <span className="subtext">Body Mass Index Dial</span>
        </div>
        <span className="badge category-badge" style={{ backgroundColor: badgeColor, color: '#ffffff' }}>
          {category}
        </span>
      </div>

      <div className="modern-gauge-wrapper">
        <svg viewBox="0 0 200 130" className="premium-gauge-svg">
          <defs>
            <linearGradient id="bmiArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7FA8D9" />
              <stop offset="35%" stopColor="#3E8E7E" />
              <stop offset="70%" stopColor="#C98A3C" />
              <stop offset="100%" stopColor="#B3454A" />
            </linearGradient>
            <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Track Arc */}
          <path
            d="M 26 130 A 74 74 0 1 1 174 130"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Color Gradient Active Arc */}
          <path
            d="M 26 130 A 74 74 0 1 1 174 130"
            fill="none"
            stroke="url(#bmiArcGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Tick Marks */}
          {ticks.map((t) => (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="rgba(11, 31, 58, 0.25)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* Digital Readout Text */}
          <text x="100" y="98" textAnchor="middle" className="gauge-digital-val">
            {bmi || '--'}
          </text>
          <text x="100" y="114" textAnchor="middle" className="gauge-unit-text">
            kg/m²
          </text>

          {/* Sleek Clock Needle */}
          <g transform={`rotate(${angle}, 100, 100)`} filter="url(#needleGlow)">
            <line x1="100" y1="100" x2="100" y2="34" stroke="#0B1F3A" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="100" cy="100" r="7" fill="#0B1F3A" stroke="#ffffff" strokeWidth="2" />
            <circle cx="100" cy="100" r="3" fill={badgeColor} />
          </g>
        </svg>
      </div>

      <div className="gauge-scale-legend">
        <span className="scale-item"><span className="dot underweight-dot" />&lt;18.5 Under</span>
        <span className="scale-item"><span className="dot normal-dot" />18.5–24.9 Normal</span>
        <span className="scale-item"><span className="dot overweight-dot" />25–29.9 Over</span>
        <span className="scale-item"><span className="dot obese-dot" />30+ Obese</span>
      </div>
    </div>
  );
}
