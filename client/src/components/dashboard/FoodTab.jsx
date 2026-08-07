export default function FoodTab({ meals, onToggleMeal }) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <h3>Nutrition</h3>
        <span className="badge">Balanced</span>
      </div>
      <div className="list-stack">
        {meals?.map((meal) => (
          <div className="list-item" key={meal.id}>
            <div>
              <strong>{meal.title}</strong>
              <div className="muted">{meal.details}</div>
            </div>
            <div className="list-actions">
              <span className="badge">{meal.tag}</span>
              <button type="button" className={`secondary-btn ${meal.done ? 'done' : ''}`} onClick={() => onToggleMeal(meal.id)}>
                {meal.done ? 'Logged' : 'Log'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
