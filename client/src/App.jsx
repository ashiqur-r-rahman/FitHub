import { useEffect, useState } from 'react';
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
  const [activeView, setActiveView] = useState('dashboard'); // dashboard | profile | settings | privacy
  const [activeTrackingTab, setActiveTrackingTab] = useState('exercise'); // exercise | food | sleep
  const [appState, setAppState] = useState(() => loadAppState());
  const [toastMessage, setToastMessage] = useState(null);
  const [isRetakingOnboarding, setIsRetakingOnboarding] = useState(false);

  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Profile Updates
  const handleUpdateProfile = (patch) => {
    setAppState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...patch },
      onboarding: { ...prev.onboarding, ...patch },
    }));
  };

  // Onboarding Completion
  const handleCompleteOnboarding = () => {
    const ob = appState.onboarding || {};
    const fullName = `${ob.firstName || 'User'} ${ob.lastName || ''}`.trim();
    setAppState((prev) => ({
      ...prev,
      onboardingCompleted: true,
      profile: {
        ...prev.profile,
        firstName: ob.firstName || prev.profile.firstName || 'User',
        lastName: ob.lastName || prev.profile.lastName || '',
        name: fullName,
        age: ob.age || prev.profile.age || 25,
        gender: ob.gender || prev.profile.gender || 'Female',
        height: ob.height || prev.profile.height || 170,
        weight: ob.weight || prev.profile.weight || 65,
        goal: ob.goal || prev.profile.goal || 'Stay Fit',
        interests: ob.interests?.length > 0 ? ob.interests : prev.profile.interests,
        commitmentAgreed: ob.commitmentAgreed,
      },
    }));
    setIsRetakingOnboarding(false);
    showToast('Welcome to FitHub! Your health metrics are ready.');
  };

  const handleUpdateOnboardingData = (patch) => {
    setAppState((prev) => ({
      ...prev,
      onboarding: { ...prev.onboarding, ...patch },
    }));
  };

  const handleToggleOnboardingInterest = (id) => {
    setAppState((prev) => {
      const current = prev.onboarding?.interests || [];
      const updated = current.includes(id) ? current.filter((i) => i !== id) : [...current, id];
      return {
        ...prev,
        onboarding: { ...prev.onboarding, interests: updated },
      };
    });
  };

  // Health Data Updates
  const handleAddWeight = (weightVal) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: Number(weightVal),
    };
    setAppState((prev) => ({
      ...prev,
      profile: { ...prev.profile, weight: Number(weightVal) },
      weightHistory: [...(prev.weightHistory || []), newEntry],
    }));
    showToast(`Logged new weight: ${weightVal} kg`);
  };

  const handleUpdateWater = (glasses) => {
    setAppState((prev) => ({
      ...prev,
      waterIntake: { ...prev.waterIntake, consumedGlasses: glasses },
    }));
  };

  // Workout Logs
  const handleAddWorkout = (workout) => {
    setAppState((prev) => ({
      ...prev,
      workouts: [workout, ...prev.workouts],
    }));
    showToast('Workout log recorded!');
  };

  const handleToggleWorkout = (id) => {
    setAppState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((w) => (w.id === id ? { ...w, done: !w.done } : w)),
    }));
  };

  // Meal Logs
  const handleAddMeal = (meal) => {
    setAppState((prev) => ({
      ...prev,
      meals: [meal, ...prev.meals],
    }));
    showToast('Meal log recorded!');
  };

  const handleToggleMeal = (id) => {
    setAppState((prev) => ({
      ...prev,
      meals: prev.meals.map((m) => (m.id === id ? { ...m, done: !m.done } : m)),
    }));
  };

  // Sleep Logs
  const handleUpdateSleep = (sleepObj) => {
    setAppState((prev) => ({
      ...prev,
      sleep: { ...prev.sleep, ...sleepObj },
    }));
    showToast('Sleep entry saved!');
  };

  const handleAddSleepLog = (sleepLog) => {
    setAppState((prev) => ({
      ...prev,
      sleep: {
        ...prev.sleep,
        logs: [...(prev.sleep.logs || []), sleepLog],
      },
    }));
  };

  // Task Manager
  const handleAddTask = (text, category = 'General') => {
    const newTask = {
      id: Date.now(),
      text,
      status: 'todo',
      done: false,
      category,
      createdAt: new Date().toISOString(),
    };
    setAppState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
    showToast('New task added');
  };

  const handleToggleTask = (id) => {
    setAppState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done, status: t.done ? 'todo' : 'done' } : t
      ),
    }));
  };

  const handleChangeTaskStatus = (id, newStatus) => {
    setAppState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus, done: newStatus === 'done' } : t
      ),
    }));
  };

  const handleDeleteTask = (id) => {
    setAppState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
    showToast('Task deleted');
  };

  // Settings Preferences & Reset
  const handleTogglePreference = (key, val) => {
    setAppState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: val !== undefined ? val : !prev.preferences[key],
      },
    }));
    showToast('Preferences updated');
  };

  const handleResetData = () => {
    const fresh = resetAllData();
    setAppState(fresh);
    showToast('All local data wiped. Returned to onboarding.');
  };

  // First Visit Check
  if (!appState.onboardingCompleted || isRetakingOnboarding) {
    return (
      <OnboardingFlow
        onboardingData={appState.onboarding || {}}
        onChangeData={handleUpdateOnboardingData}
        onToggleInterest={handleToggleOnboardingInterest}
        onCompleteOnboarding={handleCompleteOnboarding}
        isModal={isRetakingOnboarding}
        onCloseModal={isRetakingOnboarding ? () => setIsRetakingOnboarding(false) : undefined}
      />
    );
  }

  return (
    <div className="fithub-app-shell">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span className="toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Navigation Sidebar */}
      <Sidebar activeView={activeView} onSelectView={setActiveView} />

      {/* Center Main Panel */}
      <main className="main-content-panel">
        <Header
          profile={appState.profile}
          onSelectView={setActiveView}
          onRetakeOnboarding={() => setIsRetakingOnboarding(true)}
        />

        {activeView === 'dashboard' && (
          <div className="dashboard-content-area">
            {/* Top Overview Section */}
            <HealthOverview
              profile={appState.profile}
              weightHistory={appState.weightHistory || []}
              waterIntake={appState.waterIntake}
              onUpdateWater={handleUpdateWater}
              onAddWeight={handleAddWeight}
            />

            {/* Tracking Tabs Switcher */}
            <section className="tracking-tabs-wrapper">
              <div className="main-tab-switcher">
                <button
                  type="button"
                  className={`main-tab-btn ${activeTrackingTab === 'exercise' ? 'active' : ''}`}
                  onClick={() => setActiveTrackingTab('exercise')}
                >
                  🏋️ Exercise Tab
                </button>
                <button
                  type="button"
                  className={`main-tab-btn ${activeTrackingTab === 'food' ? 'active' : ''}`}
                  onClick={() => setActiveTrackingTab('food')}
                >
                  🥗 Food Tab
                </button>
                <button
                  type="button"
                  className={`main-tab-btn ${activeTrackingTab === 'sleep' ? 'active' : ''}`}
                  onClick={() => setActiveTrackingTab('sleep')}
                >
                  🌙 Sleep Tab
                </button>
              </div>

              <div className="tab-pane-content">
                {activeTrackingTab === 'exercise' && (
                  <ExerciseTab
                    workouts={appState.workouts}
                    profile={appState.profile}
                    onAddWorkout={handleAddWorkout}
                    onToggleWorkout={handleToggleWorkout}
                  />
                )}
                {activeTrackingTab === 'food' && (
                  <FoodTab
                    meals={appState.meals}
                    profile={appState.profile}
                    onAddMeal={handleAddMeal}
                    onToggleMeal={handleToggleMeal}
                  />
                )}
                {activeTrackingTab === 'sleep' && (
                  <SleepTab
                    sleep={appState.sleep}
                    profile={appState.profile}
                    onUpdateSleep={handleUpdateSleep}
                    onAddSleepLog={handleAddSleepLog}
                  />
                )}
              </div>
            </section>
          </div>
        )}

        {activeView === 'profile' && (
          <ProfileView
            profile={appState.profile}
            onUpdateProfile={handleUpdateProfile}
            onAddWeight={handleAddWeight}
            onShowToast={showToast}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView
            preferences={appState.preferences}
            profile={appState.profile}
            onUpdateProfile={handleUpdateProfile}
            onTogglePreference={handleTogglePreference}
            onResetData={handleResetData}
          />
        )}

        {activeView === 'privacy' && <PrivacyPolicyView />}
      </main>

      {/* Right Task Manager Sidebar */}
      <aside className="task-manager-sidebar">
        <TaskManager
          tasks={appState.tasks || []}
          onToggleTask={handleToggleTask}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onChangeTaskStatus={handleChangeTaskStatus}
        />
      </aside>
    </div>
  );
}
