import { TabBar } from "./components/TabBar";
import { Home } from "./pages/Home";
import { Splash } from "./pages/Splash";
import { useEffect, useState } from "react";

const App = () => {
  const [screen, setScreen] = useState<"splash" | "home">("splash");

  useEffect(() => {
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    document.documentElement.classList.toggle("is-mobile", mobile);
  }, []);

  return (
    <div className="stage">
      <div className="phone">
        <span className="phone__btn phone__btn--silent" aria-hidden />
        <span className="phone__btn phone__btn--vol-up" aria-hidden />
        <span className="phone__btn phone__btn--vol-down" aria-hidden />
        <span className="phone__btn phone__btn--power" aria-hidden />
        <div className="phone__screen">
          {/* <div className="phone__island" aria-hidden>
            <span className="phone__lens" />
          </div> */}
          <div className="app">
            {screen === "splash" ? <Splash onSkip={() => setScreen("home")} /> : <Home />}
            <TabBar active={screen} onHome={() => setScreen("home")} />
          </div>
          <div className="phone__home" aria-hidden />
        </div>
      </div>
    </div>
  );
};

export default App;
