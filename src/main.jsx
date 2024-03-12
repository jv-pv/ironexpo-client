import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { WebsiteProvider } from './context/website.context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <WebsiteProvider>
        <App />
      </WebsiteProvider>
    </BrowserRouter>
  // </React.StrictMode>,
)
