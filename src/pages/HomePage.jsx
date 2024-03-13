import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/src/js/particles.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page-container">
        <canvas id="canvas"></canvas>
        <div className="home-page-content">
          <div className="hero-text">
            <h1>IronHack</h1>
          </div>
          <div className="hero-subtitle">
            <h1>Web Development Expo</h1>
            <NavLink to="/websites">
              <p className="bg-blue-600 text-blue-50 rounded-2xl px-3 py-1">Explore</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;