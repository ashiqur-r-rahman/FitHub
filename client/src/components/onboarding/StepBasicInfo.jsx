import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cmToFtIn, ftInToCm, kgToLbs, lbsToKg } from '../../utils/healthCalculations';

export default function StepBasicInfo({ onboardingData, onChangeData, onCompleteOnboarding }) {
  const [unitSystem, setUnitSystem] = useState(onboardingData.unitSystem || 'metric');
  const [hintDismissed, setHintDismissed] = useState({
    name: false,
    age: false,
    feet: false,
    inches: false,
  });

  // Imperial helper local state
  const ftIn = cmToFtIn(onboardingData.height || 170);
  const [feet, setFeet] = useState(ftIn.feet);
  const [inches, setInches] = useState(ftIn.inches);
  const [lbs, setLbs] = useState(kgToLbs(onboardingData.weight || 65));

  const handleUnitToggle = (mode) => {
    setUnitSystem(mode);
    onChangeData({ unitSystem: mode });
  };

  const handleNameChange = (val) => {
    onChangeData({
      name: val,
      firstName: val.split(' ')[0] || val,
      lastName: val.split(' ').slice(1).join(' ') || '',
    });
  };

  const handleHeightCm = (cmVal) => {
    const cm = Number(cmVal);
    onChangeData({ height: cm });
    const converted = cmToFtIn(cm);
    setFeet(converted.feet);
    setInches(converted.inches);
  };

  const handleFtInChange = (newFeet, newInches) => {
    setFeet(newFeet);
    setInches(newInches);
    const cm = ftInToCm(newFeet, newInches);
    onChangeData({ height: cm });
  };

  const handleWeightKg = (kgVal) => {
    const kg = Number(kgVal);
    onChangeData({ weight: kg });
    setLbs(kgToLbs(kg));
  };

  const handleWeightLbs = (lbsVal) => {
    const l = Number(lbsVal);
    setLbs(l);
    const kg = lbsToKg(l);
    onChangeData({ weight: kg });
  };

  const dismissHint = (field) => {
    setHintDismissed((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  };

  const isValid = Boolean(
    (onboardingData.name?.trim() || onboardingData.firstName?.trim()) &&
    onboardingData.age > 0 &&
    onboardingData.height > 0 &&
    onboardingData.weight > 0
  );

  return (
    <div className="onboarding-step-content">
      <div className="step-header">
        <h2>Welcome to FitHub</h2>
        <p className="muted">Enter your basic details to instantly calculate your health metrics and start your dashboard.</p>
      </div>

      <div className="onboarding-form">
        {/* Name Field */}
        <label className="field full-width">
          <span>Name *</span>
          <input
            type="text"
            className="input"
            placeholder={hintDismissed.name ? '' : 'Enter your name'}
            value={onboardingData.name || onboardingData.firstName || ''}
            onFocus={() => dismissHint('name')}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
        </label>

        {/* Age & Gender Selection */}
        <div className="field-row">
          <label className="field">
            <span>Age *</span>
            <input
              type="number"
              className="input"
              min="5"
              max="120"
              placeholder={hintDismissed.age ? '' : 'e.g. 25'}
              value={onboardingData.age || ''}
              onFocus={() => dismissHint('age')}
              onChange={(e) => onChangeData({ age: Number(e.target.value) })}
              required
            />
          </label>
          <label className="field">
            <span>Gender *</span>
            <div className="gender-toggle-pills">
              <button
                type="button"
                className={`gender-pill ${onboardingData.gender === 'Female' ? 'active' : ''}`}
                onClick={() => onChangeData({ gender: 'Female' })}
              >
                Female
              </button>
              <button
                type="button"
                className={`gender-pill ${onboardingData.gender === 'Male' ? 'active' : ''}`}
                onClick={() => onChangeData({ gender: 'Male' })}
              >
                Male
              </button>
            </div>
          </label>
        </div>

        {/* Unit Toggle & Height/Weight */}
        <div className="field-stack">
          <div className="field-header-row">
            <span>Units</span>
            <div className="unit-toggle-pills">
              <button
                type="button"
                className={`unit-pill ${unitSystem === 'metric' ? 'active' : ''}`}
                onClick={() => handleUnitToggle('metric')}
              >
                Metric (cm/kg)
              </button>
              <button
                type="button"
                className={`unit-pill ${unitSystem === 'imperial' ? 'active' : ''}`}
                onClick={() => handleUnitToggle('imperial')}
              >
                Imperial (ft-in/lb)
              </button>
            </div>
          </div>

          {unitSystem === 'metric' ? (
            <div className="field-row">
              <label className="field">
                <span>Height (cm) *</span>
                <input
                  type="number"
                  className="input"
                  min="50"
                  max="250"
                  value={onboardingData.height || 170}
                  onChange={(e) => handleHeightCm(e.target.value)}
                />
              </label>
              <label className="field">
                <span>Weight (kg) *</span>
                <input
                  type="number"
                  className="input"
                  min="15"
                  max="300"
                  step="0.5"
                  value={onboardingData.weight || 65}
                  onChange={(e) => handleWeightKg(e.target.value)}
                />
              </label>
            </div>
          ) : (
            <div className="field-row">
              <label className="field">
                <span>Height (Ft / In) *</span>
                <div className="dual-input">
                  <input
                    type="number"
                    className="input"
                    min="1"
                    max="8"
                    placeholder={hintDismissed.feet ? '' : 'Ft'}
                    value={feet}
                    onFocus={() => dismissHint('feet')}
                    onChange={(e) => handleFtInChange(Number(e.target.value), inches)}
                  />
                  <input
                    type="number"
                    className="input"
                    min="0"
                    max="11"
                    placeholder={hintDismissed.inches ? '' : 'In'}
                    value={inches}
                    onFocus={() => dismissHint('inches')}
                    onChange={(e) => handleFtInChange(feet, Number(e.target.value))}
                  />
                </div>
              </label>
              <label className="field">
                <span>Weight (lbs) *</span>
                <input
                  type="number"
                  className="input"
                  min="30"
                  max="660"
                  value={lbs}
                  onChange={(e) => handleWeightLbs(e.target.value)}
                />
              </label>
            </div>
          )}
        </div>

        {/* Start Button */}
        {onCompleteOnboarding && (
          <div className="start-btn-row">
            <button
              type="button"
              className="cta-primary-btn start-dashboard-btn"
              disabled={!isValid}
              onClick={onCompleteOnboarding}
            >
              Start FitHub Dashboard <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
