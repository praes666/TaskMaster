import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import Login from './components/auth/login'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
