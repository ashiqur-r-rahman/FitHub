import StepBasicInfo from './StepBasicInfo';
import StepInterests from './StepInterests';
import StepCommitment from './StepCommitment';

export default function OnboardingFlow() {
  return (
    <section className="section-card full">
      <div className="section-heading">
        <h3>Onboarding checklist</h3>
        <span className="muted">Personalize your experience</span>
      </div>
      <div className="card-grid">
        <StepBasicInfo />
        <StepInterests />
        <StepCommitment />
      </div>
    </section>
  );
}
