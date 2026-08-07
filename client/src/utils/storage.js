// Local Storage Utilities

import { DEFAULT_APP_STATE } from './initialData';

const STORAGE_KEY = 'fithub-app-state-v1';

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
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : DEFAULT_APP_STATE.tasks,
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : DEFAULT_APP_STATE.workouts,
      meals: Array.isArray(parsed.meals) ? parsed.meals : DEFAULT_APP_STATE.meals,
      sleep: { ...DEFAULT_APP_STATE.sleep, ...(parsed.sleep || {}) },
      metrics: { ...DEFAULT_APP_STATE.metrics, ...(parsed.metrics || {}) },
      onboarding: { ...DEFAULT_APP_STATE.onboarding, ...(parsed.onboarding || {}) },
    };
  } catch (error) {
    console.warn('Unable to parse saved FitHub state', error);
    return DEFAULT_APP_STATE;
  }
};

export const saveAppState = (state) => {
  const storage = getStorage();

  if (!storage) {
    return state;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
};

export const getStoredProfile = () => loadAppState().profile;

export const saveProfile = (profile) => {
  const state = loadAppState();
  const nextState = { ...state, profile };
  return saveAppState(nextState);
};

export const createBackendPayload = (state) => ({
  profile: state.profile,
  preferences: state.preferences,
  tasks: state.tasks,
  workouts: state.workouts,
  meals: state.meals,
  sleep: state.sleep,
  metrics: state.metrics,
});

export const resetAllData = () => {
  const storage = getStorage();

  if (storage) {
    storage.removeItem(STORAGE_KEY);
  }

  return DEFAULT_APP_STATE;
};
