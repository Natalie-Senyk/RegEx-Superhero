import React from "react"
import Confetti from "react-confetti"

const ConfettiForWinner: React.FC = () => {
  
  const confettiStyle: React.CSSProperties = {
    position: "fixed",
    left: "350px",
    top: "47px",
  }

  return (
    <div style={confettiStyle}>
      <Confetti width={300} height={400} numberOfPieces={100} />
    </div>
  )
}

export default ConfettiForWinner
