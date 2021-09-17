import { RegexContext } from "../store/regex-context"
import { useContext } from "react"
import classes from "./Progress.module.css"
import ProgressItem from "../components/ProgressItem"
import { Link } from "react-router-dom"
import WaveImg from "../assets/wave.png"
import LevelBadge from "../components/LevelBadge"

const ProgressList = () => {
  const regExContext = useContext(RegexContext)
  const { guessedWordsArray } = regExContext

  return (
      <>
      {guessedWordsArray.length > 0 && <LevelBadge />}
    <div data-testid="progress" className={guessedWordsArray.length ? classes.progress : ""}>
      {guessedWordsArray.length > 0 ? (
        guessedWordsArray.map((word, index) => <ProgressItem word={word} wordIndex={index} key={index} />)
      ) : (
        <div className={classes.noProgress}>
          <h3>
            No guessed words yet. <a href="/">Go back </a>to home page
          </h3>
          <img src={WaveImg} alt="" />
        </div>
      )}
    </div>
    </>
  )
}

export default ProgressList
