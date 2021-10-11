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
  timeResult: timeResultProps
  updateTimeResultStatement: (minutes: number, hours: number) => void
  validateResult: (input: string) => void
  fetchUserData: () => void
  fetchUserProgress: () => void
  resetUserData: () => void
  userProgress: userProgress[] | undefined
  updateFetchRequests: () => void
  updateCardLimit: () => void
  cardLimit: number
}

type timeResultProps = {
  minutes: number
  hours: number
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
  timeResult: { minutes: 0, hours: 0 },
  updateTimeResultStatement: () => {},
  validateResult: () => {},
  fetchUserData: () => {},
  fetchUserProgress: () => {},
  resetUserData: () => {},
  userProgress: [],
  updateFetchRequests: () => {},
  updateCardLimit: () => {},
  cardLimit: 6,
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
  const [timeResult, setTimeResult] = useState<timeResultProps>({
    minutes: 0,
    hours: 0,
  })
  const [userProgress, setUserProgress] = useState<userProgress[]>([
    {
      guessedWords: [],
      guessedRegEx: "",
      guessedTime: "",
    },
  ])
  const [cardLimit, setCardLimit] = useState<number>(6)

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
      const response = await fetch(
        `${PROGRESS_URL}?orderBy="$key"&limitToFirst=${cardLimit}`
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
  }, [cardLimit])

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

  function updateCardLimit() {
    setCardLimit((prev) => prev + 6)
    if (guessedWords < cardLimit) {
      return
    }
    fetchUserProgress()
  }

  const launchTimer = () => {
    setTimerIsActive(true)
  }

  const updateTimeResultStatement = useCallback(
    (minutes: number, hours: number) => {
      setTimeResult({ minutes: minutes, hours: hours })
    },
    []
  )

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
    timeResult: timeResult,
    updateTimeResultStatement: updateTimeResultStatement,
    validateResult: validateResult,
    fetchUserData: fetchUserData,
    fetchUserProgress: fetchUserProgress,
    resetUserData: resetUserData,
    userProgress: userProgress,
    updateFetchRequests: updateFetchRequests,
    updateCardLimit: updateCardLimit,
    cardLimit: cardLimit,
  }

  return (
    <RegexContext.Provider value={contextValue}>
      {props.children}
    </RegexContext.Provider>
  )
}

export default RegexContextProvider
