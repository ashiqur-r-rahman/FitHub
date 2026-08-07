export default function WeightTrendChart() {
  return (
    <div className="mini-card">
      <h4>Weight trend</h4>
      <div className="trend-bars" aria-label="Weight trend chart">
        <div className="bar-group"><span>Mon</span><div className="bar bar-1" /></div>
        <div className="bar-group"><span>Tue</span><div className="bar bar-2" /></div>
        <div className="bar-group"><span>Wed</span><div className="bar bar-3" /></div>
        <div className="bar-group"><span>Thu</span><div className="bar bar-4" /></div>
        <div className="bar-group"><span>Fri</span><div className="bar bar-5" /></div>
        <div className="bar-group"><span>Sat</span><div className="bar bar-6" /></div>
      </div>
    </div>
  );
}
