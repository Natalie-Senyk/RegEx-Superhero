import { RegexContext } from "../store/regex-context"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import LevelBadge from "../components/LevelBadge"
import { validateTimeResultStatement } from "../functions/validateTimeResultStatement"
import { useState } from "react"

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
  timeResult: { minutes: 0, hours: 0 },
  updateTimeResultStatement: () => {},
  validateResult: () => {},
  fetchUserData: () => {},
  fetchUserProgress: () => {},
  resetUserData: () => {},
  userProgress: [],
  updateFetchRequests: () => {},
  updateCardLimit: () => {},
  cardLimit: 6
}

describe("Level Badge and user overall progress", () => {
  it("doesn`t render LevelBadge component if number of guessed words is less than 2", () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 0,
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const levelText = screen.queryByRole('Congrats, your level is', {exact: false})
    expect(levelText).toBeNull()
  })
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

    const levelNumberText = await screen.findByText(
      "Congrats, your level is NEWBEE!"
    )
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

    const levelNumberText = await screen.findByText(
      "Congrats, your level is MID!"
    )
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

    const levelNumberText = await screen.findByText(
      "Congrats, your level is PRO!"
    )
    expect(levelNumberText).toBeVisible()
  })
  it("shows the text 'You did it less than a minute' if the converted time result is === 0 minutes and timer button was pressed ", async () => {
    contextItems = {
      ...contextItems,
      timerIsActive: true,
      timeResult: { minutes: 0, hours: 0 },
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const timeProgress = await screen.findByText(
      "Great job! You did it in less than a minute!"
    )
    expect(timeProgress).toBeInTheDocument()
  })
  it("it shows the text 'Great job! You did it in 3 minutes' if the converted time result is 3 minutes and timer btn was pressed", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
      timerIsActive: true,
      timeResult: { minutes: 3, hours: 0 },
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const timeProgress = await screen.findByText(
      "Great job! You did it in 3 minutes"
    )
    expect(timeProgress).toBeInTheDocument()
  })
  it("it shows the text 'Great job! You did it in 1 hour' if the timer btn was pressed and it took 1 hour for a user", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
      timerIsActive: true,
      timeResult: { minutes: 0, hours: 1 },
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const timeProgress = await screen.findByText(
      "Great job! You did it in 1 hour"
    )
    expect(timeProgress).toBeInTheDocument()
  })
  it("it shows the text 'Great job! You did it in 2 hours and 10 minutes' if the timer btn was pressed and it took 2 hours and 10 minutes for a user", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
      timerIsActive: true,
      timeResult: { minutes: 10, hours: 2 },
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const timeProgress = await screen.findByText(
      "Great job! You did it in 2 hours and 10 minutes"
    )
    expect(timeProgress).toBeInTheDocument()
  })
  it("it shows the default text 'Great job! Check your guessed words below' if the timer btn was not pressed and time wasn`t tracked", async () => {
    contextItems = {
      ...contextItems,
      numberOfGuessedWords: 2,
      timerIsActive: false,
      timeResult: { minutes: 0, hours: 0 },
    }
    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )

    const timeProgress = await screen.findByText(
      "Great job! Check your guessed words below"
    )
    expect(timeProgress).toBeInTheDocument()
  })
  it("it calls out the validateTimeResult function to get the time result statement", async () => {

    render(
      <RegexContext.Provider value={contextItems}>
        <LevelBadge />
      </RegexContext.Provider>
    )
    jest.mock("../functions/validateTimeResultStatement")
    let timeResult = ''
    const setTimeResult = jest.fn(() => timeResult = '5 hours and 10 minutes')
    validateTimeResultStatement(10, 5, setTimeResult)
    expect(timeResult).toBe("5 hours and 10 minutes")
  })
})
