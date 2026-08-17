import { useEffect, useState } from "react";

const tabs = [
  { label: "Home", icon: "home" },
  { label: "Search", icon: "search" },
  { label: "Camera", icon: "camera" },
  { label: "Gucci Tag", icon: "tag" },
  { label: "My", icon: "my" },
] as const;

function Icon({ name }: { name: (typeof tabs)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.55",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M4.2 11.1 12 4.4l7.8 6.7V19.4A1.4 1.4 0 0 1 18.4 20.8H5.6A1.4 1.4 0 0 1 4.2 19.4z" />
        <path d="M9.6 20.8v-6h4.8v6" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.2" />
        <path d="m16.1 16.1 4.2 4.2" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg {...common}>
        <path d="M8.2 7.2 9.4 5h5.2l1.2 2.2h2.6A1.6 1.6 0 0 1 20 8.8v9A1.6 1.6 0 0 1 18.4 19.4H5.6A1.6 1.6 0 0 1 4 17.8v-9A1.6 1.6 0 0 1 5.6 7.2z" />
        <circle cx="12" cy="13.2" r="3.1" />
      </svg>
    );
  }
  if (name === "tag") {
    return (
      <svg {...common}>
        <path d="M8.2 5.4H5.6V8" />
        <path d="M15.8 5.4h2.6V8" />
        <path d="M8.2 18.6H5.6V16" />
        <path d="M15.8 18.6h2.6V16" />
        <path d="M16.2 9.1c1.5.5 2.6 1.5 3.1 2.9" />
        <path d="M16.2 11.4c.9.3 1.6 1 2 1.9" />
        <path d="M16.4 13.6c.45.2.8.55 1 1" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8.4" r="3.15" />
      <path d="M5.6 19.6c1.05-3.15 3.25-4.8 6.4-4.8s5.35 1.65 6.4 4.8" />
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
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const app = document.querySelector(".app");
    if (!app) return;

    setHidden(false);
    let timer = 0;
    function onScroll() {
      setHidden(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setHidden(false), 280);
    }

    app.addEventListener("scroll", onScroll, true);
    return () => {
      app.removeEventListener("scroll", onScroll, true);
      window.clearTimeout(timer);
    };
  }, [active]);

  function press(label: string, action?: () => void) {
    setFilled(label);
    window.setTimeout(() => {
      action?.();
      window.setTimeout(() => setFilled(null), 200);
    }, 380);
  }

  return (
    <nav className={hidden ? "tabbar is-hidden" : "tabbar"} aria-label="Primary">
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
