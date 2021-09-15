import React, { useState } from "react"
import regExpData from "./utils"

type Level = {
  level: number
  words: string[]
}

type RegexContextObj = {
  levels: Level[]
  currentLevel: number
  wordsToGuess: string[]
  currentWord: string
  numberOfGuessedWords: number
  updateGuessedWords: () => void
  updateWordIndex: () => void
  updateCurrentWord: () => void
  validateLevel: () => void
}

export const RegexContext = React.createContext<RegexContextObj>({
  levels: [],
  currentLevel: 1,
  wordsToGuess: [],
  currentWord: "",
  numberOfGuessedWords: 0,
  updateGuessedWords: () => {},
  updateWordIndex: () => {},
  updateCurrentWord: () => {},
  validateLevel: () => {},
})

const RegexContextProvider: React.FC = (props) => {
  const [regExpressions, setRegExpressions] = useState<Level[]>(regExpData)
  const [curLevel, setCurLevel] = useState<number>(1)
  const [wordIndex, setWordIndex] = useState<number>(0)
  const [wordsToGuess, setWordsToGuess] = useState<string[]>(
    regExpressions[curLevel - 1].words
  )
  const [currentWord, setCurrentWord] = useState<string>(
    wordsToGuess[wordIndex]
  )
  const [guessedWords, setGuessedWords] = useState<number>(0)

  const contextValue: RegexContextObj = {
    levels: regExpressions,
    currentLevel: curLevel,
    wordsToGuess: wordsToGuess,
    currentWord: wordsToGuess[wordIndex],
    numberOfGuessedWords: guessedWords,
    updateGuessedWords: updateWords,
    updateWordIndex: updateWordIndex,
    updateCurrentWord: updateCurrentWord,
    validateLevel: validateLevel,
  }

  function updateWords() {
    setGuessedWords((prev) => prev + 1)
  }

  function updateWordIndex() {
    if (wordIndex < 2) {
      setWordIndex((prev) => prev + 1)
    } else {
      setWordIndex(0)
    }
  }

  function validateLevel() {
    if (guessedWords > 1) {
      setCurLevel(2)
    }
    if (guessedWords > 4) {
      setCurLevel(3)
    }
    if (guessedWords > 7) {
      setCurLevel(4)
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

    setTimeout(() => {
      updateCurrentWord()
    })
  }

  function updateCurrentWord() {
    setCurrentWord(wordsToGuess[wordIndex])
  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
