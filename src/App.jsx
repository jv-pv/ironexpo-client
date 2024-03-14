import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WebsitesPage from './pages/WebsitesPage'
import PublishPage from './pages/PublishPage'
import WebsiteDetailsPage from './pages/WebsiteDetailsPage'
import EditWebsiteDetailsPage from './pages/EditWebsiteDetailsPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div className=" font-ironFont flex flex-col bg-black w-full min-h-dvh relative">
      <Navbar/>
      <Routes>

        
        <Route path='/' element={<HomePage />}/>
        <Route path='/websites' element={<WebsitesPage />}/>
        <Route exact path='/websites/publish' element={<PublishPage />}/>
        <Route path='/websites/:websiteId' element={<WebsiteDetailsPage />}/>
        <Route path='/websites/edit/:websiteId' element={<EditWebsiteDetailsPage />} />

      </Routes>
      {/* <Footer/> */}
    </div>
  )
}

export default App