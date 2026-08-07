import { useEffect, useState } from 'react';
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
import { loadAppState, resetAllData, saveAppState } from './utils/storage';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [appState, setAppState] = useState(() => loadAppState());
  const [statusMessage, setStatusMessage] = useState('Local data is ready');

  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  const updateProfile = (patch) => {
    setAppState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...patch },
    }));
    setStatusMessage('Profile updated');
  };

  const togglePreference = (key) => {
    setAppState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: !prev.preferences[key] },
    }));
    setStatusMessage('Preferences saved');
  };

  const toggleTask = (id) => {
    setAppState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    }));
  };

  const addTask = (text) => {
    if (!text.trim()) {
      return;
    }

    setAppState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { id: Date.now(), text, done: false }],
    }));
    setStatusMessage('Task added');
  };

  const toggleWorkout = (id) => {
    setAppState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) => (workout.id === id ? { ...workout, done: !workout.done } : workout)),
    }));
  };

  const toggleMeal = (id) => {
    setAppState((prev) => ({
      ...prev,
      meals: prev.meals.map((meal) => (meal.id === id ? { ...meal, done: !meal.done } : meal)),
    }));
  };

  const updateSleep = (hours) => {
    setAppState((prev) => ({
      ...prev,
      sleep: { ...prev.sleep, hours },
    }));
  };

  const updateMetric = (metric, value) => {
    setAppState((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, [metric]: value },
    }));
  };

  const toggleInterest = (interest) => {
    setAppState((prev) => {
      const interests = prev.profile.interests.includes(interest)
        ? prev.profile.interests.filter((item) => item !== interest)
        : [...prev.profile.interests, interest];

      return {
        ...prev,
        profile: { ...prev.profile, interests },
        onboarding: { ...prev.onboarding, interests },
      };
    });
  };

  const resetState = () => {
    const freshState = resetAllData();
    setAppState(freshState);
    setStatusMessage('Starter data restored');
  };

  const completedTasks = appState.tasks.filter((task) => task.done).length;
  const taskCompletion = Math.round((completedTasks / appState.tasks.length) * 100);

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
        <Header activeView={activeView} profile={appState.profile} statusMessage={statusMessage} />
        <section className="hero-card">
          <div>
            <p className="eyebrow"><Sparkles size={16} /> FitHub daily focus</p>
            <h2>{heroCopy[activeView].title}</h2>
            <p>{heroCopy[activeView].body}</p>
            <div className="hero-meta">
              <span className="badge soft">{taskCompletion}% task completion</span>
              <span className="badge soft">{appState.sleep.hours.toFixed(1)}h sleep</span>
            </div>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={() => setStatusMessage('Backend payload is ready to connect')}
          >
            Prepare sync <ArrowRight size={16} />
          </button>
        </section>

        {activeView === 'overview' && (
          <div className="dashboard-grid">
            <HealthOverview metrics={appState.metrics} profile={appState.profile} />
            <ExerciseTab workouts={appState.workouts} onToggleWorkout={toggleWorkout} />
            <FoodTab meals={appState.meals} onToggleMeal={toggleMeal} />
            <SleepTab sleep={appState.sleep} onUpdateSleep={updateSleep} />
            <TaskManager tasks={appState.tasks} onToggleTask={toggleTask} onAddTask={addTask} />
            <OnboardingFlow
              profile={appState.profile}
              onboarding={appState.onboarding}
              onUpdateProfile={updateProfile}
              onToggleInterest={toggleInterest}
            />
          </div>
        )}

        {activeView === 'exercise' && <ExerciseTab workouts={appState.workouts} onToggleWorkout={toggleWorkout} />}
        {activeView === 'nutrition' && <FoodTab meals={appState.meals} onToggleMeal={toggleMeal} />}
        {activeView === 'recovery' && <SleepTab sleep={appState.sleep} onUpdateSleep={updateSleep} />}
        {activeView === 'tasks' && <TaskManager tasks={appState.tasks} onToggleTask={toggleTask} onAddTask={addTask} />}
        {activeView === 'profile' && <ProfileView profile={appState.profile} onUpdateProfile={updateProfile} />}
        {activeView === 'settings' && <SettingsView preferences={appState.preferences} onTogglePreference={togglePreference} onResetData={resetState} />}
        {activeView === 'privacy' && <PrivacyPolicyView />}
      </main>
    </div>
  );
}
