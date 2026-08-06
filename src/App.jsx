import React from 'react';
import Header from './components/dashboard/Header';
import Sidebar from './components/dashboard/Sidebar';
import HealthOverview from './components/dashboard/HealthOverview';
import ExerciseTab from './components/dashboard/ExerciseTab';
import FoodTab from './components/dashboard/FoodTab';
import SleepTab from './components/dashboard/SleepTab';
import TaskManager from './components/taskmanager/TaskManager';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import ProfileView from './components/profile/ProfileView';
import SettingsView from './components/settings/SettingsView';
import PrivacyPolicyView from './components/privacy/PrivacyPolicyView';

export default function App() {
  return (
    <div className="app-container">
      <h1>FitHub</h1>
      <Sidebar />
      <Header />
      <HealthOverview />
      <ExerciseTab />
      <FoodTab />
      <SleepTab />
      <TaskManager />
      <OnboardingFlow />
      <ProfileView />
      <SettingsView />
      <PrivacyPolicyView />
    </div>
  );
}
