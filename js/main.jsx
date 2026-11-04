import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Agenda from './components/Agenda.jsx'
import '../css/styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Agenda />
  </StrictMode>,
)
