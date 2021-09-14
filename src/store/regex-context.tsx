import React, { useState } from "react"
import regExpData from "./utils"

type Level = {
  level: number
  words: string[]
}

type RegexContextObj = {
  levels: Level[]
  currentLevel: number
  currentWordToGuess: string
  numberOfGuessedWords: number
  updateGuessedWords: () => void
  updatedCurrentWord: () => void
  validate: () => void
}

export const RegexContext = React.createContext<RegexContextObj>({
  levels: [],
  currentLevel: 1,
  currentWordToGuess: '',
  numberOfGuessedWords: 0,
  updateGuessedWords: () => {},
  updatedCurrentWord: () => {},
  validate: () => {}
})

const RegexContextProvider: React.FC = (props) => {
  const [regExpressions, setRegExpressions] = useState<Level[]>(regExpData)
  const [curLevel, setCurLevel] = useState<number>(1)
  let wordIndex = 0;
  const [currentWord, setCurrentWord] = useState<string>(regExpressions[curLevel - 1].words[wordIndex])
  const [guessedWords, setGuessedWords] = useState<number>(0)


  const contextValue: RegexContextObj = {
    levels: regExpressions,
    currentLevel: curLevel,
    currentWordToGuess: currentWord,
    numberOfGuessedWords: guessedWords,
    updateGuessedWords: updateWords,
    updatedCurrentWord: updateCurrentWord,
    validate: validateLevel
  }

  function updateWords(){
    setGuessedWords(prev => prev + 1)
  }

  function updateCurrentWord() {
    setCurrentWord( regExpressions[curLevel - 1].words[wordIndex + 1])
  }

  function validateLevel() {
     if (guessedWords > 2) {
        setCurLevel(2)
      }
      if (guessedWords > 5) {
        setCurLevel(3)
      }
      if (guessedWords > 8) {
        setCurLevel(4)
      }
      if (guessedWords > 11) {
        setCurLevel(5)
      }
      if (guessedWords > 14) {
        setCurLevel(6)
      }
      if (guessedWords > 17) {
        setCurLevel(7)
      }
      if (guessedWords > 20) {
        setCurLevel(8)
      }
      if (guessedWords > 23) {
        setCurLevel(9)
      }
      if (guessedWords > 26) {
        setCurLevel(10)
      }

  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
