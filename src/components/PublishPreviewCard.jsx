import React from 'react'

const PublishPreviewCard = ({newWebsite}) => (
    <div className="preview-card-container">
    <div className="preview-card flex flex-col w-96 h-auto max-h-[580px] min-h-[580px] bg-gray-100 rounded-xl justify-self-center p-2">
      <div className="card-image bg-gray-300">
        {newWebsite.url ? (
          <iframe
            src={
              newWebsite.url.startsWith("http://") ||
              newWebsite.url.startsWith("https://")
                ? newWebsite.url
                : `https://${newWebsite.url}`
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
        {newWebsite.url ? (
          <a href={newWebsite.url} target="_blank">
            {newWebsite.url}
          </a>
        ) : (
          <p>www.yourwebsite.com</p>
        )}
      </div>
      {newWebsite.description ? (
        <p className="card-description p-2 text-sm flex-1">
          {newWebsite.description}
        </p>
      ) : (
        <p className="card-description p-2 text-sm flex-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
          eveniet eaque nihil eligendi doloribus autem dolor excepturi
          aperiam deserunt consequuntur.
        </p>
      )}
      <div className="flex flex-wrap w-full p-2 gap-2">
        {newWebsite.technologies.length > 0 ? (
          newWebsite.technologies.map((tech, index) => (
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
      <div className="flex justify-end items-center p-2">
        <p className="text-xs">
          Published: Month day, year{" "}
        </p>
      </div>
    </div>
  </div>
)

export default PublishPreviewCard