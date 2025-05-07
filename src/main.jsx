import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Pokemon from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pokemon />
  </StrictMode>,
)
