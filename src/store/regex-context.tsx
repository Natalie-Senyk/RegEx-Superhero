import React, { useState } from "react"
import regExpData from "./utils"


type RegexContextObj = {
  currentLevel: number
  currentWord: string
  numberOfGuessedWords: number
  updateGuessedWords: () => void
  updateWordIndex: () => void
  updateCurrentWord: () => void
  validateLevel: () => void
  skipWord: () => void
}

export const RegexContext = React.createContext<RegexContextObj>({
  currentLevel: 1,
  currentWord: "",
  numberOfGuessedWords: 0,
  updateGuessedWords: () => {},
  updateWordIndex: () => {},
  updateCurrentWord: () => {},
  validateLevel: () => {},
  skipWord: () => {},
})

const RegexContextProvider: React.FC = (props) => {
  const regExpressions = regExpData
  const [wordIndex, setWordIndex] = useState<number>(0)
  const [curLevel, setCurLevel] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>(
    regExpressions[wordIndex]
  )
  const [guessedWords, setGuessedWords] = useState<number>(0)

  const contextValue: RegexContextObj = {
    currentLevel: curLevel,
    currentWord: currentWord,
    numberOfGuessedWords: guessedWords,
    updateGuessedWords: updateWords,
    updateWordIndex: updateWordIndex,
    updateCurrentWord: updateCurrentWord,
    validateLevel: validateLevel,
    skipWord: skipWordHandler,
  }

  function updateWords() {
    setGuessedWords((prev) => prev + 1)
  }

  function updateWordIndex() {
    wordIndex < 29 && setWordIndex((prev) => prev + 1)
  }

  function updateCurrentWord() {
    setCurrentWord(regExpressions[wordIndex + 1])
  }

  function skipWordHandler() {
    updateWordIndex()
    setCurrentWord(regExpressions[wordIndex + 1])
  }

  function validateLevel() {
    if (guessedWords > 1) {
      setCurLevel(2)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 4) {
      setCurLevel(3)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 7) {
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 10) {
      setCurLevel(5)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 13) {
      setCurLevel(6)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 16) {
      setCurLevel(7)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 19) {
      setCurLevel(8)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 22) {
      setCurLevel(9)
      setCurrentWord(regExpressions[wordIndex])
    }
    if (guessedWords > 25) {
      setCurLevel(10)
      setCurrentWord(regExpressions[wordIndex])
    }
  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
