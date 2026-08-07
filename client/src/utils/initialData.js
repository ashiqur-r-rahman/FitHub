// Initial Data Presets

export const HOBBY_OPTIONS = ['Strength', 'Yoga', 'Running', 'Meditation', 'Cycling'];
export const GOAL_OPTIONS = ['Build strength', 'Improve recovery', 'Lose weight', 'Boost energy', 'Stay consistent'];

export const DEFAULT_APP_STATE = {
  profile: {
    name: 'Maya Patel',
    age: 29,
    height: 165,
    weight: 62,
    goal: 'Build strength',
    activityLevel: 'Balanced',
    interests: ['Strength', 'Meditation'],
  },
  preferences: {
    reminders: true,
    weeklySummaries: false,
    focusMode: true,
  },
  tasks: [
    { id: 1, text: 'Complete a 20-minute walk', done: true },
    { id: 2, text: 'Prep lunch for tomorrow', done: false },
    { id: 3, text: 'Write 3 gratitude notes', done: false },
  ],
  workouts: [
    { id: 1, title: 'Upper body strength', details: '45 min • 3 rounds', done: true },
    { id: 2, title: 'Mobility flow', details: '20 min • recovery focus', done: false },
  ],
  meals: [
    { id: 1, title: 'Breakfast', details: 'Greek yogurt, berries, nuts', tag: 'Protein', done: true },
    { id: 2, title: 'Lunch', details: 'Salmon bowl with greens', tag: 'Fiber', done: false },
  ],
  sleep: {
    hours: 7.8,
    target: 8,
    quality: 'Rested',
  },
  metrics: {
    steps: 8420,
    water: 2.1,
    energy: 84,
    mood: 'Focused',
  },
  onboarding: {
    interests: ['Strength', 'Meditation'],
  },
};
