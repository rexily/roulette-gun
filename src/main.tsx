import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index2.scss'
import App2 from './App2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App2 />
  </StrictMode>,
)
