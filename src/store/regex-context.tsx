import React, { useCallback, useState } from "react"
import { validateLevel } from "../functions/validateLevelFunc"
import { USER_DATA_URL, PROGRESS_URL } from "../urls.config"
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
  timerIsActive: boolean
  launchTimer: () => void
  pauseTimer: () => void
  timeResult: number | string
  updateTimeResultStatement: (minutes: number, hours: number) => void
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
  enteredInput: "",
  updateEnteredInput: () => {},
  numberOfGuessedWords: 0,
  updateCurrentWord: () => {},
  skipWord: () => {},
  timerIsActive: false,
  launchTimer: () => {},
  pauseTimer: () => {},
  timeResult: 0,
  updateTimeResultStatement: () => {},
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
  const [enteredInput, setEnteredInput] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString()
  )
  const [guessedWords, setGuessedWords] = useState<number>(0)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const [timeResult, setTimeResult] = useState<number | string>(0)
  const [userProgress, setUserProgress] = useState<userProgress[]>([
    {
      guessedWords: [],
      guessedRegEx: "",
      guessedTime: "",
    },
  ])

  const fetchUserData = useCallback(async () => {
    const response = await fetch(USER_DATA_URL)
    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    setWordIndex(data.currentWordIndex)
    setCurLevel(data.currentLevel)
    setGuessedWords(data.numberOfGuessedWords)
  }, [])

  const updateUserData = () => {
    fetch(USER_DATA_URL, {
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
    await fetch(PROGRESS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guessedWords: currentWord,
        guessedRegEx: enteredInput,
        guessedTime: currentTime,
      }),
    })
  }

  const fetchUserProgress = useCallback(async () => {
    try {
      const response = await fetch(PROGRESS_URL)
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
    await fetch(USER_DATA_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentLevel: 1,
        numberOfGuessedWords: 0,
        currentWordIndex: 0,
      }),
    })
    await fetch(PROGRESS_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    setTimerIsActive(false)
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

  const launchTimer = useCallback(() => {
    setTimerIsActive(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerIsActive(false)
  }, [])

  // const updateTimeResultStatement = useCallback(
  //   (initialTime: number, endTime: number) => {
  //     setTimeResult(endTime - initialTime)
  //   },
  //   []
  // )

  const updateTimeResultStatement = useCallback((
    minutes: number,
    hours: number
  ) => {
    hours === 0 && minutes === 0 && setTimeResult("less than a minute!")
    hours === 0 && minutes > 1 && setTimeResult(`${minutes} minutes`)
    hours === 0 && minutes === 1 && setTimeResult(`${minutes} minute`)

    hours > 1 && minutes === 0 && setTimeResult(`${hours} hours`)
    hours > 1 && minutes === 1 && setTimeResult(`${hours} hours and ${minutes} minute`)
    hours > 1 && minutes > 1 && setTimeResult(`${hours} hours and ${minutes} minutes`)

    hours === 1 && minutes === 0 && setTimeResult(`${hours} hour`)
    hours === 1 && minutes === 1 && setTimeResult(`${hours} hour and ${minutes} minute`)
    hours === 1 && minutes > 1 && setTimeResult(`${hours} hour and ${minutes} minutes`)
  },[])

  const contextValue: RegexContextObj = {
    currentLevel: curLevel,
    wordIndex: wordIndex,
    currentWord: currentWord,
    enteredInput: enteredInput,
    updateEnteredInput: updateEnteredInput,
    numberOfGuessedWords: guessedWords,
    updateCurrentWord: updateCurrentWord,
    skipWord: skipWordHandler,
    timerIsActive: timerIsActive,
    launchTimer: launchTimer,
    pauseTimer: pauseTimer,
    timeResult: timeResult,
    updateTimeResultStatement: updateTimeResultStatement,
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
