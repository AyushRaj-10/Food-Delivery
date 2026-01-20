import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './Context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Context/CartContenxt.jsx'
import { AdminProvider } from '../../Admin-Panel/src/context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AdminProvider>       
        <CartProvider>
    <App />
        </CartProvider>
        </AdminProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
