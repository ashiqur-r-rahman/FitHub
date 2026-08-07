import { useState } from 'react';
import { User, Save, Check, Sparkles } from 'lucide-react';
import { HOBBY_OPTIONS, GOAL_OPTIONS } from '../../utils/initialData';
import { cmToFtIn, ftInToCm, kgToLbs, lbsToKg } from '../../utils/healthCalculations';

export default function ProfileView({ profile, onUpdateProfile, onAddWeight, onShowToast }) {
  const [firstName, setFirstName] = useState(profile.firstName || profile.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(profile.lastName || profile.name?.split(' ')[1] || '');
  const [age, setAge] = useState(profile.age || 25);
  const [gender, setGender] = useState(profile.gender || 'Female');
  const [height, setHeight] = useState(profile.height || 170);
  const [weight, setWeight] = useState(profile.weight || 65);
  const [goal, setGoal] = useState(profile.goal || 'Stay Fit');
  const [interests, setInterests] = useState(profile.interests || ['weights', 'running']);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const unitSystem = profile.unitSystem || 'metric';

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedName = `${firstName} ${lastName}`.trim();
    
    // Check if weight changed to append to weight trend history
    if (weight !== profile.weight && onAddWeight) {
      onAddWeight(weight);
    }

    onUpdateProfile({
      firstName,
      lastName,
      name: updatedName,
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      goal,
      interests,
    });

    setSavedSuccess(true);
    if (onShowToast) {
      onShowToast('Profile & health metrics updated successfully!');
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="view-container">
      <div className="view-card-header">
        <div className="profile-avatar-large">
          {firstName.charAt(0) || 'U'}
        </div>
        <div>
          <h2>{firstName} {lastName}</h2>
          <p className="muted">{goal} • {gender}, {age} years old</p>
        </div>
      </div>

      <form className="profile-form-grid" onSubmit={handleSave}>
        <div className="section-subtitle">
          <User size={18} />
          <span>Personal Information</span>
        </div>

        <div className="field-row">
          <label className="field">
            <span>First Name</span>
            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label className="field">
            <span>Last Name</span>
            <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Age</span>
            <input type="number" className="input" min="5" max="120" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <label className="field">
            <span>Gender</span>
            <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Neutral">Neutral</option>
            </select>
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Height ({unitSystem === 'imperial' ? 'ft-in' : 'cm'})</span>
            <input
              type="number"
              className="input"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            {unitSystem === 'imperial' && <span className="subtext">{cmToFtIn(height).formatted}</span>}
          </label>
          <label className="field">
            <span>Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</span>
            <input
              type="number"
              step="0.5"
              className="input"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            {unitSystem === 'imperial' && <span className="subtext">{kgToLbs(weight)} lbs</span>}
          </label>
        </div>

        <div className="field full-width">
          <span>Primary Goal</span>
          <select className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
            {GOAL_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="field full-width">
          <span>Activities & Hobbies</span>
          <div className="interests-grid-sm">
            {HOBBY_OPTIONS.map((h) => {
              const selected = interests.includes(h.id);
              return (
                <button
                  key={h.id}
                  type="button"
                  className={`chip ${selected ? 'selected' : ''}`}
                  onClick={() => toggleInterest(h.id)}
                >
                  {h.icon} {h.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-action-row full-width">
          <button type="submit" className="primary-btn">
            {savedSuccess ? <Check size={16} /> : <Save size={16} />}
            {savedSuccess ? 'Saved!' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
