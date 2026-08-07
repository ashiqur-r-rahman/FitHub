# FitHub — Frontend Collaboration & Contribution Report

**Project:** FitHub (Local-First Personal Fitness & Wellness Tracker)  
**Branch:** `rofaz`  
**Collaborator Name:** Md. Rofaz Hasan Rafiu  
**GitHub Account:** [ashiqur-r-rahman](https://github.com/ashiqur-r-rahman)  
**GitHub Repository:** [github.com/ashiqur-r-rahman/FitHub](https://github.com/ashiqur-r-rahman/FitHub)  
**Branch Link:** [github.com/ashiqur-r-rahman/FitHub/tree/rofaz](https://github.com/ashiqur-r-rahman/FitHub/tree/rofaz)  

---

## 1. Executive Summary

This document serves as the collaboration handover for work completed on branch **`rofaz`**. Based on the project specifications (`FitHub-PDE.md` and `FitHub-UI-Spec.md`), the entire frontend client application has been built, tested, documented, and pushed to GitHub across structured git commits with full local-first data caching and zero-backend dependency.

---

## 2. Implemented Code Modules & Engineering Deliverables

### 2.1 Health Metrics & Unit Engine
**File:** [src/utils/healthCalculations.js](file:///Users/md.rofazhasanrafiu/coding/FitHub/client/src/utils/healthCalculations.js)  
- **BMI (Body Mass Index):** `weightKg / (heightMeters)^2` mapped to 4 category zones (*Underweight*, *Normal*, *Overweight*, *Obese*).
- **BMR (Basal Metabolic Rate — Mifflin-St Jeor):** Gender-aware rest energy expenditure calculation.
- **TDEE (Total Daily Energy Expenditure):** Calorie target scaling based on activity multiplier.
- **Ideal Weight Range:** `BMI 18.5 – 24.9` height window.
- **Water Recommendation:** `weightKg × 0.033 L` converted to daily glass targets.
- **Unit Conversions:** Bi-directional Metric (cm, kg) ⇄ Imperial (ft-in, lbs) helpers.

### 2.2 3-Step Carousel Onboarding Flow
**Directory:** [src/components/onboarding/](file:///Users/md.rofazhasanrafiu/coding/FitHub/client/src/components/onboarding/)  
- **StepBasicInfo.jsx:** Name, age, gender, height (cm/ft-in unit toggle pill), weight (kg/lb unit toggle pill) with instant local auto-saving.
- **StepInterests.jsx:** Multi-select interactive interest cards with icons (*Running*, *Gym/Weights*, *Yoga*, *Cycling*, *Swimming*, *Sports*, *Home Workout*, *Walking*, *Dance*, *Martial Arts*).
- **StepCommitment.jsx:** Wellness goal tag pills, personalized commitment contract containing the user's name, agreement checkbox, and final CTA button.

### 2.3 Graphical Health Overview
**Directory:** [src/components/dashboard/](file:///Users/md.rofazhasanrafiu/coding/FitHub/client/src/components/dashboard/)  
- **BmiGauge.jsx:** SVG arc gauge with dynamic needle pointer and color-coded status badge.
- **WeightTrendChart.jsx:** Interactive bar/line chart showing weight history entries, difference tag (+/- kg), and inline weight logger.
- **HealthOverview.jsx:** Container displaying BMI, BMR, TDEE, Ideal Weight Range, and interactive Water Tracker (`+` / `-` glass buttons).

### 2.4 Interactive Tracking Tabs (`Exercise`, `Food`, `Sleep`)
Each tab features a 3-subpanel architecture (`Record` form | `Tracking` visual trends & streaks | `Recommendation` rule-based tips):
- **ExerciseTab.jsx:** Workout logging (duration, intensity, calories), active streak counter, and hobby-tailored workout suggestions.
- **FoodTab.jsx:** Meal & macro logging (protein/carbs/fat), calorie budget progress bar vs TDEE, and nutrition tips.
- **SleepTab.jsx:** Bedtime & wake time calculation, 7-day sleep duration chart, quality rating, and bedtime window recommendations.

### 2.5 3-State Kanban Task Manager
**File:** [src/components/taskmanager/TaskManager.jsx](file:///Users/md.rofazhasanrafiu/coding/FitHub/client/src/components/taskmanager/TaskManager.jsx)  
- **Workflow:** Single-click status cycling between `To Do` ➔ `In Progress` ➔ `Completed`.
- **Filtering:** Status view filters (`All`, `To Do`, `In Progress`, `Done`), category tags, completion percentage, and task deletion.

### 2.6 Profile, Settings & Privacy Views
- **ProfileView.jsx:** Inline profile editing, weight history logging trigger, and metric recalculation toast.
- **SettingsView.jsx:** Metric ⇄ Imperial unit preference toggle, daily reminder switches, and **Reset App Data Confirmation Modal**.
- **PrivacyPolicyView.jsx:** Local-first data declaration explaining LocalStorage caching and zero-cloud tracking.

### 2.7 UI System & Responsive Styling
**Files:** [src/App.css](file:///Users/md.rofazhasanrafiu/coding/FitHub/client/src/App.css), [src/index.css](file:///Users/md.rofazhasanrafiu/coding/FitHub/client/src/index.css)  
- Implemented deep navy `#0B1F3A`, steel blue `#3A5A8C`, sky blue `#7FA8D9`, pale blue `#DCE8F7`, and white `#FFFFFF` design tokens.
- Desktop 3-column grid (Sidebar ~220px, Center fluid, Task Manager ~320px) with mobile responsive layouts.

---

## 3. Git Commit History & Collaboration Activity (Branch `rofaz`)

| Commit Hash | Commit Message | Scope / Key Changes |
|---|---|---|
| `2c16533` | `docs: add merge conflict resolution details to documentation` | Added conflict resolution notes to documentation |
| `fd2d9a0` | `fix(merge): resolve merge conflict in README.md on rofaz branch` | Resolved merge conflict in README.md |
| `4f03e8b` | `feat(readme): update header on rofaz-feature-conflict branch` | Conflicting header update on temporary branch |
| `7b0192e` | `feat(readme): update title format on rofaz branch` | Title format change on rofaz branch |
| `aeb1ae1` | `docs: update README with FitHub project details on rofaz branch` | Added project features overview to README.md |
| `6f51932` | `docs: add comprehensive project documentation and commit history for branch rofaz` | Created DOCUMENTATION.md |
| `c1fc669` | `feat(ui): assemble complete dashboard layout, topbar header, navigation sidebar, and design system CSS` | Assembled main layout, topbar, sidebar, App.css |
| `fb87f1d` | `feat(views): complete Profile editing with metrics recalculation, Settings with unit toggle & reset modal, and Privacy Policy page` | Profile, Settings with unit toggle & reset modal, Privacy policy |
| `a6c144b` | `feat(taskmanager): add 3-state Kanban workflow (To Do, In Progress, Done) with status cycling and filtering` | TaskManager with 3-state Kanban status cycling |
| `4244e6f` | `feat(tracking): implement 3-part tracking sub-panels (Record, Tracking, Recommendation) across Exercise, Food, and Sleep tabs` | Exercise, Food, and Sleep tracking sub-panels |
| `1cad74b` | `feat(overview): add BMI gauge, BMR, TDEE, Ideal Weight Range, Water intake, and Weight Trend chart` | HealthOverview, BmiGauge, WeightTrendChart |
| `74bd8b3` | `feat(onboarding): implement 3-step carousel onboarding flow with local-first auto-save` | 3-step Onboarding flow |
| `196f0e4` | `feat(core): implement health metrics formulas, unit conversions, and data models` | Health calculations formulas & data structures |

---

## 4. Merge Conflict & Resolution Summary

To demonstrate collaborative Git conflict handling:
1. **Conflict Creation:** Parallel edits were introduced to line 1 of `README.md` on branch `rofaz`.
2. **Conflict Detection:** Git flagged a content conflict (`CONFLICT (content): Merge conflict in README.md`).
3. **Resolution:** Merged conflicting titles into `# FitHub — Personal Fitness & Wellness Tracker (Branch: rofaz)`, staged `README.md`, and committed resolution as `fd2d9a0`.
4. **Push:** Pushed cleanly to `origin/rofaz` on GitHub.

---

## 5. Build & Verification Status

```bash
$ npm --prefix client run build

vite v8.2.1 building client environment for production...
transforming...✓ 1807 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-BxXVOKa9.css   23.02 kB │ gzip:  4.42 kB
dist/assets/index-CmFF1h3B.js   254.01 kB │ gzip: 76.51 kB

✓ built in 78ms
```
