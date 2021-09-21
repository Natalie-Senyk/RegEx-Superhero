import React, { useCallback, useState } from "react"
import regExpData from "./utils"

type RegexContextObj = {
  currentLevel: number
  wordIndex: number
  currentWord: string
  numberOfGuessedWords: number
  updateCurrentWord: () => void
  skipWord: () => void
  guessedWordsArray: string[]
  guessedRegExArray: string[]
  updateGuessedWords: (word: string) => void
  updateGuessedRegEx: (regEx: string) => void
  startTime: number
  endTime: number
  startTimer: () => void
  endTimer: () => void
  validateResult: (input: string) => void
}

export const RegexContext = React.createContext<RegexContextObj>({
  currentLevel: 1,
  wordIndex: 0,
  currentWord: "",
  numberOfGuessedWords: 0,
  updateCurrentWord: () => {},
  skipWord: () => {},
  guessedWordsArray: [],
  guessedRegExArray: [],
  updateGuessedWords: () => {},
  updateGuessedRegEx: () => {},
  startTime: 0,
  endTime: 0,
  startTimer: () => {},
  endTimer: () => {},
  validateResult: () => {}
})

const RegexContextProvider: React.FC<any> = (props) => {
  const regExpressions = regExpData
  const [wordIndex, setWordIndex] = useState<number>(0)
  const [curLevel, setCurLevel] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>(regExpressions[0])
  const [guessedWords, setGuessedWords] = useState<number>(0)
  const [guessedWordsArray, setGuessedWordsArray] = useState<string[]>([])
  const [guessedRegExArray, setGuessedRegExArray] = useState<string[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)

  function updateWordsNumber() {
    setGuessedWords((prev) => prev + 1)
  }

  function updateWordIndex() {
    wordIndex < 29 && setWordIndex((prev) => prev + 1)
  }

  function updateCurrentWord() {
    setCurrentWord(regExpressions[wordIndex])
  }

  function skipWordHandler() {
    updateWordIndex()
    setCurrentWord(regExpressions[wordIndex + 1])
  }

  function updateGuessedWords(guessedWord: string) {
    setGuessedWordsArray((prev) => [...prev, guessedWord])
  }

  function updateGuessedRegEx(regEx: string) {
    setGuessedRegExArray((prev) => [...prev, regEx])
  }

  function validateLevel() {
    if (guessedWords > 1) {
      setCurLevel(2)
    }
    if (guessedWords > 4) {
      setCurLevel(3)
    }
    if (guessedWords > 7) {
    }
    if (guessedWords > 10) {
      setCurLevel(5)
    }
    if (guessedWords > 13) {
      setCurLevel(6)
    }
    if (guessedWords > 16) {
      setCurLevel(7)
    }
    if (guessedWords > 19) {
      setCurLevel(8)
    }
    if (guessedWords > 22) {
      setCurLevel(9)
    }
    if (guessedWords > 25) {
      setCurLevel(10)
    }
  }

  function validateResult(enteredInput: string) {
  updateGuessedWords(currentWord)
  updateGuessedRegEx(enteredInput)
  updateWordIndex()
  updateWordsNumber()
  validateLevel()
  }

  const startTimer = () => {
    setStartTime(Date.now())
  }

  const endTimer = useCallback(() => {
    setEndTime(Date.now())
  }, [])

  const contextValue: RegexContextObj = {
    currentLevel: curLevel,
    wordIndex: wordIndex,
    currentWord: currentWord,
    numberOfGuessedWords: guessedWords,
    updateCurrentWord: updateCurrentWord,
    skipWord: skipWordHandler,
    guessedWordsArray: guessedWordsArray,
    guessedRegExArray: guessedRegExArray,
    updateGuessedWords: updateGuessedWords,
    updateGuessedRegEx: updateGuessedRegEx,
    startTime: startTime,
    endTime: endTime,
    startTimer: startTimer,
    endTimer: endTimer,
    validateResult: validateResult
  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
