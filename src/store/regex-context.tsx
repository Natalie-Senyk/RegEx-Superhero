import React, { useEffect, useState } from "react"
import regExpData from "./utils"

type Level = {
  level: number
  words: string[]
}

type RegexContextObj = {
  levels: Level[]
  enteredExp: string
  currentLevel: number
  numberOfGuessedWords: number
  guessWord: (enteredExp: string, currentWord: string) => void
}

export const RegexContext = React.createContext<RegexContextObj>({
  levels: [],
  enteredExp: "",
  currentLevel: 1,
  numberOfGuessedWords: 0,
  guessWord: (enteredExp, currentWord) => {},
})

const RegexContextProvider: React.FC = (props) => {
  const [regExpressions, setRegExpressions] = useState<Level[]>(regExpData)
  const [curLevel, setCurLevel] = useState<number>(1)
  const [guessedWords, setGuessedWords] = useState<number>(0)


  const quessWordHandler = (enteredExp: string, currentWord: string) => {
    currentWord.match(enteredExp) !== null &&
      setGuessedWords((prev) => prev + 1)

    if (guessedWords > 3 && guessedWords < 6) {
      setCurLevel(2)
    }
    if (guessedWords > 5 && guessedWords < 9) {
      setCurLevel(3)
    }
    if (guessedWords > 8 && guessedWords < 12) {
      setCurLevel(4)
    }
    if (guessedWords > 11 && guessedWords < 15) {
      setCurLevel(5)
    }
    if (guessedWords > 14 && guessedWords < 18) {
      setCurLevel(6)
    }
    if (guessedWords > 17 && guessedWords < 21) {
      setCurLevel(7)
    }
    if (guessedWords > 20 && guessedWords < 24) {
      setCurLevel(8)
    }
    if (guessedWords > 23 && guessedWords < 27) {
      setCurLevel(9)
    }
    if (guessedWords > 26) {
      setCurLevel(10)
    }
  }

  const contextValue: RegexContextObj = {
    levels: regExpressions,
    enteredExp: "",
    currentLevel: curLevel,
    numberOfGuessedWords: guessedWords,
    guessWord: quessWordHandler,
  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
