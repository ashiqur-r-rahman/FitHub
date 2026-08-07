// Local Storage Utilities for FitHub Local-First Architecture

import { DEFAULT_APP_STATE } from './initialData';

const STORAGE_KEY = 'fithub-app-state-v2';

const getStorage = () => (typeof window !== 'undefined' ? window.localStorage : null);

export const loadAppState = () => {
  const storage = getStorage();

  if (!storage) {
    return DEFAULT_APP_STATE;
  }

  try {
    const saved = storage.getItem(STORAGE_KEY);

    if (!saved) {
      return DEFAULT_APP_STATE;
    }

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_APP_STATE,
      ...parsed,
      profile: { ...DEFAULT_APP_STATE.profile, ...(parsed.profile || {}) },
      preferences: { ...DEFAULT_APP_STATE.preferences, ...(parsed.preferences || {}) },
      weightHistory: Array.isArray(parsed.weightHistory) ? parsed.weightHistory : DEFAULT_APP_STATE.weightHistory,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : DEFAULT_APP_STATE.tasks,
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : DEFAULT_APP_STATE.workouts,
      meals: Array.isArray(parsed.meals) ? parsed.meals : DEFAULT_APP_STATE.meals,
      sleep: { ...DEFAULT_APP_STATE.sleep, ...(parsed.sleep || {}) },
      waterIntake: { ...DEFAULT_APP_STATE.waterIntake, ...(parsed.waterIntake || {}) },
      metrics: { ...DEFAULT_APP_STATE.metrics, ...(parsed.metrics || {}) },
      onboarding: { ...DEFAULT_APP_STATE.onboarding, ...(parsed.onboarding || {}) },
    };
  } catch (error) {
    console.warn('Unable to parse saved FitHub state, falling back to defaults', error);
    return DEFAULT_APP_STATE;
  }
};

export const saveAppState = (state) => {
  const storage = getStorage();

  if (!storage) {
    return state;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
  return state;
};

export const resetAllData = () => {
  const storage = getStorage();

  if (storage) {
    storage.removeItem(STORAGE_KEY);
    // Also remove v1 key if present
    storage.removeItem('fithub-app-state-v1');
  }

  return {
    ...DEFAULT_APP_STATE,
    onboardingCompleted: false,
    profile: {
      firstName: '',
      lastName: '',
      name: '',
      age: 25,
      gender: 'Female',
      height: 170,
      weight: 65,
      unitSystem: 'metric',
      goal: 'Stay Fit',
      interests: [],
      commitmentAgreed: false,
    },
  };
};
