import { LayoutDashboard, UserRound, Settings, ShieldCheck } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
];

export default function Sidebar({ activeView, onSelectView }) {
  return (
    <aside className="deep-navy-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon-box">⚡</div>
        <div className="brand-text">
          <h1>FitHub</h1>
          <span className="brand-tagline">Local-First Health</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main Navigation">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              type="button"
              className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectView(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="cache-status-indicator">
          <span className="pulse-dot" />
          <span>Local Storage Active</span>
        </div>
      </div>
    </aside>
  );
}
