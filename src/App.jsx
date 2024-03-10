import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WebsitesPage from './pages/WebsitesPage'
import PublishPage from './pages/PublishPage'

const App = () => {
  return (
    <div className="flex flex-col bg-gray-300 w-full min-h-dvh">
      <Navbar/>

      <Routes>

        
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/websites' element={<WebsitesPage />}/>
        <Route exact path='/websites/publish' element={<PublishPage />} />

      </Routes>
      
    </div>
  )
}

export default App