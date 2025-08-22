import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ListaDeTareas from './components/ListaDeTareas/ListaDeTareas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < ListaDeTareas/>
  </StrictMode>,
)
