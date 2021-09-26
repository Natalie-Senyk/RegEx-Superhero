import React, { useContext, useState, useEffect } from "react"
import Input from "../components/Input"
import classes from "./Main.module.css"
import MainImage from "../assets/main.png"
import { RegexContext } from "../store/regex-context"
import "animate.css"
import LeafImg from "../assets/wave-image.png"
import Highlighter from "react-highlight-words"

const Main: React.FC = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false)
  const [searchHighlightedInput, setsearchHighlightedInput] =
    useState<RegExp>(/^/)
  const regExContext = useContext(RegexContext)
  const { currentWord } = regExContext
  const { currentLevel } = regExContext
  const { numberOfGuessedWords } = regExContext

  useEffect(() => {
    if (currentLevel === 1 && numberOfGuessedWords === 0) {
      return
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [currentLevel, numberOfGuessedWords])

  const userInputHighlightHandler = (userInput: string) => {
    setsearchHighlightedInput(RegExp(userInput))
    console.log(searchHighlightedInput)
  }

  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <h1>
          Your current level:
          <span
            className={`${classes.badge} ${
              btnIsHighlighted ? classes.bump : ""
            }`}
          >
            {regExContext.currentLevel}
          </span>
        </h1>
        <h2>
          Number of guessed words:&nbsp;
          <span
            data-testid="guessed-words"
            className={`${classes.wordNumber} ${
              btnIsHighlighted ? classes.bump : ""
            } `}
          >
            {regExContext.numberOfGuessedWords}
          </span>
        </h2>
        <p className="animate__animated animate__pulse animate__delay-2s">
          Enter RegEx that matches all the words down below:
        </p>
        {currentWord.map((word) => (
          <Highlighter
            highlightClassName="YourHighlightClass"
            key={word}
            className={classes.wordToGuess}
            data-testid="current-word"
            searchWords={Array(searchHighlightedInput!)}
            // autoEscape={true}
            textToHighlight={word}
          />
        ))}
        <div className={classes.formStyle} data-testid="input-block">
          <Input userInputHighlight={userInputHighlightHandler} />
        </div>
      </div>
      <img
        className={`${classes.leaf} animate__animated animate__bounce animate__delay-1s`}
        src={LeafImg}
        alt="leaf"
      />
      <img
        className={classes.girl}
        data-testid="image"
        src={MainImage}
        alt="girl with cards"
      />
    </div>
  )
}

export default Main

/* <span
            key={word}
            className={`${classes.wordToGuess} ${highlightClass ? classes.highlight : ''}`}
            style={{backgroundColor: highlightClass ? 'yellow' : '#d7d8e0'}}
            data-testid="current-word"
          >
            {word}{" "}
          </span> */
