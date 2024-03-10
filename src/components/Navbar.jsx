import { NavLink, useLocation } from "react-router-dom";
import IronHackLogo from "/src/assets/ironhack-logo.jpg";

const Navbar = () => {

    const location = useLocation();
    const isWebsitesPage = location.pathname === "/websites";

    return (
    <header className="bg-gray-300 h-16 w-full">

        <div className="flex items-center w[90%] mx-auto max-w-[1600px] h-full px-4">

            <NavLink to="/">
                <div className="flex items-center">
                    <img src={IronHackLogo} alt="IronHack Logo" className="w-12 rounded-full"></img>
                    <h1 className="ml-3 text-2xl text-blue-500">Expo</h1>
                </div>
            </NavLink>


            <nav className="flex items-center justify-end w-full mx-w-[400px] flex-[2]">
                <ul className="flex justify-end gap-4 w-4">
                    {isWebsitesPage && (
                        <NavLink to="/websites/publish">
                            <li className="block bg-blue-600 text-blue-200 rounded-2xl px-3 py-1">Publish</li>
                        </NavLink>
                    )}
                    <NavLink to="/about">
                        <li className="block bg-blue-600 text-blue-200 rounded-2xl px-3 py-1">About</li>
                    </NavLink>
                </ul>
            </nav>

        </div>
    </header>
    )
}

export default Navbar

// w-[95%] max-w-[112rem]