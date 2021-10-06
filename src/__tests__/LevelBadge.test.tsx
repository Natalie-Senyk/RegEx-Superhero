import { RegexContext } from "../store/regex-context"
import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import LevelBadge from "../components/LevelBadge"


let contextItems = {
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
}

describe("Level Badge and user overall progress", () => {
  it("The level is Newbee if the number of guessed words is <= 15", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 15,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const levelNumberText = await screen.findByText("Congrats, your level is NEWBEE!")
    expect(levelNumberText).toBeVisible()
  })
  it("The level is Mid if the number of guessed words is > than 15", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 16,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const levelNumberText = await screen.findByText("Congrats, your level is MID!")
    expect(levelNumberText).toBeVisible()
  })
  it("The level is Pro if the number of guessed words is > than 15", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 25,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const levelNumberText = await screen.findByText("Congrats, your level is PRO!")
    expect(levelNumberText).toBeVisible()
  })
  it("shows the text 'You did it less than a minute' if the converted time result is === 0 minutes ", async() => {
    contextItems = {
        ...contextItems,
        timeResult: 'less than a minute!'
      }
      render(
        <RegexContext.Provider value={contextItems}>
          <LevelBadge />
        </RegexContext.Provider>
      )

    const timeProgress = await screen.findByText("Great job! You did it in less than a minute!")
    expect(timeProgress).toBeInTheDocument()
  })
  it("it shows the text 'Great job! You did it in ...' if the converted time result is === more than 1 min", async() => {
    contextItems = {
        ...contextItems,
        timeResult: '3 minutes'
      }
      render(
        <RegexContext.Provider value={contextItems}>
          <LevelBadge />
        </RegexContext.Provider>
      )

    const timeProgress = await screen.findByText("Great job! You did it in 3 minutes")
    expect(timeProgress).toBeInTheDocument()
  })
})

