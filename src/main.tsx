import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App'
import { LoadingProvider } from './contexts/LoadingProvider'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </StrictMode>,
  )
}
