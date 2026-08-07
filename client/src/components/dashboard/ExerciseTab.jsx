export default function ExerciseTab({ workouts, onToggleWorkout }) {
  return (
    <section className="section-card">
      <div className="section-heading">
        <h3>Exercise plan</h3>
        <span className="badge">{workouts?.length || 0} sessions</span>
      </div>
      <div className="list-stack">
        {workouts?.map((workout) => (
          <div className="list-item" key={workout.id}>
            <div>
              <strong>{workout.title}</strong>
              <div className="muted">{workout.details}</div>
            </div>
            <button type="button" className={`secondary-btn ${workout.done ? 'done' : ''}`} onClick={() => onToggleWorkout(workout.id)}>
              {workout.done ? 'Done' : 'Mark done'}
            </button>
          </div>
        ))}
      </div>
      <div className="tip-box">
        Stronger habits come from keeping the routine small and repeatable.
      </div>
    </section>
  );
}
