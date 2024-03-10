import { createContext, useState, useEffect } from 'react'
import {API_URL} from "/src/services/API_URL.jsx"
import axios from 'axios'

const WebsiteContext = createContext()

const WebsiteProvider = () => {

  const [website, setWebsite] = useState([])

  const fetchWebsites = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites`)
    } catch (error) {
      console.error("Error fetching websites", error)
    }
  }


  return (
    <div>website.context</div>
  )
}

export default WebsiteProvider