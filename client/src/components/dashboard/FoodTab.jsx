export default function FoodTab() {
  return (
    <section className="section-card">
      <div className="section-heading">
        <h3>Nutrition</h3>
        <span className="badge">Balanced</span>
      </div>
      <div className="list-stack">
        <div className="list-item">
          <div>
            <strong>Breakfast</strong>
            <div className="muted">Greek yogurt, berries, nuts</div>
          </div>
          <span className="badge">Protein</span>
        </div>
        <div className="list-item">
          <div>
            <strong>Lunch</strong>
            <div className="muted">Salmon bowl with greens</div>
          </div>
          <span className="badge">Fiber</span>
        </div>
      </div>
    </section>
  );
}
