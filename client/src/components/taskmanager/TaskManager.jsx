export default function TaskManager() {
  return (
    <section className="section-card full">
      <div className="section-heading">
        <h3>Today's focus</h3>
        <span className="badge">4 tasks</span>
      </div>
      <div className="list-stack">
        <div className="check-row">
          <span>Complete 20-minute walk</span>
          <span className="badge">Done</span>
        </div>
        <div className="check-row">
          <span>Prep lunch for tomorrow</span>
          <span className="badge">In progress</span>
        </div>
        <div className="check-row">
          <span>Write 3 gratitude notes</span>
          <span className="badge">Pending</span>
        </div>
      </div>
    </section>
  );
}
