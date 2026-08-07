import BmiGauge from './BmiGauge';
import WeightTrendChart from './WeightTrendChart';

export default function HealthOverview({ metrics, profile }) {
  return (
    <section className="section-card wide">
      <div className="section-heading">
        <h3>Health overview</h3>
        <span className="muted">{profile?.name || 'Maya'} is feeling {metrics?.mood || 'focused'}</span>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <strong>{metrics?.steps?.toLocaleString()} steps</strong>
          <span>Daily steps</span>
        </div>
        <div className="metric-card">
          <strong>{metrics?.water?.toFixed(1)}L</strong>
          <span>Water</span>
        </div>
        <div className="metric-card">
          <strong>{metrics?.energy}%</strong>
          <span>Energy</span>
        </div>
        <div className="metric-card">
          <strong>{metrics?.mood}</strong>
          <span>Momentum</span>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: '16px' }}>
        <BmiGauge />
        <WeightTrendChart />
      </div>
    </section>
  );
}
