import { RegexContext } from "../store/regex-context"
import { useContext } from "react"
import classes from "./LevelBadge.module.css"
import Newbee from "../assets/newbee.png"
import Pro from "../assets/pro.png"
import Mid from "../assets/mid.png"
import { millisecondsToMinutes } from "date-fns"

const LevelBadge: React.FC = () => {
  const regExContext = useContext(RegexContext)
  const { numberOfGuessedWords, timeResult } = regExContext
  const convertedTimeResult = millisecondsToMinutes(timeResult)
  const timeProgressStatement =
    convertedTimeResult > 1
      ? `You did it in ${convertedTimeResult} minutes`
      : convertedTimeResult === 1
      ? `You did it in ${convertedTimeResult} minute`
      : "Check your guessed words down below"
  let level: string
  numberOfGuessedWords <= 15
    ? (level = "NEWBEE")
    : numberOfGuessedWords > 15 && numberOfGuessedWords < 25
    ? (level = "MID")
    : (level = "PRO")

  let imgBadge: string

  level === "NEWBEE"
    ? (imgBadge = Newbee)
    : level === "MID"
    ? (imgBadge = Mid)
    : (imgBadge = Pro)

  return (
    <div>
      <h1 className={classes.level}>Congrats, your level is {level}!</h1>
      <h4 className={classes.time}>Great job! {timeProgressStatement}</h4>
      <div className={classes.badge}>
        <img
          data-testid="badge"
          src={imgBadge}
          alt="level badge"
          className="animate__animated animate__swing animate__delay-1s"
        />
      </div>
    </div>
  )
}

export default LevelBadge
