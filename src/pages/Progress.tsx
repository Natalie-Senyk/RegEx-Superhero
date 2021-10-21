import { RegexContext } from "../store/regex-context"
import { useCallback, useContext, useEffect, useState } from "react"
import classes from "./Progress.module.css"
import ProgressItem from "../components/ProgressItem"
import { Link } from "react-router-dom"
import WaveImg from "../assets/wave.png"
import LevelBadge from "../components/LevelBadge"
import PrimarySpinner from "../UI/Spinner"
import PrimaryButton from "../UI/PrimaryButton"
import LevelSelector from "../UI/LevelSelector"

type userProgress = {
  guessedWords: string[]
  guessedTime: string
  guessedRegEx: string
  level: number
}

const Progress = () => {
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false)
  const [filteredCards, setFilteredCards] = useState<
    userProgress[] | undefined
  >([])
  const [spinner, setSpinner] = useState<boolean>(true)
  const regExContext = useContext(RegexContext)
  const {
    fetchUserProgress,
    fetchUserData,
    userProgress,
    numberOfGuessedWords,
    updateCardLimit,
    cardLimit
  } = regExContext

  const loadMore: boolean = numberOfGuessedWords > cardLimit

  useEffect(() => {
    fetchUserData()
    numberOfGuessedWords > 0 && fetchUserProgress()
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }, [fetchUserProgress, fetchUserData, numberOfGuessedWords])

  const onSearchHandler = useCallback((filteredResult: userProgress[] | undefined) => {
    filteredResult!.length > 0
      ? setSearchEnabled(true)
      : setSearchEnabled(false)
    filteredResult!.length > 0 && setFilteredCards(filteredResult)
  }, [])

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
        <PrimarySpinner />
        <h3 className={classes.loadingText}>Loading your progress data...</h3>
      </section>
    )
  }

  return (
    <>
      {numberOfGuessedWords > 1 ? (
        <div>
          <LevelBadge />
          <LevelSelector onSearch={onSearchHandler} />
          <div data-testid="progress" className={classes.progress}>
            {progressCards}
          </div>
          <div className={classes.loadMoreBtn}>
            {loadMore && progressCards.length > 5 && <PrimaryButton onClick={updateCardLimit} name="load more" /> }
          </div>
        </div>
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
    </>
  )
}

export default Progress
