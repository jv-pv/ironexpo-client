import { NavLink, useLocation } from "react-router-dom";

const Navbar = ({ websiteId }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isWebsitesPage = location.pathname === "/websites";
  const isPublishPage = location.pathname === "/websites/publish";
  const isWebsiteDetailsPage =
    location.pathname.startsWith("/websites/") && !isPublishPage;
  const isEditWebsiteDetailsPage = location.pathname.startsWith("/websites/edit/");

  return (
    <>
      {isWebsiteDetailsPage && !isEditWebsiteDetailsPage && (
        <NavLink to="/" className="group">
          <div className="nav-btn fixed top-32 left-10 rounded-full bg-red-500 h-32 w-32 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 z-50">
            <span className="animate-spin-slow">🔙</span>
          </div>
        </NavLink>
      )}

      {!isPublishPage && !isEditWebsiteDetailsPage && (
        <NavLink to="/websites/publish" className="group">
          <div className="nav-btn fixed top-10 right-10 rounded-full bg-lime-500 h-32 w-32 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 z-50 mix-blend-difference">
            <span className="animate-spin-slow group-hover:opacity-0 transition-opacity duration-300">🚀</span>
            <span className="absolute text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">Publish</span>
          </div>
        </NavLink>
      )}
    </>
  );
};

export default Navbar;