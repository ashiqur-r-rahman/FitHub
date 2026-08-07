import { GOAL_OPTIONS } from '../../utils/initialData';

export default function StepCommitment({ onboardingData, onChangeData, onCompleteOnboarding }) {
  const fullName = `${onboardingData.firstName || 'Friend'} ${onboardingData.lastName || ''}`.trim();
  const selectedGoal = onboardingData.goal || 'Stay Fit';
  const isAgreed = Boolean(onboardingData.commitmentAgreed);

  return (
    <div className="onboarding-step-content">
      <div className="step-header">
        <h2>Make it a promise</h2>
        <p className="muted">This is your commitment, not ours. Taking responsibility is step one of wellness.</p>
      </div>

      <div className="commitment-section">
        <label className="field-label">Select Primary Wellness Goal</label>
        <div className="goal-pills">
          {GOAL_OPTIONS.map((g) => (
            <button
              key={g}
              type="button"
              className={`goal-pill ${selectedGoal === g ? 'active' : ''}`}
              onClick={() => onChangeData({ goal: g })}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="commitment-card">
          <div className="commitment-header">
            <span className="quill-icon">✍️</span>
            <strong>Personal Self-Commitment Agreement</strong>
          </div>
          <p className="commitment-text">
            “I, <strong>{fullName}</strong>, commit to tracking my health honestly, honoring my daily rest & workout habits, and taking consistent action to achieve my goal to <strong>{selectedGoal}</strong>.”
          </p>
        </div>

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => onChangeData({ commitmentAgreed: e.target.checked })}
          />
          <span>I agree to commit to my health and wellness goals</span>
        </label>

        <button
          type="button"
          className="cta-primary-btn"
          disabled={!isAgreed || !onboardingData.firstName}
          onClick={onCompleteOnboarding}
        >
          Let's Get Started →
        </button>
      </div>
    </div>
  );
}
