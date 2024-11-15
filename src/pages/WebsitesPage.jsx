import { useEffect, useContext } from "react";
import { WebsiteContext } from "../context/website.context";
import WebsiteCardFull from "../components/WebsiteCardFull";

const WebsitesPage = () => {
  const { websites, fetchWebsites } = useContext(WebsiteContext);

  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <div className="website-grid mx-3 mt-2 mb-2 z-10">
      {/* {websites && websites.length > 0 ? (
        websites?.map((website) => (
          <WebsiteCardFull key={website.id} website={website} />
        ))
      ) : (
        <p>No websites found</p>
      )} */}
    </div>
  );
};

export default WebsitesPage;
