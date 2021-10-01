import { useLocation } from "react-router-dom"
import { RegexContext } from "../store/regex-context"
import { useContext, useEffect, useState } from "react"
import classes from "./Progress.module.css"
import ProgressItem from "../components/ProgressItem"
import { Link } from "react-router-dom"
import WaveImg from "../assets/wave.png"
import LevelBadge from "../components/LevelBadge"
import SearchField from "../UI/SearchField"


type progressFetchedData = {
  guessedWords: string[]
  guessedTime: string
  guessedRegEx: string
}

const Progress = () => {
  const [searchEnabled, setSearchEnabled] = useState<boolean>(false)
  const [filteredCards, setFilteredCards] = useState<progressFetchedData[] | undefined>([])
  const regExContext = useContext(RegexContext)
  const { endTimer, fetchUserProgress, userProgress, numberOfGuessedWords } =
    regExContext

  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    fetchUserProgress()
  }, [fetchUserProgress])

  useEffect(() => {
    pathname === "/progress" && endTimer()
  }, [endTimer, pathname])

  const onSearchHandler = (filteredResult: progressFetchedData[] | undefined) => {
    filteredResult!.length > 0 ? setSearchEnabled(true) : setSearchEnabled(false)
    filteredResult!.length > 0 && setFilteredCards(filteredResult)

  }

  const progressCards =
    numberOfGuessedWords > 1 && !searchEnabled ? 
    userProgress!.map((card, index) => (
      <ProgressItem
        words={card.guessedWords}
        regex={card.guessedRegEx}
        time={card.guessedTime}
        key={index}
      />
    )) : filteredCards!.map((card, index) => (
      <ProgressItem
        words={card.guessedWords}
        regex={card.guessedRegEx}
        time={card.guessedTime}
        key={index}
      />
    )) 

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
          <div className={classes.noProgress}>
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
