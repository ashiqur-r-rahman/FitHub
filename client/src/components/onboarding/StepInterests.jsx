import { HOBBY_OPTIONS } from '../../utils/initialData';

export default function StepInterests({ selectedInterests = [], onToggleInterest }) {
  return (
    <div className="onboarding-step-content">
      <div className="step-header">
        <h2>What do you enjoy?</h2>
        <p className="muted">Pick as many activities as you like — we will tailor your daily exercise and food recommendations.</p>
      </div>

      <div className="interests-grid">
        {HOBBY_OPTIONS.map((item) => {
          const isSelected = selectedInterests.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`interest-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggleInterest(item.id)}
            >
              <span className="interest-icon">{item.icon}</span>
              <span className="interest-label">{item.label}</span>
              {isSelected && <span className="check-badge">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="selection-counter">
        <span>{selectedInterests.length} activit{selectedInterests.length === 1 ? 'y' : 'ies'} selected</span>
        {selectedInterests.length === 0 && <span className="warning-text">(Please select at least 1)</span>}
      </div>
    </div>
  );
}
