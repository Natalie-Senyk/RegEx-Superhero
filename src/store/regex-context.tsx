import React, { useCallback, useState } from "react"
import { validateLevel } from "../functions/validateLevelFunc"
import regExpData from "./utils"

type RegexContextObj = {
  currentLevel: number
  wordIndex: number
  currentWord: string[]
  numberOfGuessedWords: number
  updateCurrentWord: () => void
  skipWord: () => void
  guessedWordsArray: string[]
  guessedRegExArray: string[]
  updateGuessedWords: (word: string[]) => void
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
  currentWord: [],
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

const RegexContextProvider: React.FC = (props) => {
  const regExpressions = regExpData
  const [wordIndex, setWordIndex] = useState<number>(0)
  const [curLevel, setCurLevel] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string[]>(regExpressions[0])
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

  function updateGuessedWords(guessedWord: string[]) {
    setGuessedWordsArray((prev) => [...prev, ...guessedWord])
  }

  function updateGuessedRegEx(regEx: string) {
    setGuessedRegExArray((prev) => [...prev, regEx])
  }


  function validateResult(enteredInput: string) {
  updateGuessedWords(currentWord)
  updateGuessedRegEx(enteredInput)
  updateWordIndex()
  updateWordsNumber()
  validateLevel(guessedWords, setCurLevel)
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
