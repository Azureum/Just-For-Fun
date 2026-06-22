import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import "./AppLayout.css";

const NAV_ITEMS = [
  { to: "/", label: "Overview", end: true },
  { to: "/conversations", label: "Conversations" },
  { to: "/analytics", label: "Analytics" },
  { to: "/training", label: "Training Center" },
  { to: "/personality", label: "AI Personality" },
  { to: "/locations", label: "Locations" },
  { to: "/promotions", label: "Promotions" },
  { to: "/media", label: "Media" },
  { to: "/settings", label: "Settings" },
];

export function AppLayout() {
  const { business, user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-name">{business?.name ?? "AI Host"}</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">{user?.email}</div>
          <button type="button" className="btn btn-secondary sidebar-logout" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
