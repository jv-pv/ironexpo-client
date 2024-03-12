import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import {API_URL} from "/src/services/API_URL.jsx"
import axios from "axios";
import WebsitesPage from "./WebsitesPage";
import Navbar from "../components/Navbar";


const WebsiteDetailsPage = () => {

  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const { websiteId } = useParams()

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
          <input type="text" defaultValue={selectedWebsite.url}/>
        </div>


      </div>

        <div className="iframe-container">
          <iframe src={selectedWebsite?.url}></iframe>
        </div>

    </div>

    <div>
      <a href={selectedWebsite.url}>{selectedWebsite.url}</a>
    </div>

    <div className="description">
      {selectedWebsite.description}
    </div>

    <div className="tech-tags">
      {selectedWebsite.technologies.map((site, index) => (
         <span className="tech-tag" key={index}>{site}</span>
      ))
      }
    </div>

  </div>
  ) : (
    <p>...Loading</p>
  )}

    
    </>
  );
};

export default WebsiteDetailsPage;
