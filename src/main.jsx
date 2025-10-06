import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/global.css'
import Meses from './pages/meses'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Meses></Meses>
  </StrictMode>,
)
