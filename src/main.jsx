import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ClerkRoot from './components/ClerkRoot.jsx'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkRoot>
      <App />
    </ClerkRoot>
  </StrictMode>,
)
