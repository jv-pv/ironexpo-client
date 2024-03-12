import { NavLink } from "react-router-dom"
import Navbar from "../components/Navbar"

const HomePage = () => {
  return (
    <div>
      <Navbar/>
        <NavLink to="/websites">
            <p>Explore</p>
        </NavLink>
    </div>
  )
}

export default HomePage