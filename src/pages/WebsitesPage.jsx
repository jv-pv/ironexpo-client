import { useEffect, useState, useContext } from 'react'
import WebsiteCard from '../components/WebsiteCard'
import { WebsiteContext } from '../context/website.context'
import Navbar from '../components/Navbar'

const WebsitesPage = () => {

    const { websites, fetchWebsites } = useContext(WebsiteContext)

 
    useEffect(() => {
        fetchWebsites()
    },[])

  return (
    <>
    <Navbar/>
    <div className='flex flex-col w-full mx-auto max-w-[1600px] h-full flex-1 mb-6'>
        <div className='p-2 my-5'>
            <h2 className='font-heading text-6xl text-blue-50 mx-4 my-8 text-center'>Explore Published Sites</h2>
        </div>


        <div className='website-grid'>

            {websites.map((website) => (
                <WebsiteCard key={website.id} website={website}/>
            ))}

        </div>



    </div>

    </>
  )
}

export default WebsitesPage