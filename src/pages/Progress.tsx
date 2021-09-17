import { RegexContext } from "../store/regex-context"
import { useContext } from "react"
import classes from "./Progress.module.css"
import ProgressItem from "../components/ProgressItem"
import { Link } from "react-router-dom"
import WaveImg from "../assets/wave.png"

const ProgressList = () => {
  const regExContext = useContext(RegexContext)
  const { guessedWordsArray } = regExContext
  const { guessedRegExArray } = regExContext

  return (
    <div className={guessedWordsArray.length ? classes.progress : ""}>
      {guessedWordsArray.length > 0 ? (
        guessedWordsArray.map((word) => <ProgressItem word={word} />)
      ) : (
        <div className={classes.noProgress}>
          <h3>
            No guessed words yet. <Link to="/">Go back </Link>to home page
          </h3>
          <img src={WaveImg} alt="" />
        </div>
      )}
    </div>
  )
}

export default ProgressList
