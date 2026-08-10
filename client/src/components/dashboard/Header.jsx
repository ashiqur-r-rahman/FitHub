export default function Header({ profile, onSelectView }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const firstName = profile?.firstName || profile?.name?.split(' ')[0] || 'Friend';

  return (
    <header className="topbar-container">
      <div className="greeting-block">
        <h2>{getGreeting()}, {firstName} 👋</h2>
        <p className="date-subtext">{formattedDate}</p>
      </div>

      <div className="topbar-right-actions">
        <button
          type="button"
          className="profile-avatar-btn"
          title="View Profile"
          onClick={() => onSelectView('profile')}
        >
          <span className="avatar-initials">{firstName.charAt(0)}</span>
        </button>
      </div>
    </header>
  );
}
