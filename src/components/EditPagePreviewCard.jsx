
const EditPagePreviewCard = ({editedWebsite}) => (
  <div className="col-start-6 col-end-12 self-center flex flex-col justify-start gap-8">
    <div className="preview-container">
      <div className="browser-nav">
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="url-bar">
          {editedWebsite.url ? (
            <input type="text" value={editedWebsite.url} readOnly />
          ) : (
            <input type="text" defaultValue="www.yourwebsite.com" readOnly />
          )}
        </div>
      </div>

      <div className="iframe-container">
        <iframe
          src={
            editedWebsite.url.startsWith("http://") ||
            editedWebsite.url.startsWith("https://")
              ? editedWebsite.url
              : `https://${editedWebsite.url}`
          }
        ></iframe>
      </div>
    </div>
    {editedWebsite.description ? (
      <div className="w-full max-description h-full text-blue-50">
        {editedWebsite.description}
      </div>
    ) : (
      <div className="w-full max-description h-full text-blue-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem culpa
        quia ad, nam cumque aliquid perferendis, harum, ipsam officiis
        reiciendis molestias sint. Placeat rem doloremque soluta.
      </div>
    )}
    <div className="flex items-center justify-start gap-4 w-full max-w-[800px]">
      {editedWebsite.technologies.length > 0 ? (
        editedWebsite.technologies.map((site, index) => (
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
        <p>Published: {editedWebsite.publishDate}</p>
    </div>
  </div>
  )

export default EditPagePreviewCard