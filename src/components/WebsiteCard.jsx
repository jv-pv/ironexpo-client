import { NavLink } from "react-router-dom"

const WebsiteCard = ({website}) => {
    console.log(website)
  return (
    <div className='card flex flex-col w-96 h-auto max-h-[550px] min-h-[550px] bg-gray-100 rounded-xl justify-self-center p-2'>
        <div className='card-image'>
            <iframe src={website.url}></iframe>
        </div>
        <div className="card-link text-center text-blue-500 text-base p-2 block">
            <a href={website.url}>{website.url}</a>
        </div>
        <p className='card-description flex items-center p-2 text-sm flex-1'>
            {website.description}
        </p>
        <div className='tech-stack flex p-2 gap-2'>
            {website.technologies.map((tech) => (
                <span className="tech-tag">{tech}</span>
            ))

            }
        </div>
        <div className="flex justify-between items-center p-2">
            <NavLink to="/websites">
                <button className="bg-blue-500 text-blue-100 px-2 rounded">...</button>
            </NavLink>
            <p className='published-date text-xs text-right'>Published: {website.publishDate}</p>
        </div>
    </div>
  )
}

export default WebsiteCard