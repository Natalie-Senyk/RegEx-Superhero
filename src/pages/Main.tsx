import React, {useContext} from "react"
import CustomButton from "../UI/CustomButton"
import Input from "../components/Input"
import classes from "./Main.module.css"
import MainImage from '../assets/main.png'
import { RegexContext } from "../store/regex-context"

const Main: React.FC = () => {
    const regExContext = useContext(RegexContext)
    const levelIndex = regExContext.currentLevel - 1
    const currentWordToGuess = regExContext.levels[levelIndex].words[0]
    console.log(currentWordToGuess)
  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <h1>
          Your current level: <span className={classes.badge}>{regExContext.currentLevel}</span>
        </h1>
        <h2>Number of guessed words: <span className={classes.wordNumber}>{regExContext.numberOfGuessedWords}</span></h2>
        <p>Enter RegEx for "{currentWordToGuess}"</p>
        <Input />
        <div className={classes.actionButtons}>
          <CustomButton name="skip" />
          <CustomButton name="submit" />
        </div>
      </div>
      <img src={MainImage} alt="girl with cards" />
    </div>
  )
}

export default Main
