import StepBasicInfo from './StepBasicInfo';

export default function OnboardingFlow({ onboardingData, onChangeData, onCompleteOnboarding, isModal = false, onCloseModal }) {
  return (
    <div className={`onboarding-container ${isModal ? 'modal-mode' : 'fullscreen-mode'}`}>
      <div className="onboarding-card">
        <div className="onboarding-progress-header">
          <div className="brand-badge">⚡ FitHub Quick Setup</div>
          {isModal && onCloseModal && (
            <button type="button" className="close-btn" onClick={onCloseModal}>✕</button>
          )}
        </div>

        <div className="step-body-container">
          <StepBasicInfo
            onboardingData={onboardingData}
            onChangeData={onChangeData}
            onCompleteOnboarding={onCompleteOnboarding}
          />
        </div>
      </div>
    </div>
  );
}
