import React from "react"
import Confetti from "react-confetti"
import classes from "./Confetti.module.css"

const ConfettiForWinner: React.FC = () => {

  return (
    <div className={classes.confetti}>
      <Confetti width={300} height={400} numberOfPieces={100} />
    </div>
  )
}

export default ConfettiForWinner
