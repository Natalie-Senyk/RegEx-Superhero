import { RegexContext } from "../store/regex-context"
import { useContext, useEffect, useState } from "react"
import classes from "./LevelBadge.module.css"
import Newbee from "../assets/newbee.png"
import Pro from "../assets/pro.png"
import Mid from "../assets/mid.png"
import { validateTimeResultStatement } from "../functions/validateTimeResultStatement"

const LevelBadge: React.FC = () => {
  const [timeResultStatement, setTimeResultStatement] = useState<string>('')
  const regExContext = useContext(RegexContext)

  const { numberOfGuessedWords, timeResult, timerIsActive } = regExContext

  useEffect(() => {
    validateTimeResultStatement(timeResult.minutes, timeResult.hours, setTimeResultStatement)
  }, [timeResult.minutes, timeResult.hours])



  let level: string
  numberOfGuessedWords <= 15
    ? (level = "NEWBEE")
    : numberOfGuessedWords > 15 && numberOfGuessedWords < 25
    ? (level = "MID")
    : (level = "PRO")

  const badgeImg: any = {
    NEWBEE: Newbee,
    MID: Mid,
    PRO: Pro,
  }

  return (
    <div>
      <h1 className={classes.level}>Congrats, your level is {level}!</h1>
      <h4 className={classes.time}>
        Great job! {timerIsActive ? `You did it in ${timeResultStatement}` : 'Check your guessed words below'}
       
      </h4>
      <div className={classes.badge}>
        <img
          data-testid="badge"
          src={badgeImg[level]}
          alt="level badge"
          className="animate__animated animate__swing animate__delay-1s"
        />
      </div>
    </div>
  )
}

export default LevelBadge
