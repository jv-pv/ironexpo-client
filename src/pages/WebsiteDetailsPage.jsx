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
      navigate("/")
    })
  }

  return (
    <>
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
          <a href={selectedWebsite.url} target="_blank" className="url-bar">
            <input type="text" defaultValue={selectedWebsite.url} className="cursor-pointer" readOnly/>
          </a>
        </div>


      </div>

        <div className="iframe-container">
          <iframe src={selectedWebsite?.url}></iframe>
        </div>

    </div>

    <div className="w-full max-w-[800px] h-full text-blue-50">
      {selectedWebsite.description}
    </div>

    <div className="flex items-center justify-start gap-4 w-full max-w-[800px]">
      {selectedWebsite.technologies.map((site, index) => (
         <span className="tech-tag" key={index}>{site}</span>
      ))
      }
    </div>

    <div className="text-white w-[800px] flex items-center justify-between">
      <p>Published: {selectedWebsite.publishDate}</p>
    <div className=" flex justify-end items-center gap-8 w-[250px] h-auto">
      
      <NavLink to={`/websites/edit/${websiteId}`}>
        <button className="bg-gray-700 text-blue-50 rounded-full w-12 h-12 hover:scale-110 transition-transform flex items-center justify-center"><img src="/page-edit.svg" alt="edit-button" /></button>
      </NavLink>

      <button className="bg-yellow-600 text-blue-50 rounded-full w-12 h-12 hover:scale-110 transition-transform" onClick={deleteProject}>X</button>

    </div>
    </div>


  </div>
  ) : (
    <p>...Loading</p>
  )}

    
    </>
  );
};

export default WebsiteDetailsPage;