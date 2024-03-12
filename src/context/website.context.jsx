import { createContext, useState } from 'react'
import {API_URL} from "/src/services/API_URL.jsx"
import axios from 'axios'

const WebsiteContext = createContext({
  websites: [],
  fetchWebsites: () => {},
  websiteTech: [],
  fetchWebsiteTech: () => {},
  websiteCategories: [],
  fetchWebsiteCategories: () => {}
})

const WebsiteProvider = ({children}) => {

  const [websites, setWebsites] = useState([])
  const [websiteTech, setWebsiteTech] = useState([])
  const [websiteCategories, setWebsiteCategories] = useState([])

  const fetchWebsites = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites`)
      setWebsites(response.data)
    } catch (error) {
      console.error("Error fetching websites", error)
    }
  }

  const fetchWebsiteTech = async () => {
    try {
      const response = await axios.get(`${API_URL}/technologies`)
      setWebsiteTech(response.data)
    } catch (error) {
      console.error("Error fetching websites technologies", error)
    }
  }

  const fetchWebsiteCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`)
      setWebsiteCategories(response.data)
    } catch (error) {
      console.error("Error fetching websites categories", error)
    }
  }

  return (
    <WebsiteContext.Provider value={{websites, websiteTech, websiteCategories, fetchWebsites, fetchWebsiteTech, fetchWebsiteCategories}}>
      {children}
    </WebsiteContext.Provider>
  )
}

export { WebsiteProvider, WebsiteContext }