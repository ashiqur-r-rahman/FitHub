import { Bell, Search } from 'lucide-react';

export default function Header({ activeView }) {
  const labels = {
    overview: 'Dashboard',
    exercise: 'Exercise',
    nutrition: 'Nutrition',
    recovery: 'Recovery',
    tasks: 'Tasks',
    profile: 'Profile',
    settings: 'Settings',
    privacy: 'Privacy',
  };

  return (
    <header className="topbar">
      <div>
        <h2>{labels[activeView]}</h2>
        <p>Welcome back, Maya. You are on track.</p>
      </div>
      <div className="topbar-actions">
        <button type="button" className="icon-btn" aria-label="Search">
          <Search size={18} />
        </button>
        <button type="button" className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
