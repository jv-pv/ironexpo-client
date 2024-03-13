import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { API_URL } from "/src/services/API_URL.jsx"
import axios from "axios";
import Navbar from "../components/Navbar";


const WebsiteDetailsPage = () => {

  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const { websiteId } = useParams()
  const navigate = useNavigate()

  const fetchWebsiteDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites/${websiteId}`)
      setSelectedWebsite(response.data)
    } catch (error) {
      console.error("Could not fetch selected website", error)
    }
  }

  useEffect(() => {
    fetchWebsiteDetails()
  }, [websiteId])

  const deleteProject = () => {
    axios.delete(`${API_URL}/websites/${websiteId}`)
    .then((response) => {
      navigate("/websites")
    })
  }

  return (
    <>
    <Navbar websiteId={websiteId}/>
    {selectedWebsite ? (
    <div className="flex flex-col justify-center gap-10 items-center w-full h-full flex-1 p-4">
    <div className="container">
      <div className="browser-nav">

        <div className="dots">

          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>

        </div>

        <div className="url-bar">
          <input type="text" defaultValue={selectedWebsite.url} readOnly/>
        </div>


      </div>

        <div className="iframe-container">
          <iframe src={selectedWebsite?.url}></iframe>
        </div>

    </div>

    <div className="w-full max-w-[750px] h-full text-blue-50" style={{textAlign: selectedWebsite.description.length > 100 ? "left" : "center"}}>
      {selectedWebsite.description}
    </div>

    <div className="flex items-center justify-center gap-4 w-full">
      {selectedWebsite.technologies.map((site, index) => (
         <span className="tech-tag" key={index}>{site}</span>
      ))
      }
    </div>

    <div className=" flex justify-center items-center gap-8 w-[250px] h-auto">
      
      <NavLink to={`/websites/edit/${websiteId}`}>
        <button className="bg-blue-600 text-blue-50 rounded-2xl px-3 py-1">Edit</button>
      </NavLink>

      <button className="bg-red-600 text-blue-50 rounded-2xl px-3 py-1" onClick={deleteProject}>Delete</button>

    </div>

  </div>
  ) : (
    <p>...Loading</p>
  )}

    
    </>
  );
};

export default WebsiteDetailsPage;