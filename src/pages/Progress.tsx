import { useLocation } from "react-router-dom"
import { RegexContext } from "../store/regex-context"
import { useContext, useEffect, useState } from "react"
import classes from "./Progress.module.css"
import ProgressItem from "../components/ProgressItem"
import { Link } from "react-router-dom"
import WaveImg from "../assets/wave.png"
import LevelBadge from "../components/LevelBadge"

const Progress = () => {
  const [timeResult, setTimeResult] = useState<number>(0)
  const regExContext = useContext(RegexContext)
  const { guessedWordsArray } = regExContext
  const {startTime} = regExContext
  const {endTime} = regExContext
  const {endTimer} = regExContext

  const location = useLocation()
  const {pathname} = location

  useEffect(() => {
    pathname === "/progress" && endTimer()
    endTime > startTime && setTimeResult((endTime - startTime))
  }, [endTimer, pathname, startTime])



  return (
    <>
      {guessedWordsArray.length > 0 && <LevelBadge time={timeResult} />}
      <div
        data-testid="progress"
        className={guessedWordsArray.length ? classes.progress : ""}
      >
        {guessedWordsArray.length > 0 ? (
          guessedWordsArray.map((word, index) => (
            <ProgressItem word={word} wordIndex={index} key={index} />
          ))
        ) : (
          <div className={classes.noProgress}>
            <h3>
              No guessed words yet. <Link to="/">Go back </Link>to home page
            </h3>
            <img src={WaveImg} alt="" />
          </div>
        )}
      </div>
    </>
  )
}

export default Progress
