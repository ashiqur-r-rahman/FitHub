export default function StepCommitment({ profile, onUpdateProfile }) {
  return (
    <div className="mini-card">
      <h4>Commitment</h4>
      <p className="muted">Set your ideal weekly rhythm and reminders.</p>
      <div className="field-stack">
        <label className="field">
          <span>Goal</span>
          <select className="input" value={profile?.goal || ''} onChange={(event) => onUpdateProfile({ goal: event.target.value })}>
            <option>Build strength</option>
            <option>Improve recovery</option>
            <option>Lose weight</option>
            <option>Boost energy</option>
          </select>
        </label>
        <label className="field">
          <span>Weekly target</span>
          <input className="input" type="number" value={profile?.weeklyTarget || 4} onChange={(event) => onUpdateProfile({ weeklyTarget: Number(event.target.value) })} />
        </label>
      </div>
    </div>
  );
}
