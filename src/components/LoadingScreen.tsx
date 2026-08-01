import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-spinner" />
        <div className="loading-text">
          Loading Experience...
        </div>
      </div>
    </div>
  )
}