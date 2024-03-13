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
      </div>
    </>
  );
};

export default HomePage;