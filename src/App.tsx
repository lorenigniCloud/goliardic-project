import "./App.css";

import { AnimatedLink } from "./components/Link/Animated.Link";
import ArrowButton from "./components/Buttons/ArrowButton";
import { LoadingButton } from "./components/Buttons/LoadingButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Component Showcase</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <p> </p>
          <div>
            <h2>Animated Link</h2>
            <AnimatedLink href="https://example.com" color="#61dafb">
              Hover me to see animation
            </AnimatedLink>
          </div>

          <div>
            <h2>Arrow Button</h2>
            <ArrowButton text="Click me" textColorOnHover="#61dafb" />
          </div>

          <div>
            <h2>Loading Button</h2>
            <LoadingButton size={100} strokeWidth={3} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
