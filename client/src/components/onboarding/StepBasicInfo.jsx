import { useState } from 'react';
import { cmToFtIn, ftInToCm, kgToLbs, lbsToKg } from '../../utils/healthCalculations';

export default function StepBasicInfo({ onboardingData, onChangeData }) {
  const [unitSystem, setUnitSystem] = useState(onboardingData.unitSystem || 'metric');

  // Imperial helper local state
  const ftIn = cmToFtIn(onboardingData.height || 170);
  const [feet, setFeet] = useState(ftIn.feet);
  const [inches, setInches] = useState(ftIn.inches);
  const [lbs, setLbs] = useState(kgToLbs(onboardingData.weight || 65));

  const handleUnitToggle = (mode) => {
    setUnitSystem(mode);
    onChangeData({ unitSystem: mode });
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

  return (
    <div className="onboarding-step-content">
      <div className="step-header">
        <h2>Let's get to know you</h2>
        <p className="muted">Enter your basic info to calculate your daily BMI, BMR, and energy targets.</p>
      </div>

      <div className="onboarding-form">
        <div className="field-row">
          <label className="field">
            <span>First Name *</span>
            <input
              type="text"
              className="input"
              placeholder="e.g. Alex"
              value={onboardingData.firstName || ''}
              onChange={(e) => onChangeData({ firstName: e.target.value })}
              required
            />
          </label>
          <label className="field">
            <span>Last Name</span>
            <input
              type="text"
              className="input"
              placeholder="e.g. Morgan"
              value={onboardingData.lastName || ''}
              onChange={(e) => onChangeData({ lastName: e.target.value })}
            />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Age *</span>
            <input
              type="number"
              className="input"
              min="5"
              max="120"
              placeholder="25"
              value={onboardingData.age || ''}
              onChange={(e) => onChangeData({ age: Number(e.target.value) })}
            />
          </label>
          <label className="field">
            <span>Gender (for BMR)</span>
            <select
              className="input"
              value={onboardingData.gender || 'Female'}
              onChange={(e) => onChangeData({ gender: e.target.value })}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Neutral">Neutral / Other</option>
            </select>
          </label>
        </div>

        <div className="field-stack">
          <div className="field-header-row">
            <span>Height & Weight Units</span>
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
                <span>Height (Feet / Inches) *</span>
                <div className="dual-input">
                  <input
                    type="number"
                    className="input"
                    min="1"
                    max="8"
                    placeholder="Ft"
                    value={feet}
                    onChange={(e) => handleFtInChange(Number(e.target.value), inches)}
                  />
                  <input
                    type="number"
                    className="input"
                    min="0"
                    max="11"
                    placeholder="In"
                    value={inches}
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
      </div>
    </div>
  );
}
