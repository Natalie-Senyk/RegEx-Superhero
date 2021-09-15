import React, { useContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import PrimaryButton from "../UI/PrimaryButton"
import { RegexContext } from "../store/regex-context"
import "./Input.css"
import ConfettiForWinner from "../UI/Confetti"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
    },
  },
}))

const Input: React.FC = (props) => {
  const [enteredInput, setEnteredInput] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [wrongInputMessage, setWrongInputMessage] = useState<boolean>(false)
  const regExContext = useContext(RegexContext)
  const { currentWord } = regExContext
 
  const classes = useStyles()

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(e.target.value)
  }

  const inputSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (enteredInput.trim().length === 0) {
      return
    }
    const result = currentWord.match(enteredInput)

    if (result !== null && result[0] === currentWord) {
      regExContext.updateWordIndex()
      regExContext.updateGuessedWords()
      regExContext.updateCurrentWord()
      regExContext.validateLevel()
      setShowConfetti(true)
    } else {
      setWrongInputMessage(true)
    }
    setEnteredInput("")
  }

  const inputFocusHandler = () => {
    setWrongInputMessage(false)
    setShowConfetti(false)
  }

  const skipWordHandler = () => {
    regExContext.skipWord()

  }


  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={inputSubmitHandler}
    >
      <TextField
        className="text-field"
        error={wrongInputMessage}
        id="filled-basic"
        label={
          wrongInputMessage ? "Invalid expression" : "Enter your RegEx here"
        }
        variant="filled"
        onChange={inputHandler}
        value={enteredInput}
        helperText={wrongInputMessage && "Try again, you can do this!"}
        onFocus={inputFocusHandler}
      />
        {showConfetti && <ConfettiForWinner />}
      <div className={classes.root}>
        <PrimaryButton name="skip" onClick={skipWordHandler} />
        <PrimaryButton name="submit" />
      </div>
    </form>
  )
}

export default Input
