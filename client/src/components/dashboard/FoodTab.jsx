import { useState } from 'react';
import { Apple, Plus, Lightbulb, PieChart } from 'lucide-react';
import { calculateBMR, calculateTDEE } from '../../utils/healthCalculations';

export default function FoodTab({ meals = [], profile, onAddMeal, onToggleMeal }) {
  const [subTab, setSubTab] = useState('record');
  const [title, setTitle] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [calories, setCalories] = useState('450');
  const [protein, setProtein] = useState('30');
  const [carbs, setCarbs] = useState('40');
  const [fat, setFat] = useState('15');

  const bmr = calculateBMR(profile?.weight || 65, profile?.height || 170, profile?.age || 25, profile?.gender || 'Female');
  const tdeeTarget = calculateTDEE(bmr, profile?.activityLevel || 'Balanced');

  const totalCalories = meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
  const totalProtein = meals.reduce((sum, m) => sum + (Number(m.protein) || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + (Number(m.carbs) || 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + (Number(m.fat) || 0), 0);

  const remainingCalories = tdeeTarget - totalCalories;
  const pct = Math.min(100, Math.round((totalCalories / tdeeTarget) * 100));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddMeal({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title,
      mealType,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      done: true,
    });
    setTitle('');
  };

  return (
    <div className="tab-pane-card">
      <div className="tab-header-nav">
        <div className="tab-title">
          <Apple size={20} />
          <h4>Food & Nutrition Log</h4>
        </div>
        <div className="subtab-pills">
          <button type="button" className={`subtab ${subTab === 'record' ? 'active' : ''}`} onClick={() => setSubTab('record')}>Record Log</button>
          <button type="button" className={`subtab ${subTab === 'tracking' ? 'active' : ''}`} onClick={() => setSubTab('tracking')}>Tracking & Macros</button>
          <button type="button" className={`subtab ${subTab === 'recommendation' ? 'active' : ''}`} onClick={() => setSubTab('recommendation')}>Recommendations</button>
        </div>
      </div>

      {subTab === 'record' && (
        <form className="log-form-grid" onSubmit={handleSubmit}>
          <label className="field full-width">
            <span>Meal Description *</span>
            <input type="text" className="input" placeholder="e.g. Avocado Toast with Eggs & Coffee" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className="field">
            <span>Meal Category</span>
            <select className="input" value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </label>
          <label className="field">
            <span>Calories (kcal)</span>
            <input type="number" className="input" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </label>
          <label className="field">
            <span>Protein (g)</span>
            <input type="number" className="input" value={protein} onChange={(e) => setProtein(e.target.value)} />
          </label>
          <label className="field">
            <span>Carbs (g)</span>
            <input type="number" className="input" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
          </label>
          <label className="field">
            <span>Fat (g)</span>
            <input type="number" className="input" value={fat} onChange={(e) => setFat(e.target.value)} />
          </label>
          <div className="form-action-row full-width">
            <button type="submit" className="primary-btn"><Plus size={16} /> Save Meal Log</button>
          </div>
        </form>
      )}

      {subTab === 'tracking' && (
        <div className="tracking-summary-view">
          <div className="calorie-budget-card">
            <div className="budget-row">
              <span>Daily Calorie Budget: <strong>{tdeeTarget} kcal</strong></span>
              <span>Consumed: <strong>{totalCalories} kcal</strong> ({pct}%)</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="muted subtext">
              {remainingCalories >= 0 ? `${remainingCalories} kcal remaining for today` : `${Math.abs(remainingCalories)} kcal surplus over target`}
            </p>

            <div className="macro-badges-row">
              <div className="macro-badge">Protein: <strong>{totalProtein}g</strong></div>
              <div className="macro-badge">Carbs: <strong>{totalCarbs}g</strong></div>
              <div className="macro-badge">Fat: <strong>{totalFat}g</strong></div>
            </div>
          </div>

          <div className="log-list-stack">
            {meals.map((m) => (
              <div key={m.id} className="log-item-card">
                <div className="log-info">
                  <span className="log-type-tag">{m.mealType || 'Meal'}</span>
                  <strong>{m.title}</strong>
                  <span className="muted">{m.calories} kcal • P: {m.protein || 0}g | C: {m.carbs || 0}g | F: {m.fat || 0}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'recommendation' && (
        <div className="recommendations-view">
          <div className="rec-intro">
            <Lightbulb size={18} />
            <span>Nutrition guidance calculated for your goal to {profile?.goal || 'Stay Fit'}.</span>
          </div>
          <div className="rec-card-list">
            <div className="rec-card">
              <div className="rec-header">
                <strong>Protein Distribution Rule</strong>
                <span className="tag-pill">Macros</span>
              </div>
              <p>Aim for ~25-30g protein per meal to maintain lean muscle mass and promote satiety.</p>
            </div>
            <div className="rec-card">
              <div className="rec-header">
                <strong>Hydration & Fiber Sync</strong>
                <span className="tag-pill">Digestive Health</span>
              </div>
              <p>Pair high-fiber complex carbs (oats, quinoa) with at least 500ml water after meals.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
