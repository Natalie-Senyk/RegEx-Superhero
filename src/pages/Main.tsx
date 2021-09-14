import React, {useContext, useState, useEffect} from "react"
import Input from "../components/Input"
import classes from "./Main.module.css"
import MainImage from '../assets/main.png'
import { RegexContext } from "../store/regex-context"

const Main: React.FC = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false)
    const regExContext = useContext(RegexContext)
    const {currentWord} = regExContext
    const {currentLevel} = regExContext
    const {numberOfGuessedWords} = regExContext

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

  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <h1>
          Your current level: <span className={`${classes.badge} ${btnIsHighlighted ? classes.bump : ''}`}>{regExContext.currentLevel}</span>
        </h1>
        <h2>Number of guessed words: <span className={`${classes.wordNumber} ${btnIsHighlighted ? classes.bump : ''} `}>{regExContext.numberOfGuessedWords}</span></h2>
        <p>Enter RegEx for "{currentWord}"</p>
        <div className={classes.formStyle}>
        <Input/>
        </div>
      </div>
      <img src={MainImage} alt="girl with cards" />
    </div>
  )
}

export default Main
