import BmiGauge from './BmiGauge';
import WeightTrendChart from './WeightTrendChart';

export default function HealthOverview() {
  return (
    <section className="section-card wide">
      <div className="section-heading">
        <h3>Health overview</h3>
        <span className="muted">Updated 5 mins ago</span>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <strong>8.4k</strong>
          <span>Daily steps</span>
        </div>
        <div className="metric-card">
          <strong>7.8h</strong>
          <span>Sleep</span>
        </div>
        <div className="metric-card">
          <strong>2.1L</strong>
          <span>Water</span>
        </div>
        <div className="metric-card">
          <strong>84%</strong>
          <span>Energy</span>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: '16px' }}>
        <BmiGauge />
        <WeightTrendChart />
      </div>
    </section>
  );
}
