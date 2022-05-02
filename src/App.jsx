import { useState, useEffect } from "react";
import { Home } from "./components/home";

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Home data={landingPageData.Home} />
      <div className="social-btn">
        <a href="https://discord.gg/tJHDyf9n">
          <img src="./img/discord.png" className="social-icon" alt="discord" />
        </a>
      </div>
    </div>
  );
};

export default App;
