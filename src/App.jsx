import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WebsitesPage from './pages/WebsitesPage'
import PublishPage from './pages/PublishPage'
import WebsiteDetailsPage from './pages/WebsiteDetailsPage'
import EditWebsiteDetailsPage from './pages/EditWebsiteDetailsPage.jsx'

const App = () => {
  return (
    <div className="flex flex-col bg-blue-950 w-full min-h-dvh">

      <Routes>

        
        <Route path='/' element={<HomePage />}/>
        <Route path='/websites' element={<WebsitesPage />}/>
        <Route exact path='/websites/publish' element={<PublishPage />}/>
        <Route path='/websites/:websiteId' element={<WebsiteDetailsPage />}/>
        <Route path='/websites/edit/:websiteId' element={<EditWebsiteDetailsPage />} />

      </Routes>
      
    </div>
  )
}

export default App