import { useEffect, useRef } from "react";

const screens = [
  [
    { src: "/images/home-1.png", title: "BEAUTY" },
    { src: "/images/home-2.png", title: "FASHION" },
    { src: "/images/home-3.png", title: "LIFESTYLE\nGOODS" },
  ],
  [
    { src: "/images/home-4.png", title: "RESERVATION" },
    { src: "/images/home-5.png", title: "PEACE BE CITY MAP" },
    { src: "/images/home-6.png", title: "A.I OPTIMIZER" },
  ],
  [
    { src: "/images/home-7.png", title: "ONLINE SHOP" },
    { src: "/images/home-8.png", title: "" },
    { src: "/images/home-9.png", title: "ESG" },
  ],
] as const;

export function Home() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pages = root.querySelectorAll(".feed-page");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          }
        });
      },
      { root, threshold: 0.4 }
    );

    pages.forEach((page) => io.observe(page));
    return () => io.disconnect();
  }, []);

  return (
    <main className="feed" ref={rootRef}>
      {screens.map((panels, index) => (
        <div key={index} className={index === 0 ? "feed-page is-in" : "feed-page"}>
          {panels.map((panel) => (
            <section
              key={panel.src}
              className={panel.src.includes("home-8") ? "panel panel--short" : "panel"}
            >
              <img src={panel.src} alt={panel.title.replace("\n", " ")} />
              {panel.title ? (
                <h2 className="panel__title">
                  {panel.title.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
              ) : null}
            </section>
          ))}
        </div>
      ))}
    </main>
  );
}
