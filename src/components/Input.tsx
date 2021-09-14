import React, { useContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import CustomButton from "../UI/CustomButton"
import { RegexContext } from "../store/regex-context"
import "./Input.css"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
    },
  },
}))

const Input: React.FC = () => {
  const [enteredInput, setEnteredInput] = useState<string>("")
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

    function validateResult() {
      if (result !== null && result[0] === currentWord) {
        regExContext.updateGuessedWords()
        regExContext.updateWordIndex()
        regExContext.updateCurrentWord()
        regExContext.validate()
      } else {
        setWrongInputMessage(true)
      }
    }
    validateResult()
    setEnteredInput("")
    // then fetch post to save guessed word and update progress and level
  }

  const inputFocusHandler = () => {
    setWrongInputMessage(false)
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
      <div className={classes.root}>
        <CustomButton name="skip" />
        <CustomButton name="submit" />
      </div>
    </form>
  )
}

export default Input
