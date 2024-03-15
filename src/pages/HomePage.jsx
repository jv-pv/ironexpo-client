import { useEffect } from "react";
import WebsitesPage from "./WebsitesPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    {/* <canvas id="canvas"></canvas> */}
      <Header/>
      <WebsitesPage/>
      <Footer/>
    </>
  );
};

export default HomePage;