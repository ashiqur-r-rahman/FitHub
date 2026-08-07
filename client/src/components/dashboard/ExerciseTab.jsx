export default function ExerciseTab() {
  return (
    <section className="section-card">
      <div className="section-heading">
        <h3>Exercise plan</h3>
        <span className="badge">3 sessions</span>
      </div>
      <div className="list-stack">
        <div className="list-item">
          <div>
            <strong>Upper body strength</strong>
            <div className="muted">45 min • 3 rounds</div>
          </div>
          <span className="badge">Today</span>
        </div>
        <div className="list-item">
          <div>
            <strong>Mobility flow</strong>
            <div className="muted">20 min • recovery focus</div>
          </div>
          <span className="badge">Tomorrow</span>
        </div>
      </div>
      <div className="tip-box">
        Stronger habits come from keeping the routine small and repeatable.
      </div>
    </section>
  );
}
