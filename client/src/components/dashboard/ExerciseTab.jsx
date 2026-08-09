import { useState } from 'react';
import { Activity, Flame, Plus, CheckCircle, Lightbulb, Dumbbell } from 'lucide-react';

export default function ExerciseTab({ workouts = [], profile, onAddWorkout, onToggleWorkout }) {
  const [subTab, setSubTab] = useState('record'); // record | tracking | recommendation
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Gym/Weights');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState('Moderate');
  const [calories, setCalories] = useState('200');

  const userInterests = profile?.interests || ['weights', 'running'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddWorkout({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title,
      type,
      durationMin: Number(duration),
      intensity,
      caloriesBurned: Number(calories),
      done: true,
    });
    setTitle('');
  };

  const totalMinutes = workouts.reduce((sum, w) => sum + (w.durationMin || 0), 0);
  const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
  const activeCount = workouts.filter((w) => w.done).length;

  const recommendations = [
    { title: '30-Min High-Protein HIIT', tag: 'Weights', text: 'Combines compound lifts with short rest intervals to optimize muscle retention.' },
    { title: 'Cadence & Zone 2 Running', tag: 'Running', text: 'Keep heart rate in zone 2 for 35 minutes to build baseline endurance.' },
    { title: 'Mobility & Hip Flexor Flow', tag: 'Yoga', text: 'Gentle 20-minute stretching flow to enhance joint recovery.' },
  ];

  return (
    <div className="tab-pane-card">
      <div className="tab-header-nav">
        <div className="tab-title">
          <Activity size={20} />
          <h4>Exercise Tracking</h4>
        </div>
        <div className="subtab-pills">
          <button type="button" className={`subtab ${subTab === 'record' ? 'active' : ''}`} onClick={() => setSubTab('record')}>Record Log</button>
          <button type="button" className={`subtab ${subTab === 'tracking' ? 'active' : ''}`} onClick={() => setSubTab('tracking')}>Tracking & History</button>
          <button type="button" className={`subtab ${subTab === 'recommendation' ? 'active' : ''}`} onClick={() => setSubTab('recommendation')}>Recommendations</button>
        </div>
      </div>

      {subTab === 'record' && (
        <form className="log-form-grid" onSubmit={handleSubmit}>
          <label className="field full-width">
            <span>Activity Title *</span>
            <input type="text" className="input" placeholder="e.g. 5km Morning Park Run" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className="field">
            <span>Type</span>
            <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Gym/Weights">Gym/Weights</option>
              <option value="Running">Running</option>
              <option value="Yoga">Yoga</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Walking">Walking</option>
            </select>
          </label>
          <label className="field">
            <span>Duration (mins)</span>
            <input type="number" className="input" min="5" max="300" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </label>
          <label className="field">
            <span>Intensity</span>
            <select className="input" value={intensity} onChange={(e) => setIntensity(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </label>
          <label className="field">
            <span>Est. Calories Burned</span>
            <input type="number" className="input" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </label>
          <div className="form-action-row full-width">
            <button type="submit" className="primary-btn"><Plus size={16} /> Save Workout Log</button>
          </div>
        </form>
      )}

      {subTab === 'tracking' && (
        <div className="tracking-summary-view">
          <div className="streak-metrics-banner">
            <div className="streak-card">
              <Flame size={20} className="fire-icon" />
              <div><strong>4 Day</strong> Active Streak</div>
            </div>
            <div className="stat-badge">{totalMinutes} Mins Total</div>
            <div className="stat-badge">{totalCalories} kcal Burned</div>
          </div>

          <div className="log-list-stack">
            {workouts.map((w) => (
              <div key={w.id} className={`log-item-card ${w.done ? 'completed' : ''}`}>
                <div className="log-info">
                  <span className="log-type-tag">{w.type || 'Workout'}</span>
                  <strong>{w.title}</strong>
                  <span className="muted">{w.durationMin} mins • {w.intensity} • {w.caloriesBurned} kcal</span>
                </div>
                <button type="button" className={`check-btn ${w.done ? 'checked' : ''}`} onClick={() => onToggleWorkout(w.id)}>
                  <CheckCircle size={18} /> {w.done ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'recommendation' && (
        <div className="recommendations-view">
          <div className="rec-intro">
            <Lightbulb size={18} />
            <span>Tailored workout suggestions based on your interests ({userInterests.join(', ') || 'fitness'}) & goal ({profile?.goal || 'Stay Fit'}).</span>
          </div>
          <div className="rec-card-list">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="rec-card">
                <div className="rec-header">
                  <strong>{rec.title}</strong>
                  <span className="tag-pill">{rec.tag}</span>
                </div>
                <p>{rec.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
