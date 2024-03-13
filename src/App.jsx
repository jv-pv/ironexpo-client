import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WebsitesPage from './pages/WebsitesPage'
import PublishPage from './pages/PublishPage'
import WebsiteDetailsPage from './pages/WebsiteDetailsPage'
import EditWebsiteDetailsPage from './pages/EditWebsiteDetailsPage.jsx'

const App = () => {
  return (
    <div className="flex flex-col bg-gray-400 w-full min-h-dvh">

      <Routes>

        
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/websites' element={<WebsitesPage />}/>
        <Route exact path='/websites/publish' element={<PublishPage />}/>
        <Route path='/websites/:websiteId' element={<WebsiteDetailsPage />}/>
        <Route path='/websites/edit/:websiteId' element={<EditWebsiteDetailsPage />} />

      </Routes>
      
    </div>
  )
}

export default App