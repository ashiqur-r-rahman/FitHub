import React from 'react';
import StepBasicInfo from './StepBasicInfo';
import StepInterests from './StepInterests';
import StepCommitment from './StepCommitment';

export default function OnboardingFlow() {
  return (
    <div>
      <h2>OnboardingFlow Component</h2>
      <StepBasicInfo />
      <StepInterests />
      <StepCommitment />
    </div>
  );
}
