import React from "react"
import Confetti from "react-confetti"

const ConfettiForWinner: React.FC = () => {

  return (
    <div style={{position: 'fixed', left: '350px', top: '47px'}}>
      <Confetti width={300} height={400} numberOfPieces={100} />
    </div>
  )
}

export default ConfettiForWinner
