import { createContext, useState } from 'react'
import {API_URL} from "/src/services/API_URL.jsx"
import axios from 'axios'
import { useParams } from 'react-router-dom'

const WebsiteContext = createContext({
  websites: [],
  fetchWebsites: () => {},
  fetchWebsiteDetails: () => {}
})

const WebsiteProvider = ({children}) => {

  const [websites, setWebsites] = useState([])

  const { websiteId } = useParams()

  const fetchWebsites = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites`)
      setWebsites(response.data)
    } catch (error) {
      console.error("Error fetching websites", error)
    }
  }

  const fetchWebsiteDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites/${websiteId}`)
    } catch (error) {
      console.error("Error fetching website details", error)
    }
  }


  return (
    <WebsiteContext.Provider value={{websites, fetchWebsites, fetchWebsiteDetails}}>
      {children}
    </WebsiteContext.Provider>
  )
}

export { WebsiteProvider, WebsiteContext }