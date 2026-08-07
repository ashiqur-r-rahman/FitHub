import { Flame, FlameKind, Droplets, Scale, Target, Activity } from 'lucide-react';
import BmiGauge from './BmiGauge';
import WeightTrendChart from './WeightTrendChart';
import {
  calculateBMR,
  calculateTDEE,
  calculateIdealWeightRange,
  calculateWaterRecommendation,
  kgToLbs,
} from '../../utils/healthCalculations';

export default function HealthOverview({ profile, weightHistory, waterIntake, onUpdateWater, onAddWeight }) {
  const height = profile?.height || 170;
  const weight = profile?.weight || 65;
  const age = profile?.age || 25;
  const gender = profile?.gender || 'Female';
  const activityLevel = profile?.activityLevel || 'Balanced';
  const unitSystem = profile?.unitSystem || 'metric';

  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const idealRange = calculateIdealWeightRange(height);
  const waterRec = calculateWaterRecommendation(weight);

  const consumedGlasses = waterIntake?.consumedGlasses || 5;
  const targetGlasses = waterRec.glasses;

  const displayWeight = (kg) => (unitSystem === 'imperial' ? `${kgToLbs(kg)} lbs` : `${kg} kg`);

  return (
    <section className="health-overview-section">
      <div className="section-title-row">
        <div>
          <h3>Graphical Health Overview</h3>
          <p className="muted">Calculated automatically from your local profile data</p>
        </div>
        <div className="profile-chip">
          <span>{profile?.name || 'User'}</span>
          <span className="dot-divider">•</span>
          <span>{gender}, {age} y/o</span>
        </div>
      </div>

      <div className="overview-cards-grid">
        {/* BMI Gauge */}
        <BmiGauge weight={weight} height={height} />

        {/* Weight Trend Chart */}
        <WeightTrendChart
          weightHistory={weightHistory}
          currentWeight={weight}
          unitSystem={unitSystem}
          onAddWeight={onAddWeight}
        />

        {/* BMR Card */}
        <div className="overview-card stat-card">
          <div className="stat-icon-wrapper bmr-icon">
            <Flame size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Basal Metabolic Rate (BMR)</span>
            <div className="stat-value">{bmr.toLocaleString()} <span className="stat-unit">kcal/day</span></div>
            <p className="stat-sub">Minimum calories burned at rest</p>
          </div>
        </div>

        {/* TDEE Card */}
        <div className="overview-card stat-card">
          <div className="stat-icon-wrapper tdee-icon">
            <Target size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Daily Calorie Target (TDEE)</span>
            <div className="stat-value">{tdee.toLocaleString()} <span className="stat-unit">kcal/day</span></div>
            <p className="stat-sub">Based on {activityLevel.toLowerCase()} activity</p>
          </div>
        </div>

        {/* Ideal Weight Range */}
        <div className="overview-card stat-card">
          <div className="stat-icon-wrapper range-icon">
            <Scale size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Ideal Weight Range</span>
            <div className="stat-value">
              {displayWeight(idealRange.minKg)} – {displayWeight(idealRange.maxKg)}
            </div>
            <p className="stat-sub">BMI 18.5 – 24.9 target window</p>
          </div>
        </div>

        {/* Water Intake Tracker */}
        <div className="overview-card stat-card water-card">
          <div className="stat-icon-wrapper water-icon">
            <Droplets size={22} />
          </div>
          <div className="stat-content">
            <div className="water-header">
              <span className="stat-label">Water Intake Recommendation</span>
              <span className="water-target-pill">{waterRec.liters} L/day</span>
            </div>

            <div className="water-counter-row">
              <button
                type="button"
                className="counter-btn"
                onClick={() => onUpdateWater(Math.max(0, consumedGlasses - 1))}
              >
                −
              </button>
              <div className="water-value">
                <strong>{consumedGlasses}</strong> / {targetGlasses} <span className="unit">glasses</span>
              </div>
              <button
                type="button"
                className="counter-btn"
                onClick={() => onUpdateWater(consumedGlasses + 1)}
              >
                +
              </button>
            </div>

            <div className="glasses-progress-bar">
              {Array.from({ length: targetGlasses }).map((_, i) => (
                <div key={i} className={`glass-dot ${i < consumedGlasses ? 'filled' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
