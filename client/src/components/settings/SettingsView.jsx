export default function SettingsView({ preferences, onTogglePreference, onResetData }) {
  return (
    <section className="section-card full">
      <div className="section-heading">
        <h3>Preferences</h3>
        <span className="badge">Active</span>
      </div>
      <div className="toggle-row"><span>Daily reminders</span><button className={`toggle ${preferences?.reminders ? 'active' : ''}`} type="button" aria-label="Daily reminders" onClick={() => onTogglePreference('reminders')} /></div>
      <div className="toggle-row"><span>Weekly summaries</span><button className={`toggle ${preferences?.weeklySummaries ? 'active' : ''}`} type="button" aria-label="Weekly summaries" onClick={() => onTogglePreference('weeklySummaries')} /></div>
      <div className="toggle-row"><span>Focus mode</span><button className={`toggle ${preferences?.focusMode ? 'active' : ''}`} type="button" aria-label="Focus mode" onClick={() => onTogglePreference('focusMode')} /></div>
      <div className="inline-actions" style={{ marginTop: '16px' }}>
        <button type="button" className="secondary-btn" onClick={onResetData}>Reset demo data</button>
      </div>
    </section>
  );
}
