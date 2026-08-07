export default function SleepTab({ sleep, onUpdateSleep }) {
  const progress = Math.min(100, Math.round((sleep.hours / sleep.target) * 100));

  return (
    <section className="section-card">
      <div className="section-heading">
        <h3>Recovery</h3>
        <span className="badge">{sleep.hours.toFixed(1)}h last night</span>
      </div>
      <div className="progress-bar" aria-label="Sleep goal progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="inline-actions">
        <button type="button" className="secondary-btn" onClick={() => onUpdateSleep(Math.max(5.5, sleep.hours - 0.5))}>- 0.5h</button>
        <button type="button" className="secondary-btn" onClick={() => onUpdateSleep(Math.min(10, sleep.hours + 0.5))}>+ 0.5h</button>
      </div>
      <div className="tip-box">A calm evening routine can improve recovery and energy for tomorrow.</div>
    </section>
  );
}
