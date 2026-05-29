export default function LoadingScreen() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
      zIndex: 9999,
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(246, 36, 86, 0.2)",
          borderTop: "3px solid green",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <div style={{
          color: "green",
          fontSize: "14px",
          fontWeight: "500",
        }}>
          Loading Experience...
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}