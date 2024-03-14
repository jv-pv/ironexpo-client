
const EditPagePreviewCard = ({editedWebsite}) => (
    <div className="preview-card-container">
          <div className="preview-card flex flex-col w-96 h-auto max-h-[580px] min-h-[580px] bg-gray-200 rounded-xl justify-self-center p-2">
            <div className="card-image bg-gray-300">
              {editedWebsite.url ? (
                <iframe
                  src={
                    editedWebsite.url.startsWith("http://") ||
                    editedWebsite.url.startsWith("https://")
                      ? editedWebsite.url
                      : `https://${editedWebsite.url}`
                  }
                ></iframe>
              ) : (
                <img
                  src="/src/assets/placeholder-image.png"
                  alt="placeholder-img"
                  className="w-full h-[350px] object-contain"
                />
              )}
            </div>
            <div className="card-link text-center text-blue-500 text-base p-2 block">
              {editedWebsite.url ? (
                <a href={editedWebsite.url} target="_blank">
                  {editedWebsite.url}
                </a>
              ) : (
                <p>www.yourwebsite.com</p>
              )}
            </div>
            {editedWebsite.description ? (
              <p className="card-description p-2 text-sm flex-1">
                {editedWebsite.description}
              </p>
            ) : (
              <p className="card-description p-2 text-sm flex-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                eveniet eaque nihil eligendi doloribus autem dolor excepturi
                aperiam deserunt consequuntur.
              </p>
            )}
            <div className="flex flex-wrap w-full p-2 gap-2">
              {editedWebsite.technologies.length > 0 ? (
                editedWebsite.technologies.map((tech, index) => (
                  <span className="tech-tag" key={index}>
                    {tech}
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
            <div className="flex justify-start items-center p-2">
              <p className="text-xs">
                Published: Month day, year{" "}
              </p>
            </div>
          </div>
        </div>
  )

export default EditPagePreviewCard