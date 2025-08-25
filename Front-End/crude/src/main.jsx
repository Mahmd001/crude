import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppcontextProvider } from './context/Appcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AppcontextProvider>
     <App /> 
   </AppcontextProvider>
   
  
  </StrictMode>,
)
