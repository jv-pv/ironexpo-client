import { NavLink } from "react-router-dom"

const WebsiteCard = ({website}) => (
    <div className="flex flex-col w-96 h-auto max-h-[580px] min-h-[580px] bg-gray-200 rounded-xl justify-self-center p-2">
        <div className="card-image">
            <iframe 
                title={`Preview of ${website.url}`}
                src={website.url} 
                loading="lazy"
            />
        </div>
        <div className="card-link text-center text-blue-500 text-base p-2 block">
            <a rel="noopener noreferrer" href={website.url} target="_blank">{website.url}</a>
        </div>
        <p className="card-description p-2 text-sm flex-1">
            {website.description}
        </p>
        <div className="flex flex-wrap w-full p-2 gap-2">
            {website.technologies.map((tech, index) => (
                <span className="tech-tag" key={index}>{tech}</span>
            ))

            }
        </div>
        <div className="flex justify-between items-center p-2">
            <NavLink to={`/websites/${website.id}`}>
                <button className="bg-blue-500 text-blue-100 px-2 rounded">...</button>
            </NavLink>
            <p className="published-date text-xs text-right">Published: {website.publishDate}</p>
        </div>
    </div>
  )

export default WebsiteCard


// ? Keep in that using index as a key can cause problems when editing the card data in the form.