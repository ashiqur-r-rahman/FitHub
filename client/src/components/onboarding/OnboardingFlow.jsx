import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import StepBasicInfo from './StepBasicInfo';
import StepInterests from './StepInterests';
import StepCommitment from './StepCommitment';

export default function OnboardingFlow({ onboardingData, onChangeData, onToggleInterest, onCompleteOnboarding, isModal = false, onCloseModal }) {
  const [currentStep, setCurrentStep] = useState(1);

  const canProceedStep1 = Boolean(onboardingData.firstName?.trim() && onboardingData.age > 0 && onboardingData.height > 0 && onboardingData.weight > 0);
  const canProceedStep2 = Array.isArray(onboardingData.interests) && onboardingData.interests.length > 0;

  const handleNext = () => {
    if (currentStep === 1 && !canProceedStep1) return;
    if (currentStep === 2 && !canProceedStep2) return;
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={`onboarding-container ${isModal ? 'modal-mode' : 'fullscreen-mode'}`}>
      <div className="onboarding-card">
        {/* Header Progress Bar */}
        <div className="onboarding-progress-header">
          <div className="brand-badge">FitHub Onboarding</div>
          <div className="step-dots">
            <div className={`dot ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className="line" />
            <div className={`dot ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className="line" />
            <div className={`dot ${currentStep >= 3 ? 'active' : ''}`}>3</div>
          </div>
          {isModal && onCloseModal && (
            <button type="button" className="close-btn" onClick={onCloseModal}>✕</button>
          )}
        </div>

        {/* Step Body */}
        <div className="step-body-container">
          {currentStep === 1 && (
            <StepBasicInfo onboardingData={onboardingData} onChangeData={onChangeData} />
          )}
          {currentStep === 2 && (
            <StepInterests selectedInterests={onboardingData.interests || []} onToggleInterest={onToggleInterest} />
          )}
          {currentStep === 3 && (
            <StepCommitment onboardingData={onboardingData} onChangeData={onChangeData} onCompleteOnboarding={onCompleteOnboarding} />
          )}
        </div>

        {/* Footer Navigation */}
        <div className="onboarding-footer">
          {currentStep > 1 ? (
            <button type="button" className="secondary-btn icon-left" onClick={handleBack}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 && (
            <button
              type="button"
              className="primary-btn icon-right"
              disabled={(currentStep === 1 && !canProceedStep1) || (currentStep === 2 && !canProceedStep2)}
              onClick={handleNext}
            >
              Next Step <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
