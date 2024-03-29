
const PublishPreviewCard = ({ newWebsite }) => (
  <div className="col-start-6 col-end-12 self-center flex flex-col justify-start gap-8">
    <div className="preview-container ">
      <div className="browser-nav">
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="url-bar">
          {newWebsite.url ? (
            <input type="text" value={newWebsite.url} readOnly />
          ) : (
            <input type="text" defaultValue="www.yourwebsite.com" readOnly />
          )}
        </div>
      </div>

      <div className="iframe-container">
        <iframe
          src={
            newWebsite.url.startsWith("http://") ||
            newWebsite.url.startsWith("https://")
              ? newWebsite.url
              : `https://${newWebsite.url}`
          }
        ></iframe>
      </div>
    </div>
    {newWebsite.description ? (
      <div className="w-full max-description text-blue-50">
        {newWebsite.description}
      </div>
    ) : (
      <div className="w-full max-description text-blue-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem culpa
        quia ad, nam cumque aliquid perferendis, harum, ipsam officiis
        reiciendis molestias sint. Placeat rem doloremque soluta.
      </div>
    )}
    <div className="flex items-center justify-start gap-4 w-full max-w-[800px]">
      {newWebsite.technologies.length > 0 ? (
        newWebsite.technologies.map((site, index) => (
          <span className="tech-tag" key={index}>
            {site}
          </span>
        ))
      ) : (
        <>
          <span className="tech-tag">Lorem</span>
          <span className="tech-tag">Ipsum</span>
          <span className="tech-tag">Dolor</span>
        </>
      )}
    </div>
    <div className="text-white w-[800px] flex items-center justify-between">
      {newWebsite.published ? (
        <p>Published: {newWebsite.publishDate}</p>
      ) : (
        <p>Published: Month day, year</p>
      )}
    </div>
  </div>
);

export default PublishPreviewCard;
