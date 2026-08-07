# FitHub — Development & Collaboration Documentation

**Branch Name:** `rofaz`  
**Application Architecture:** Local-First, Zero-Login Fitness & Wellness Tracker  
**Tech Stack:** React (Vite), Lucide-React Icons, Vanilla CSS Design Tokens, Web LocalStorage Cache  

---

## 1. Overview of Accomplishments & Implemented Features

This document provides complete documentation of the frontend client features, health metric formulas, UI/UX components, and incremental git commits added on branch `rofaz` in accordance with `FitHub-PDE.md` and `FitHub-UI-Spec.md`.

---

## 2. Implemented Features & Modules

### 2.1 Core Health Metrics Engine (`src/utils/healthCalculations.js`)
- **BMI (Body Mass Index):** `weightKg / (heightMeters)^2` with category classification (Underweight <18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥30).
- **BMR (Basal Metabolic Rate — Mifflin-St Jeor):**
  - Female: `10 × weight + 6.25 × height − 5 × age − 161`
  - Male: `10 × weight + 6.25 × height − 5 × age + 5`
  - Neutral: `10 × weight + 6.25 × height − 5 × age − 78`
- **TDEE (Total Daily Energy Expenditure):** `BMR × Activity Multiplier` (Sedentary: 1.2, Balanced: 1.375, Active: 1.55, High Intensity: 1.725).
- **Ideal Weight Range:** `(18.5 × heightMeters^2)` to `(24.9 × heightMeters^2)`.
- **Water Recommendation:** `weightKg × 0.033 L/day` converted to glass count.
- **Bi-directional Unit System Conversions:** Metric (cm, kg) ⇄ Imperial (ft-in, lbs).

### 2.2 3-Step Carousel Onboarding Flow (`src/components/onboarding/`)
- **Step 1 — Basic Info:** First Name, Last Name, Age, Gender selection, Height with cm/ft-in unit toggle pill, Weight with kg/lb unit toggle pill. Real-time auto-saving.
- **Step 2 — Hobbies & Interests:** Horizontal multi-select interest cards with icons (Running, Gym/Weights, Yoga, Cycling, Swimming, Sports, Home Workout, Walking, Dance, Martial Arts) with progress dots and active navy styling.
- **Step 3 — Motivation & Self-Commitment:** Goal tag selection (Lose Weight, Gain Muscle, Stay Fit, Improve Sleep, Reduce Stress), personalized agreement contract containing the user's name, commitment checkbox, and CTA button.

### 2.3 Graphical Health Overview (`src/components/dashboard/`)
- **BMI Radial Gauge Card:** SVG arc gauge with dynamic needle pointer and color-coded status badge.
- **Weight History & Trend Chart:** Dynamic bar line chart of weight entries with difference tag (+/- kg) and inline weight logger.
- **BMR & TDEE Stat Cards:** Kcal/day indicators with metabolism flame and target ring badges.
- **Ideal Weight Window Card:** Height-based min-max target range display.
- **Water Intake Tracker Card:** Interactive + / - glass counter with visual fill dots.

### 2.4 Interactive Tracking Tabs (`Exercise`, `Food`, `Sleep`)
- **3-Part Sub-Panel Structure:**
  1. `Record Log`: Quick-entry form for activities, meal macros (protein/carbs/fat), and sleep/bedtime windows.
  2. `Tracking & Trends`: Visual logs, active streaks, calorie budget progress bar vs TDEE, and sleep duration history.
  3. `Recommendations`: Personalized, rule-based recommendations tailored to user's age, goal, and selected hobbies.

### 2.5 3-State Kanban Task Manager (`src/components/taskmanager/`)
- **Status Workflows:** `To Do` ➔ `In Progress` ➔ `Completed` status cycling with single-click pills.
- **Filtering & Metrics:** Status filter pills (All, To Do, In Progress, Completed) and completion progress calculation.
- **Management:** Task creation, deletion, and strikethrough styling for completed habits.

### 2.6 Profile, Settings, and Privacy Views (`src/components/profile/`, `settings/`, `privacy/`)
- **ProfileView:** Inline profile editing, weight trend logging trigger, and live metric recalculation toast.
- **SettingsView:** Metric ⇄ Imperial unit preference toggle, reminder toggles (Sleep, Workout, Water), and **Reset App Data Confirmation Modal**.
- **PrivacyPolicyView:** Formal declaration of 100% local-first data storage (LocalStorage/Cache) with zero cloud tracking.

---

## 3. Commit History Log (Branch `rofaz`)

Below is the chronological log of git commits created during this collaboration sprint:

```text
* c1fc669 feat(ui): assemble complete dashboard layout, topbar header, navigation sidebar, and design system CSS
* fb87f1d feat(views): complete Profile editing with metrics recalculation, Settings with unit toggle & reset modal, and Privacy Policy page
* a6c144b feat(taskmanager): add 3-state Kanban workflow (To Do, In Progress, Done) with status cycling and filtering
* 4244e6f feat(tracking): implement 3-part tracking sub-panels (Record, Tracking, Recommendation) across Exercise, Food, and Sleep tabs
* 1cad74b feat(overview): add BMI gauge, BMR, TDEE, Ideal Weight Range, Water intake, and Weight Trend chart
* 74bd8b3 feat(onboarding): implement 3-step carousel onboarding flow with local-first auto-save
* 196f0e4 feat(core): implement health metrics formulas, unit conversions, and data models
```

---

## 4. Verification & Build Results

```bash
$ npm --prefix client run build

> fithub@0.0.0 build
> vite build

vite v8.2.1 building client environment for production...
transforming...✓ 1807 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-BxXVOKa9.css   23.02 kB │ gzip:  4.42 kB
dist/assets/index-CmFF1h3B.js   254.01 kB │ gzip: 76.51 kB

✓ built in 78ms
```
