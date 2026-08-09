<div align="center">

# 🏋️ FitHub

**A local-first personal fitness & wellness tracker — no account, no cloud, no compromise.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Branch](https://img.shields.io/badge/Branch-rofaz-orange?style=flat-square&logo=git&logoColor=white)](https://github.com/ashiqur-r-rahman/FitHub/tree/rofaz)

</div>

---

## Overview

FitHub is a **zero-login, privacy-first** fitness web application. All your health data lives exclusively in your browser's `localStorage` — no server, no database, no tracking. Open the app, enter your metrics, and instantly get actionable health insights and a full suite of tracking tools.

---

## ✨ Features

### 🧮 Health Metrics Engine
Powered by clinically recognized formulas — all calculated client-side in real time.

| Metric | Formula / Method |
|---|---|
| **BMI** | `weight(kg) / height(m)²` → 4-zone classification |
| **BMR** | Mifflin-St Jeor (gender-aware) |
| **TDEE** | BMR × activity multiplier |
| **Ideal Weight Range** | BMI 18.5 – 24.9 back-calculated per height |
| **Daily Water Intake** | `weight(kg) × 0.033 L` |
| **Unit System** | Full Metric ⇄ Imperial bi-directional conversion |

---

### 🚀 3-Step Onboarding Carousel
A smooth, guided setup experience that auto-saves progress locally at every step.

1. **Basic Info** — Name, age, gender, height & weight with live unit-toggle pills
2. **Interests** — 10 interactive activity cards *(Running, Gym, Yoga, Cycling, Swimming, Sports, Home Workout, Walking, Dance, Martial Arts)*
3. **Commitment** — Personalized wellness goal pills, a commitment contract with your name, and a final agreement CTA

---

### 📊 Graphical Health Dashboard

- **BMI Gauge** — SVG arc gauge with animated needle pointer and color-coded status badge
- **Weight Trend Chart** — Interactive bar/line chart with logged history, inline weight entry, and ±kg difference tags
- **Stat Cards** — BMI, BMR, TDEE, Ideal Weight Range, and an interactive Water Intake tracker with `+` / `−` glass controls

---

### 🏃 Tracking Tabs

Each of the three tabs features a **Record → Tracking → Recommendation** sub-panel architecture:

| Tab | Record | Tracking | Recommendation |
|---|---|---|---|
| **Exercise** | Workout type, duration, intensity, calories | Active streak counter, history log | Hobby-tailored workout suggestions |
| **Food** | Meal name, macros (protein/carbs/fat), calories | Calorie budget progress vs. TDEE | Nutrition & meal planning tips |
| **Sleep** | Bedtime & wake time entry, quality rating | 7-day sleep duration chart | Optimal sleep window guidance |

---

### ✅ Kanban Task Manager
A 3-state task board for managing your fitness goals:

```
To Do  ──►  In Progress  ──►  Completed
```

- Single-click status cycling
- Filter by status (`All`, `To Do`, `In Progress`, `Done`)
- Category tags, completion percentage, and task deletion

---

### ⚙️ Profile, Settings & Privacy

- **Profile** — Inline editing with on-save metric recalculation toast
- **Settings** — Metric ⇄ Imperial toggle, daily reminder switches, and a data-reset confirmation modal
- **Privacy Policy** — Transparent local-first data declaration; zero cloud, zero cookies

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [Lucide React](https://lucide.dev/) | Icon library |
| [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Client-side data persistence |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Fast JavaScript linter |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/ashiqur-r-rahman/FitHub.git
cd FitHub

# 2. Install dependencies
npm --prefix client install

# 3. Start the development server
npm --prefix client run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Lint source files
npm --prefix client run lint

# Build for production
npm --prefix client run build

# Preview production build locally
npm --prefix client run preview
```

### Production Build Output

```
vite v8.2.1 building for production...
✓ 1807 modules transformed.

dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-BxXVOKa9.css   23.02 kB │ gzip:  4.42 kB
dist/assets/index-CmFF1h3B.js   254.01 kB │ gzip: 76.51 kB

✓ built in 78ms
```

---

## 📁 Project Structure

```
FitHub/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/        # BmiGauge, WeightTrendChart, HealthOverview
│   │   │   ├── onboarding/       # StepBasicInfo, StepInterests, StepCommitment
│   │   │   ├── taskmanager/      # TaskManager (Kanban board)
│   │   │   └── tracking/         # ExerciseTab, FoodTab, SleepTab
│   │   ├── utils/
│   │   │   └── healthCalculations.js   # All health metric formulas
│   │   ├── App.css               # Design system & layout tokens
│   │   └── index.css             # Global styles
│   ├── package.json
│   └── vite.config.js
├── DOCUMENTATION.md              # Full collaboration & commit report
└── README.md
```

---

## 🔒 Privacy

FitHub is designed with **privacy by default**:

- ✅ All data stored in `localStorage` on your device
- ✅ No user accounts, no sign-up required
- ✅ No network requests for your personal data
- ✅ Full reset via **Settings → Reset App Data**

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## Contributors

This project was developed collaboratively. All contributors are credited equally.

| Name | GitHub |
|---|---|
| Ashiqur Rahman | [@ashiqur-r-rahman](https://github.com/ashiqur-r-rahman) |
| Talha Jubair | [@TalhaJubair35](https://github.com/TalhaJubair35) |
| Md. Rofaz Hasan Rafiu | [@rofazhasan](https://github.com/rofazhasan) |

---

## License

This project is licensed under the **MIT License**.
