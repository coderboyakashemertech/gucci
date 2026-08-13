import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/search", label: "search", icon: "search" },
  { to: "/camera", label: "AI Camera", icon: "camera" },
  { to: "/tag", label: "Tag", icon: "tag" },
  { to: "/my", label: "My", icon: "my" },
] as const;

function Icon({ name }: { name: (typeof tabs)[number]["icon"] }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6">
        <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
        <circle cx="12" cy="13" r="3.2" />
        <path d="M8.2 8.2c.9-1.6 2.2-2.4 3.8-2.4s2.9.8 3.8 2.4" />
        <path d="M6.4 6.8c1.3-2.2 3.3-3.3 5.6-3.3s4.3 1.1 5.6 3.3" />
        <path d="M12 8.2v.01" />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6">
        <path d="M7 16.5c2.6-1.4 4.4-3.6 5-6.7" />
        <path d="M7 12.8c3.2-1.2 5.6-3.4 6.6-6.8" />
        <path d="M7 9.2c3.6-.8 6.2-2.6 7.4-5.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="stage">
      <div className="device">
        <div className="device-screen">
          <div className="scroll">{children}</div>
          <nav className="tabbar" aria-label="Primary">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.to === "/"}
                className={({ isActive }) => (isActive ? "tab is-active" : "tab")}
              >
                <span className="tab__icon">
                  <Icon name={tab.icon} />
                </span>
                <span className="tab__label">{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
