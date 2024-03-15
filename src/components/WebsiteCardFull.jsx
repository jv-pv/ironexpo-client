import { NavLink } from "react-router-dom"

const WebsiteCardFull = ({website}) => (

    <NavLink to={`/websites/${website.id}`}>
        <div className="aspect-square w-full hover:scale-105 transition-transform duration-300">

        <iframe 
            title={`Preview of ${website.url}`}
            src={website.url} 
            loading="lazy"
            className="aspect-square w-full pointer-events-none select-none"
        />

        </div>
    </NavLink>
  )

export default WebsiteCardFull


// ? Keep in that using index as a key can cause problems when editing the card data in the form.