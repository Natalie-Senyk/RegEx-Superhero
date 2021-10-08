import { RegexContext } from "../store/regex-context"
import { useContext, useEffect, useState } from "react"
import classes from "./Progress.module.css"
import ProgressItem from "../components/ProgressItem"
import { Link } from "react-router-dom"
import WaveImg from "../assets/wave.png"
import LevelBadge from "../components/LevelBadge"
import SearchField from "../UI/SearchField"
import PrimarySpinner from "../UI/Spinner"

type userProgress = {
  guessedWords: string[]
  guessedTime: string
  guessedRegEx: string
}

const Progress = () => {
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false)
  const [filteredCards, setFilteredCards] = useState<
    userProgress[] | undefined
  >([])
  const [spinner, setSpinner] = useState<boolean>(true)
  const regExContext = useContext(RegexContext)
  const { fetchUserProgress, fetchUserData, userProgress, numberOfGuessedWords } =
    regExContext


  useEffect(() => {
    fetchUserData()
    numberOfGuessedWords > 0 && fetchUserProgress()
     setTimeout(() => {setSpinner(false)}, 1000)
  }, [fetchUserProgress, fetchUserData, numberOfGuessedWords])


  const onSearchHandler = (
    filteredResult: userProgress[] | undefined,
    userQuery: string
  ) => {
    filteredResult!.length > 0
      ? setSearchEnabled(true)
      : setSearchEnabled(false)
    filteredResult!.length > 0 && setFilteredCards(filteredResult)
  }

  const progressCards =
    numberOfGuessedWords > 1 && !searchEnabled
      ? userProgress!.map((card, index) => (
          <ProgressItem
            words={card.guessedWords}
            regex={card.guessedRegEx}
            time={card.guessedTime}
            key={index}
          />
        ))
      : filteredCards!.map((card, index) => (
          <ProgressItem
            words={card.guessedWords}
            regex={card.guessedRegEx}
            time={card.guessedTime}
            key={index}
          />
        ))

  if (spinner) {
    return (
      <section>
        <PrimarySpinner /> <h3 className={classes.loadingText}>Loading your progress data...</h3>
      </section>
    )
  }

  return (
    <>
      {numberOfGuessedWords > 1 && <LevelBadge />}
      {numberOfGuessedWords > 1 && <SearchField onSearch={onSearchHandler} />}
      <div
        data-testid="progress"
        className={numberOfGuessedWords > 1 ? classes.progress : ""}
      >
        {numberOfGuessedWords > 1 ? (
          progressCards
        ) : (
          <div data-testid="no-progress" className={classes.noProgress}>
            <h3>
              No guessed words yet. <Link to="/">Go back </Link>to home page
            </h3>
            <img
              src={WaveImg}
              alt="Wave"
              className="animate__animated animate__bounce animate__delay-1s"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Progress
