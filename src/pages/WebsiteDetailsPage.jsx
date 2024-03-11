import { useContext, useEffect } from "react";
import { WebsiteContext } from "../context/website.context";
import { useParams } from 'react-router-dom'


const WebsiteDetailsPage = () => {

  const { selectedWebsite, fetchWebsiteDetails } = useContext(WebsiteContext)

  const { websiteId } = useParams()

  useEffect(() => {
    fetchWebsiteDetails(websiteId)
  }, [websiteId])
  
  return (
    <div className="flex flex-col justify-center items-center w-full h-full flex-1 p-4">
      <div className="container">
        <div className="browser-nav">

          <div className="dots">

            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>

          </div>

          <div className="url-bar">
            <input type="text" defaultValue={selectedWebsite?.url}/>
          </div>


        </div>

          {/* <div className="iframe-container">
            <iframe src={selectedWebsite?.url} frameborder="0"></iframe>
          </div> */}

      </div>


      <div className="description">
        <p>{selectedWebsite?.description}</p>
      </div>

    </div>
  );
};

export default WebsiteDetailsPage;
