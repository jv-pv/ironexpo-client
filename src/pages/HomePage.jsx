import { NavLink } from "react-router-dom"
import Navbar from "../components/Navbar"


import { useEffect } from "react"

const HomePage = () => {


  useEffect(() => {
    const app = document.getElementById('app')
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    const script = document.createElement('script');
  
    script.src = "/src/js/particle.js";
    script.async = true;

    app.appendChild(canvas)
  
    document.body.appendChild(script);

    
  
    return () => {
      app.removeChild(canvas);
      document.body.removeChild(script);
    }
  }, [])

  return (
    <>
      <Navbar/>
        <div className="home-page-container" id="app">

          
        </div>
    </>
  )
}

export default HomePage




















// import { NavLink } from "react-router-dom"
// import Navbar from "../components/Navbar"

// import { particle } from "../js/particle"



// import { useEffect, useRef } from "react"

// const HomePage = () => {

//   useEffect(() => {
//     particle()
    
  
//     return () => {
//      let app = document.getElementById('app')
//      let canvas = document.getElementById('canvas')
//      app.removeChild(canvas)

//     }
//   }, [])

//   return (
//     <div>
//       <Navbar/>
//         {/* <NavLink to="/websites">
//             <p>Explore</p>
//         </NavLink> */}
//         {/* <div className="home-page-container">


          
//         </div> */}
//         {/* <canvas id="canvas"></canvas> */}
//         {/* <script src="/src/js/particle.js"></script> */}
//     </div>
//   )
// }

// export default HomePage