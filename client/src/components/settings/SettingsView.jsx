export default function SettingsView() {
  return (
    <section className="section-card full">
      <div className="section-heading">
        <h3>Preferences</h3>
        <span className="badge">Active</span>
      </div>
      <div className="toggle-row"><span>Daily reminders</span><button className="toggle active" type="button" aria-label="Daily reminders" /></div>
      <div className="toggle-row"><span>Weekly summaries</span><button className="toggle" type="button" aria-label="Weekly summaries" /></div>
      <div className="toggle-row"><span>Focus mode</span><button className="toggle active" type="button" aria-label="Focus mode" /></div>
    </section>
  );
}
