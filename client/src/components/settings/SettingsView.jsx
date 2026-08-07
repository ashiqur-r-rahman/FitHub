import { useState } from 'react';
import { Settings, ShieldAlert, Bell, Sliders, RotateCcw } from 'lucide-react';

export default function SettingsView({ preferences = {}, profile = {}, onUpdateProfile, onTogglePreference, onResetData }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const unitSystem = profile.unitSystem || preferences.unitSystem || 'metric';

  const handleUnitToggle = (mode) => {
    onUpdateProfile({ unitSystem: mode });
    if (onTogglePreference) {
      onTogglePreference('unitSystem', mode);
    }
  };

  const handleConfirmReset = () => {
    setShowConfirmModal(false);
    onResetData();
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <Settings size={22} />
        <div>
          <h2>App Settings</h2>
          <p className="muted">Manage units, notification preferences, and local data storage.</p>
        </div>
      </div>

      <div className="settings-stack">
        {/* Unit System Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Sliders size={18} />
            <div>
              <h4>Unit Preferences</h4>
              <p className="subtext">Choose your preferred unit system for height, weight, and distances.</p>
            </div>
          </div>
          <div className="unit-toggle-group">
            <button
              type="button"
              className={`toggle-option ${unitSystem === 'metric' ? 'active' : ''}`}
              onClick={() => handleUnitToggle('metric')}
            >
              Metric (cm / kg)
            </button>
            <button
              type="button"
              className={`toggle-option ${unitSystem === 'imperial' ? 'active' : ''}`}
              onClick={() => handleUnitToggle('imperial')}
            >
              Imperial (ft-in / lbs)
            </button>
          </div>
        </div>

        {/* Reminders & Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Bell size={18} />
            <div>
              <h4>Daily Reminders & Nudges</h4>
              <p className="subtext">Local browser reminders to stay on top of daily health routines.</p>
            </div>
          </div>
          <div className="toggle-list">
            <div className="toggle-row">
              <span>Sleep & Bedtime Reminder</span>
              <button
                type="button"
                className={`switch ${preferences.sleepReminder ? 'active' : ''}`}
                onClick={() => onTogglePreference('sleepReminder')}
              >
                <span className="switch-handle" />
              </button>
            </div>
            <div className="toggle-row">
              <span>Workout & Exercise Reminder</span>
              <button
                type="button"
                className={`switch ${preferences.workoutReminder ? 'active' : ''}`}
                onClick={() => onTogglePreference('workoutReminder')}
              >
                <span className="switch-handle" />
              </button>
            </div>
            <div className="toggle-row">
              <span>Water Intake Hydration Nudge</span>
              <button
                type="button"
                className={`switch ${preferences.waterReminder ? 'active' : ''}`}
                onClick={() => onTogglePreference('waterReminder')}
              >
                <span className="switch-handle" />
              </button>
            </div>
          </div>
        </div>

        {/* Data Reset Section */}
        <div className="settings-card danger-zone">
          <div className="settings-card-header">
            <ShieldAlert size={18} className="danger-icon" />
            <div>
              <h4>Reset Local App Data</h4>
              <p className="subtext">Permanently wipe all locally cached profile, logs, and task data and restart onboarding.</p>
            </div>
          </div>
          <button
            type="button"
            className="danger-btn-outline"
            onClick={() => setShowConfirmModal(true)}
          >
            <RotateCcw size={16} /> Reset App Data...
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-icon">⚠️</div>
            <h3>Reset All Local Data?</h3>
            <p>This action will permanently erase all your saved workouts, meal logs, sleep history, and task entries stored in this browser cache. You will be returned to onboarding.</p>
            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button type="button" className="danger-btn" onClick={handleConfirmReset}>Yes, Reset Everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
