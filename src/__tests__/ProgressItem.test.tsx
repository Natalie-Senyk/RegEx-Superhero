import { RegexContext } from "../store/regex-context"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import ProgressItem from "../components/ProgressItem"


let contextItems = {
  currentLevel: 1,
  wordIndex: 0,
  currentWord: [],
  enteredInput: "",
  updateEnteredInput: () => {},
  numberOfGuessedWords: 0,
  updateCurrentWord: () => {},
  skipWord: () => {},
  guessedWordsArray: [],
  guessedRegExArray: [],
  guessedTime: [],
  updateGuessedWords: () => {},
  updateGuessedRegEx: () => {},
  startTime: 0,
  endTime: 0,
  timeResult: 0,
  startTimer: jest.fn(),
  endTimer: () => {},
  validateResult: jest.fn(),
  fetchUserData: jest.fn(),
  fetchUserProgress: jest.fn(),
  resetUserData: jest.fn(),
  userProgress: [],
  updateFetchRequests: jest.fn(),
}

describe("Progress Item Component/Card",() => {
  it("renders the correct time on each quessed card", () => {
    render(
      <RegexContext.Provider value={contextItems}>
        <ProgressItem
          words={["abc123", "boo200", "tre876"]}
          regex="\w{3}\d{3}"
          time="02.10.2021, 13:07:38"
          key="01"
        />
      </RegexContext.Provider>
    )

    const timeText = screen.getByText("Time: 02.10.2021, 13:07:38")
    expect(timeText).toBeVisible()
  })
  it("renders the correct set of three guessed words on the card", () => {
    render(
      <RegexContext.Provider value={contextItems}>
        <ProgressItem
          words={["abc123", "boo200", "tre876"]}
          regex="\w{3}\d{3}"
          time="02.10.2021, 13:07:38"
          key="01"
        />
      </RegexContext.Provider>
    )

    const guessedWords = screen.getByTestId("words")
    expect(guessedWords).toHaveTextContent("abc123boo200tre876")
  })
  it("renders the correct regex that matches three words", () => {
    render(
      <RegexContext.Provider value={contextItems}>
        <ProgressItem
          words={["abc123", "boo200", "tre876"]}
          regex="\w{3}\d{3}"
          time="02.10.2021, 13:07:38"
          key="01"
        />
      </RegexContext.Provider>
    )

    const guessedWords =  screen.getByTestId("regex")
    expect(guessedWords).toHaveTextContent("\\w{3}\\d{3}")
  })
})
