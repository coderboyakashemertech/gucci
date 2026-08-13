import { useEffect, useRef, useState } from "react";

export function Splash({ onSkip }: { onSkip: () => void }) {
  const [filling, setFilling] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const leavingRef = useRef(false);
  const onSkipRef = useRef(onSkip);
  onSkipRef.current = onSkip;

  function goHome() {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setFilling(true);
    rootRef.current?.classList.add("is-leaving");
    window.setTimeout(() => onSkipRef.current(), 320);
  }

  function skip() {
    if (filling) return;
    goHome();
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = root.querySelectorAll("section");
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

    sections.forEach((section) => io.observe(section));

    const scroller = root;

    function atEnd() {
      return scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 12;
    }

    function onWheel(event: WheelEvent) {
      if (event.deltaY > 24 && atEnd()) {
        goHome();
      }
    }

    let startY = 0;
    function onTouchStart(event: TouchEvent) {
      startY = event.touches[0].clientY;
    }
    function onTouchMove(event: TouchEvent) {
      const y = event.touches[0].clientY;
      if (startY - y > 56 && atEnd()) {
        goHome();
      }
    }

    root.addEventListener("wheel", onWheel, { passive: true });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      io.disconnect();
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <main className="splash" ref={rootRef}>
      <section className="splash-hero is-in">
        <img src="/images/splash.png" alt="" />
        <div className="splash__copy">
          <h1>SARAH FRIENDS</h1>
          <p>In the Peace be City</p>
        </div>
        <button type="button" className={filling ? "skip is-filling" : "skip"} onClick={skip}>
          skip
        </button>
      </section>

      <section className="splash-story">
        <img src="/images/splash-1.png" alt="" />
        <div className="splash-story__text">
          <h2>Peace be City</h2>
          <p>
            Peace be City is a fashion utopia where anyone can be stylish. Designers, students,
            and travelers share the same streets. A wheelchair designer shows a new collection.
            A CEO in a hijab walks the runway. Dummy copy for this first scroll section — replace
            with the final Peace be City story later.
          </p>
        </div>
      </section>

      <section className="splash-story splash-story--banner">
        <div className="splash-story__banner">
          <img src="/images/splash-2.png" alt="SARAH" />
        </div>
        <div className="splash-story__text">
          <p>
            From the top 1% of Peace be City. Daughter of a CEO and a fashion-company mother.
            She started her own PR firm as a high-school influencer and now runs luxury fashion
            events, shows, and sponsorships. Perfectionist, goal-driven, and passionate wherever
            she goes.
          </p>
          <div className="splash-story__split">
            <img src="/images/portrait.png" alt="SARAH" />
            <p>
              From the top 1% of Peace be City. Daughter of a CEO and a fashion-company mother.
              She started her own PR firm as a high-school influencer and now runs luxury fashion
              events, shows, and sponsorships. Perfectionist, goal-driven, and passionate wherever
              she goes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
