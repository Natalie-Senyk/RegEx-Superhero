import React, { useCallback, useState } from "react"
import { validateLevel } from "../functions/validateLevelFunc"
import regExpData from "./utils"

type RegexContextObj = {
  currentLevel: number
  wordIndex: number
  currentWord: string[]
  enteredInput: string
  updateEnteredInput: (input: string) => void
  numberOfGuessedWords: number
  updateCurrentWord: () => void
  skipWord: () => void
  startTime: number
  endTime: number
  startTimer: () => void
  endTimer: () => void
  timeResult: number
  validateResult: (input: string) => void
  fetchUserData: () => void
  fetchUserProgress: () => void
  resetUserData: () => void
  userProgress: userProgress[] | undefined
  updateFetchRequests: () => void
}

type userProgress = {
  guessedWords: string[]
  guessedTime: string
  guessedRegEx: string
}

export const RegexContext = React.createContext<RegexContextObj>({
  currentLevel: 1,
  wordIndex: 0,
  currentWord: [],
  enteredInput: '',
  updateEnteredInput: () => {},
  numberOfGuessedWords: 0,
  updateCurrentWord: () => {},
  skipWord: () => {},
  startTime: 0,
  endTime: 0,
  startTimer: () => {},
  endTimer: () => {},
  timeResult: 0,
  validateResult: () => {},
  fetchUserData: () => {},
  fetchUserProgress: () => {},
  resetUserData: () => {},
  userProgress: [],
  updateFetchRequests: () => {},
})

const RegexContextProvider: React.FC = (props) => {
  const regExpressions = regExpData
  const [wordIndex, setWordIndex] = useState<number>(0)
  const [curLevel, setCurLevel] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string[]>(regExpressions[0])
  const [enteredInput, setEnteredInput] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString())
  const [guessedWords, setGuessedWords] = useState<number>(0)
  const [startTime, setStartTime] = useState<number>(new Date().getTime())
  const [endTime, setEndTime] = useState<number>(0)
  const [timeResult, setTimeResult] = useState<number>(0)
  const [userProgress, setUserProgress] = useState<userProgress[]>([
    {
      guessedWords: [],
      guessedRegEx: "",
      guessedTime: "",
    },
  ])

  const fetchUserData = useCallback(async () => {
    const response = await fetch(
      "https://regex-superhero-default-rtdb.firebaseio.com/userData.json"
    )

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    setWordIndex(data.currentWordIndex)
    setCurLevel(data.currentLevel)
    setGuessedWords(data.numberOfGuessedWords)
  }, [])

  const updateUserData = () => {
    fetch("https://regex-superhero-default-rtdb.firebaseio.com/userData.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentLevel: curLevel,
        numberOfGuessedWords: guessedWords + 1,
        currentWordIndex: wordIndex + 1,
      }),
    })
  }

  const updateUserProgress = async () => {
    await fetch(
      "https://regex-superhero-default-rtdb.firebaseio.com/progress.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guessedWords: currentWord,
          guessedRegEx: enteredInput,
          guessedTime: currentTime,
        }),
      }
    )
  }

  const fetchUserProgress = useCallback(async() => {
    try {
      const response = await fetch(
        "https://regex-superhero-default-rtdb.firebaseio.com/progress.json"
      )
      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      const data = await response.json()
      if (data === null) {
        return
      }
      let userProgressTransformed: any = []
      for (let key in data) {
       await userProgressTransformed.push({
          guessedWords: data[key].guessedWords,
          guessedTime: data[key].guessedTime,
          guessedRegEx: data[key].guessedRegEx,
        })
      }
      setUserProgress(userProgressTransformed)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }, [])

  const resetUserData = async () => {
    await fetch(
      "https://regex-superhero-default-rtdb.firebaseio.com/userData.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentLevel: 1,
          numberOfGuessedWords: 0,
          currentWordIndex: 0,
        }),
      }
    )
    await fetch(
      "https://regex-superhero-default-rtdb.firebaseio.com/progress.json",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    setStartTime(0)
    setEndTime(0)
  }

  function updateWordsNumber() {
    setGuessedWords((prev) => prev + 1)
  }

  function updateWordIndex() {
    wordIndex < 29 && setWordIndex((prev) => prev + 1)
  }

  const updateCurrentWord = useCallback(() => {
    setCurrentWord(regExpressions[wordIndex])
  }, [regExpressions, wordIndex])

  function skipWordHandler() {
    updateWordIndex()
    setCurrentWord(regExpressions[wordIndex + 1])
  }

  function updateGuessedTime() {
    setCurrentTime(new Date().toLocaleString())
  }


  function validateResult(enteredInput: string) {
    updateGuessedTime()
    updateWordIndex()
    updateCurrentWord()
    updateWordsNumber()
    validateLevel(guessedWords, setCurLevel)
  }

  function updateFetchRequests() {
    updateUserData()
    updateUserProgress()
  }

  function updateEnteredInput(input: string) {
    setEnteredInput(input)
  }

  const startTimer = useCallback(() => {
    setStartTime(new Date().getTime())
  }, [])

  const endTimer = useCallback(() => {
    setEndTime(new Date().getTime())
    endTime > 0 && setTimeResult(endTime - startTime)
  }, [startTime])

  const contextValue: RegexContextObj = {
    currentLevel: curLevel,
    wordIndex: wordIndex,
    currentWord: currentWord,
    enteredInput: enteredInput,
    updateEnteredInput: updateEnteredInput,
    numberOfGuessedWords: guessedWords,
    updateCurrentWord: updateCurrentWord,
    skipWord: skipWordHandler,
    startTime: startTime,
    endTime: endTime,
    timeResult: timeResult,
    startTimer: startTimer,
    endTimer: endTimer,
    validateResult: validateResult,
    fetchUserData: fetchUserData,
    fetchUserProgress: fetchUserProgress,
    resetUserData: resetUserData,
    userProgress: userProgress,
    updateFetchRequests: updateFetchRequests,
  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
