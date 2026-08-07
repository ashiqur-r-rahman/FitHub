// Initial Data Presets & Default App State

export const HOBBY_OPTIONS = [
  { id: 'running', label: 'Running', icon: '🏃' },
  { id: 'weights', label: 'Gym/Weights', icon: '🏋️' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
  { id: 'cycling', label: 'Cycling', icon: '🚴' },
  { id: 'swimming', label: 'Swimming', icon: '🏊' },
  { id: 'sports', label: 'Sports (Football/Cricket/Basketball)', icon: '⚽' },
  { id: 'home', label: 'Home Workout', icon: '🏠' },
  { id: 'walking', label: 'Walking', icon: '🚶' },
  { id: 'dance', label: 'Dance', icon: '💃' },
  { id: 'martial', label: 'Martial Arts', icon: '🥋' },
];

export const GOAL_OPTIONS = [
  'Lose Weight',
  'Gain Muscle',
  'Stay Fit',
  'Improve Sleep',
  'Reduce Stress',
];

export const DEFAULT_APP_STATE = {
  onboardingCompleted: true,
  profile: {
    firstName: 'Maya',
    lastName: 'Patel',
    name: 'Maya Patel',
    age: 28,
    gender: 'Female',
    height: 165, // cm
    weight: 62, // kg
    unitSystem: 'metric', // metric or imperial
    goal: 'Gain Muscle',
    activityLevel: 'Balanced',
    interests: ['weights', 'yoga', 'running'],
    commitmentAgreed: true,
    createdAt: new Date().toISOString(),
  },
  preferences: {
    unitSystem: 'metric',
    reminders: true,
    sleepReminder: true,
    workoutReminder: true,
    waterReminder: true,
    weeklySummaries: true,
    focusMode: false,
  },
  weightHistory: [
    { id: 1, date: '2026-08-01', weight: 64.2 },
    { id: 2, date: '2026-08-03', weight: 63.5 },
    { id: 3, date: '2026-08-05', weight: 62.8 },
    { id: 4, date: '2026-08-07', weight: 62.0 },
  ],
  tasks: [
    { id: 1, text: 'Morning 20-minute brisk walk', status: 'done', createdAt: '2026-08-07', dueDate: 'Today' },
    { id: 2, text: 'Meal prep high-protein lunch', status: 'in_progress', createdAt: '2026-08-07', dueDate: 'Today' },
    { id: 3, text: 'Hydrate 2.5L water throughout day', status: 'todo', createdAt: '2026-08-07', dueDate: 'Today' },
    { id: 4, text: '30-min Evening Strength Session', status: 'todo', createdAt: '2026-08-07', dueDate: 'Today' },
  ],
  workouts: [
    { id: 1, date: '2026-08-07', title: 'Upper Body Hypertrophy', type: 'Gym/Weights', durationMin: 45, intensity: 'High', caloriesBurned: 320, done: true },
    { id: 2, date: '2026-08-07', title: 'Sunset Jogging', type: 'Running', durationMin: 30, intensity: 'Moderate', caloriesBurned: 240, done: false },
    { id: 3, date: '2026-08-06', title: 'Vinyasa Flow Yoga', type: 'Yoga', durationMin: 25, intensity: 'Low', caloriesBurned: 110, done: true },
  ],
  meals: [
    { id: 1, date: '2026-08-07', mealType: 'Breakfast', title: 'Greek Yogurt with Oats & Berries', calories: 420, protein: 28, carbs: 45, fat: 12, done: true },
    { id: 2, date: '2026-08-07', mealType: 'Lunch', title: 'Grilled Salmon Bowl & Quinoa', calories: 650, protein: 42, carbs: 55, fat: 22, done: true },
    { id: 3, date: '2026-08-07', mealType: 'Dinner', title: 'Chicken Breast & Roasted Asparagus', calories: 520, protein: 48, carbs: 20, fat: 14, done: false },
  ],
  sleep: {
    hours: 7.8,
    target: 8.0,
    sleepTime: '23:00',
    wakeTime: '06:48',
    quality: 4, // 1 to 5
    logs: [
      { id: 1, date: 'Mon', hours: 7.2, quality: 4 },
      { id: 2, date: 'Tue', hours: 6.8, quality: 3 },
      { id: 3, date: 'Wed', hours: 8.1, quality: 5 },
      { id: 4, date: 'Thu', hours: 7.5, quality: 4 },
      { id: 5, date: 'Fri', hours: 7.8, quality: 4 },
    ],
  },
  waterIntake: {
    consumedGlasses: 5,
    targetGlasses: 8,
  },
  metrics: {
    steps: 8420,
    energy: 84,
    mood: 'Focused',
  },
  onboarding: {
    step: 1,
    firstName: '',
    lastName: '',
    age: 25,
    gender: 'Female',
    height: 165,
    weight: 60,
    interests: [],
    goal: 'Stay Fit',
    commitmentAgreed: false,
  },
};
