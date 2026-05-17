import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navMain = [
    { icon: <HomeIcon />, label: "Dashboard", to: "/dashboard" },
    { icon: <SwapIcon />, label: "Requests", to: "/requests" },
    { icon: <UserIcon />, label: "Profile", to: "/profile" },
  ];

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "SK";

  return (
    <aside className="ss-sidebar">
      {/* Header */}
      <div className="ss-sidebar-header">
        <Link to="/dashboard" className="ss-sidebar-brand">
          <div className="ss-sidebar-brand-icon">⇄</div>
          <span className="ss-sidebar-brand-name">SkillSwap</span>
        </Link>
      </div>

      {/* Nav */}
      <div className="ss-sidebar-content">
        <nav className="ss-nav">
          <p className="ss-nav-label">Platform</p>
          {navMain.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`ss-nav-item ${location.pathname === item.to ? "ss-nav-item--active" : ""}`}
            >
              <span className="ss-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <nav className="ss-nav ss-nav--bottom">
          <p className="ss-nav-label">Account</p>
          <button className="ss-nav-item ss-nav-item--btn" onClick={handleLogout}>
            <span className="ss-nav-icon"><LogoutIcon /></span>
            <span>Log out</span>
          </button>
        </nav>
      </div>

      {/* Footer */}
      <div className="ss-sidebar-footer">
        <Link to="/profile" className="ss-sidebar-user">
          <div className="ss-sidebar-user-avatar">{initials}</div>
          <div className="ss-sidebar-user-info">
            <span className="ss-sidebar-user-name">{user?.name || "My Profile"}</span>
            <span className="ss-sidebar-user-email">{user?.email || "View profile"}</span>
          </div>
          <span className="ss-sidebar-user-chevron">⋯</span>
        </Link>
      </div>
    </aside>
  );
};

// Icons
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const SwapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 23-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default Sidebar;