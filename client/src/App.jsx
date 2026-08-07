import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('overview');

  const heroCopy = {
    overview: {
      title: 'Your wellness dashboard is ready.',
      body: 'Track workouts, meals, recovery, and momentum in one calm, motivating place.',
    },
    exercise: {
      title: 'Stay consistent with your training plan.',
      body: 'Review your weekly sessions and keep your momentum flowing.',
    },
    nutrition: {
      title: 'Fuel your day with smarter choices.',
      body: 'Balance protein, hydration, and energy with a simple meal rhythm.',
    },
    recovery: {
      title: 'Recovery matters just as much as effort.',
      body: 'Make sleep and recovery part of your performance strategy.',
    },
    tasks: {
      title: 'Turn goals into daily action.',
      body: 'Keep your focus on the next best step and make progress visible.',
    },
    profile: {
      title: 'Your profile is your foundation.',
      body: 'Personalize your goals, preferences, and wellness priorities.',
    },
    settings: {
      title: 'Make FitHub feel like your own.',
      body: 'Adjust reminders and preferences to fit your routine.',
    },
    privacy: {
      title: 'Your data stays protected.',
      body: 'Review the privacy approach and take comfort in your control.',
    },
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onSelect={setActiveView} />
      <main className="main-panel">
        <Header activeView={activeView} />
        <section className="hero-card">
          <div>
            <p className="eyebrow"><Sparkles size={16} /> FitHub daily focus</p>
            <h2>{heroCopy[activeView].title}</h2>
            <p>{heroCopy[activeView].body}</p>
          </div>
          <button type="button" className="primary-btn">
            View plan <ArrowRight size={16} />
          </button>
        </section>

        {activeView === 'overview' && (
          <div className="dashboard-grid">
            <HealthOverview />
            <ExerciseTab />
            <FoodTab />
            <SleepTab />
            <TaskManager />
            <OnboardingFlow />
          </div>
        )}

        {activeView === 'exercise' && <ExerciseTab />}
        {activeView === 'nutrition' && <FoodTab />}
        {activeView === 'recovery' && <SleepTab />}
        {activeView === 'tasks' && <TaskManager />}
        {activeView === 'profile' && <ProfileView />}
        {activeView === 'settings' && <SettingsView />}
        {activeView === 'privacy' && <PrivacyPolicyView />}
      </main>
    </div>
  );
}
