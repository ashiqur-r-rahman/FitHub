export default function ProfileView() {
  return (
    <section className="section-card full">
      <div className="profile-card">
        <div className="avatar">MY</div>
        <div>
          <h3>Maya Patel</h3>
          <p className="muted">Balanced, focused, and building consistency.</p>
        </div>
      </div>
      <div className="list-stack" style={{ marginTop: '16px' }}>
        <div className="check-row"><span>Goal</span><strong>Build strength and improve energy</strong></div>
        <div className="check-row"><span>Weekly target</span><strong>4 workouts</strong></div>
      </div>
    </section>
  );
}
