import './LoadingScreen.css'

interface LoadingScreenProps {
  fading?: boolean
}

export default function LoadingScreen({ fading = false }: LoadingScreenProps) {
  return (
    <div className={`loading-screen${fading ? ' loading-screen--fade-out' : ''}`}>
      <div className="loading-container" role="status" aria-live="polite">
        <div className="loading-eq" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="loading-wordmark">
          CELVA<strong>PROD</strong>
        </div>
      </div>
    </div>
  )
}
