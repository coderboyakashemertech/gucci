import { useState } from "react";

const tabs = [
  { label: "Home", icon: "home" },
  { label: "Search", icon: "search" },
  { label: "AI Camera", icon: "camera" },
  { label: "Tag", icon: "tag" },
  { label: "My", icon: "my" },
] as const;

function Icon({ name }: { name: (typeof tabs)[number]["icon"] }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
        <path d="M4 11.2 12 4.2 20 11.2V20a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 20z" />
        <path d="M10 21.4v-6.2h4v6.2" />
        <path d="M10.4 16.4h3.2" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="11" cy="11" r="6.4" />
        <path d="m16.2 16.2 4.2 4.2" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round">
        <rect x="3.2" y="7.4" width="17.6" height="12.4" rx="2.2" />
        <circle cx="12" cy="13.6" r="3.2" />
        <path d="M8.4 7.4 9.6 4.8h4.8L15.6 7.4" />
        <path
          fill="currentColor"
          stroke="none"
          d="M19.2 3.2 20 5.2l2 0.8-2 0.8-0.8 2-0.8-2-2-0.8 2-0.8z"
        />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
        <path d="M8 5.2H5.2V8" />
        <path d="M16 5.2h2.8V8" />
        <path d="M8 18.8H5.2V16" />
        <path d="M16 18.8h2.8V16" />
        <path d="M16.4 8.6c1.6 0.4 2.8 1.4 3.4 2.8" />
        <path d="M16.4 11c1 .3 1.7 1 2.1 2" />
        <path d="M16.6 13.2c.5.2.9.6 1.1 1.1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M5.4 20c1.1-3.4 3.4-5.1 6.6-5.1s5.5 1.7 6.6 5.1" />
    </svg>
  );
}

export function TabBar({
  active,
  onHome,
}: {
  active: "splash" | "home";
  onHome: () => void;
}) {
  const [filled, setFilled] = useState<string | null>(null);

  function press(label: string, action?: () => void) {
    setFilled(label);
    window.setTimeout(() => {
      action?.();
      window.setTimeout(() => setFilled(null), 200);
    }, 380);
  }

  return (
    <nav className="tabbar" aria-label="Primary">
      {tabs.map((tab) => {
        const isHome = tab.icon === "home";
        return (
          <button
            key={tab.label}
            type="button"
            className={`tab${isHome && active === "home" ? " is-active" : ""}${
              filled === tab.label ? " is-filling" : ""
            }`}
            onClick={() => press(tab.label, isHome ? onHome : undefined)}
          >
            <span className="tab__icon">
              <Icon name={tab.icon} />
            </span>
            <span className="tab__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
