import { useState } from 'react';
import { BedDouble, Plus, Lightbulb, Moon, Star } from 'lucide-react';

export default function SleepTab({ sleep = {}, profile, onUpdateSleep, onAddSleepLog }) {
  const [subTab, setSubTab] = useState('record');
  const [sleepTime, setSleepTime] = useState(sleep.sleepTime || '23:00');
  const [wakeTime, setWakeTime] = useState(sleep.wakeTime || '07:00');
  const [quality, setQuality] = useState(sleep.quality || 4);

  // Compute duration hours from sleepTime & wakeTime
  const computeHours = (start, end) => {
    if (!start || !end) return 8.0;
    const [sH, sM] = start.split(':').map(Number);
    const [wH, wM] = end.split(':').map(Number);
    let startMin = sH * 60 + sM;
    let endMin = wH * 60 + wM;
    if (endMin <= startMin) {
      endMin += 24 * 60; // Next day
    }
    const diffMins = endMin - startMin;
    return Math.round((diffMins / 60) * 10) / 10;
  };

  const currentHours = computeHours(sleepTime, wakeTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSleep({
      hours: currentHours,
      sleepTime,
      wakeTime,
      quality: Number(quality),
    });
    if (onAddSleepLog) {
      onAddSleepLog({
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        hours: currentHours,
        quality: Number(quality),
      });
    }
  };

  const logs = sleep.logs || [
    { id: 1, date: 'Mon', hours: 7.2, quality: 4 },
    { id: 2, date: 'Tue', hours: 6.8, quality: 3 },
    { id: 3, date: 'Wed', hours: 8.1, quality: 5 },
    { id: 4, date: 'Thu', hours: 7.5, quality: 4 },
    { id: 5, date: 'Today', hours: currentHours, quality: Number(quality) },
  ];

  const avgHours = Math.round((logs.reduce((sum, l) => sum + l.hours, 0) / logs.length) * 10) / 10;

  return (
    <div className="tab-pane-card">
      <div className="tab-header-nav">
        <div className="tab-title">
          <BedDouble size={20} />
          <h4>Sleep & Recovery Log</h4>
        </div>
        <div className="subtab-pills">
          <button type="button" className={`subtab ${subTab === 'record' ? 'active' : ''}`} onClick={() => setSubTab('record')}>Record Log</button>
          <button type="button" className={`subtab ${subTab === 'tracking' ? 'active' : ''}`} onClick={() => setSubTab('tracking')}>Tracking & Trends</button>
          <button type="button" className={`subtab ${subTab === 'recommendation' ? 'active' : ''}`} onClick={() => setSubTab('recommendation')}>Recommendations</button>
        </div>
      </div>

      {subTab === 'record' && (
        <form className="log-form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Bedtime *</span>
            <input type="time" className="input" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} required />
          </label>
          <label className="field">
            <span>Wake-up Time *</span>
            <input type="time" className="input" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} required />
          </label>
          <label className="field">
            <span>Calculated Duration</span>
            <div className="read-only-badge">{currentHours} hours</div>
          </label>
          <label className="field">
            <span>Sleep Quality (1 - 5 Stars)</span>
            <div className="star-rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= quality ? 'active' : ''}`}
                  onClick={() => setQuality(star)}
                >
                  <Star size={18} fill={star <= quality ? '#C98A3C' : 'none'} />
                </button>
              ))}
            </div>
          </label>
          <div className="form-action-row full-width">
            <button type="submit" className="primary-btn"><Plus size={16} /> Save Sleep Entry</button>
          </div>
        </form>
      )}

      {subTab === 'tracking' && (
        <div className="tracking-summary-view">
          <div className="sleep-summary-card">
            <div>
              <span>Weekly Average: <strong>{avgHours} hrs/night</strong></span>
              <span className="muted"> (Target: 8.0 hrs)</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${Math.min(100, (avgHours / 8) * 100)}%` }} />
            </div>
          </div>

          <div className="sleep-history-bars">
            {logs.map((log) => (
              <div key={log.id} className="chart-col">
                <span className="col-val">{log.hours}h</span>
                <div className="bar-wrapper">
                  <div className="bar-fill" style={{ height: `${Math.min(100, (log.hours / 10) * 100)}%` }} />
                </div>
                <span className="col-label">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'recommendation' && (
        <div className="recommendations-view">
          <div className="rec-intro">
            <Lightbulb size={18} />
            <span>Optimal sleep suggestions for a {profile?.age || 25} year old seeking consistency.</span>
          </div>
          <div className="rec-card-list">
            <div className="rec-card">
              <div className="rec-header">
                <strong>Recommended Bedtime Window</strong>
                <span className="tag-pill">Circadian Rhythm</span>
              </div>
              <p>For your target 06:45 AM wake up time, aim to be asleep by <strong>10:45 PM</strong> (90-min cycle alignment).</p>
            </div>
            <div className="rec-card">
              <div className="rec-header">
                <strong>Digital Wind-down Protocol</strong>
                <span className="tag-pill">Sleep Hygiene</span>
              </div>
              <p>Turn off screens and blue light 45 minutes prior to bedtime to boost melatonin production.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
