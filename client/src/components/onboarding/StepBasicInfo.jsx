export default function StepBasicInfo({ profile, onUpdateProfile }) {
  return (
    <div className="mini-card">
      <h4>Basics</h4>
      <p className="muted">Name, age, and activity level.</p>
      <div className="field-stack">
        <label className="field">
          <span>Name</span>
          <input className="input" value={profile?.name || ''} onChange={(event) => onUpdateProfile({ name: event.target.value })} />
        </label>
        <label className="field">
          <span>Age</span>
          <input className="input" type="number" value={profile?.age || 0} onChange={(event) => onUpdateProfile({ age: Number(event.target.value) })} />
        </label>
        <label className="field">
          <span>Activity level</span>
          <select className="input" value={profile?.activityLevel || 'Balanced'} onChange={(event) => onUpdateProfile({ activityLevel: event.target.value })}>
            <option>Balanced</option>
            <option>Active</option>
            <option>High intensity</option>
          </select>
        </label>
      </div>
    </div>
  );
}
