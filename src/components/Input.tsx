import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import PrimaryButton from "../UI/PrimaryButton"
import { RegexContext } from "../store/regex-context"
import ConfettiForWinner from "../UI/Confetti"
import { setTimeEvent } from "../setTimeoutFunc"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
      display: "flex",
    },
  },
  inputField: {
    marginBottom: "20px",
  },
}))

const Input: React.FC = () => {
  const [enteredInput, setEnteredInput] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [wrongInputMessage, setWrongInputMessage] = useState<boolean>(false)
  const regExContext = useContext(RegexContext)
  const { currentWord } = regExContext
  const { wordIndex } = regExContext
  const { updateCurrentWord } = regExContext
  const { startTimer } = regExContext
  const {numberOfGuessedWords} = regExContext

  const classes = useStyles()

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(e.target.value)
  }

  useEffect(() => {
    updateCurrentWord()

  }, [wordIndex, updateCurrentWord])


  const inputSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (enteredInput.trim().length === 0) {
      return
    }

    let result: string[] = [];
    
    if (currentWord[0].match(enteredInput) && currentWord[1].match(enteredInput) && currentWord[2].match(enteredInput)) {
      result.push(currentWord[0], currentWord[1], currentWord[2])  
    }

    if (result.length) {
      regExContext.validateResult(enteredInput)
      setTimeEvent(setShowConfetti)
   
    } else {
      setWrongInputMessage(true)
    }
    setEnteredInput("")
  }


  const inputFocusHandler = () => {
    setWrongInputMessage(false)
    setShowConfetti(false)
    numberOfGuessedWords === 0 && startTimer()
  }

  const skipWordHandler = () => {
    regExContext.skipWord()
    setWrongInputMessage(false)
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={inputSubmitHandler}
      data-testid="form"
    >
      <TextField
        className={`text-field ${classes.inputField}`}
        error={wrongInputMessage}
        id="filled-basic"
        data-testid="input-field"
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
