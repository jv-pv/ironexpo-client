import React, { useEffect, useState } from 'react'
import WebsiteCard from '../components/WebsiteCard'
import axios from 'axios'
import {API_URL} from "/src/services/API_URL.jsx"

const WebsitesPage = () => {

    const [websites, setWebsites] = useState([])

    const fetchWebsites = async () => {
        try {
            const response = await axios.get(`${API_URL}/websites`)
            console.log(response.data)
            setWebsites(response.data)
        } catch (error) {
            console.error("Could not fetch websites", error)
        }
    }

    useEffect(() => {
        fetchWebsites()
    },[])


  return (
    <div className='flex flex-col w-full mx-auto max-w-[1600px] h-full flex-1 mb-6'>
        <div className='p-2 my-5'>
            <h2 className='text-2xl mx-4'>Explore Published Sites</h2>
        </div>


        <div className='website-grid'>

            {websites.map((website) => (
                <WebsiteCard key={website.id} website={website}/>
            ))}

        </div>



    </div>
  )
}

export default WebsitesPage