export default function ProfileView({ profile, onUpdateProfile }) {
  return (
    <section className="section-card full">
      <div className="profile-card">
        <div className="avatar">{profile?.name?.slice(0, 2).toUpperCase() || 'MY'}</div>
        <div>
          <h3>{profile?.name || 'Maya Patel'}</h3>
          <p className="muted">{profile?.goal || 'Balanced, focused, and building consistency.'}</p>
        </div>
      </div>
      <div className="field-stack" style={{ marginTop: '16px' }}>
        <label className="field">
          <span>Name</span>
          <input className="input" value={profile?.name || ''} onChange={(event) => onUpdateProfile({ name: event.target.value })} />
        </label>
        <label className="field">
          <span>Goal</span>
          <input className="input" value={profile?.goal || ''} onChange={(event) => onUpdateProfile({ goal: event.target.value })} />
        </label>
        <label className="field">
          <span>Weekly target</span>
          <input className="input" type="number" value={profile?.weeklyTarget || 4} onChange={(event) => onUpdateProfile({ weeklyTarget: Number(event.target.value) })} />
        </label>
      </div>
    </section>
  );
}
