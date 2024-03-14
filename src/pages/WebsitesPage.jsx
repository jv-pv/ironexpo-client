import { useEffect, useContext } from 'react'
import WebsiteCard from '../components/WebsiteCard'
import { WebsiteContext } from '../context/website.context'
import WebsiteCardFull from '../components/WebsiteCardFull'

const WebsitesPage = () => {

    const { websites, fetchWebsites } = useContext(WebsiteContext)

 
    useEffect(() => {
        fetchWebsites()
    },[])

  return (
    <>

        <div className='website-grid mx-3 my-2'>

            {websites.map((website) => (
                <WebsiteCardFull key={website.id} website={website}/>
                // <WebsiteCard key={website.id} website={website}/>
            ))}

        </div>




    </>
  )
}

export default WebsitesPage