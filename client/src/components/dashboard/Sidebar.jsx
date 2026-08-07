import { Activity, Apple, BedDouble, CheckSquare, Home, Settings, ShieldCheck, UserRound } from 'lucide-react';

const links = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'exercise', label: 'Exercise', icon: Activity },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'recovery', label: 'Recovery', icon: BedDouble },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
];

export default function Sidebar({ activeView, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand-card">
        <h1>FitHub</h1>
        <p>Daily health, designed to feel simple.</p>
      </div>

      <nav className="nav-list" aria-label="Primary navigation">
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-btn ${activeView === id ? 'active' : ''}`}
            onClick={() => onSelect(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
