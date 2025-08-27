import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Logueo from './components/logueo/Logueo'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Logueo/>
  </StrictMode>,
)
