import { RegexContext } from "../store/regex-context"
import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Main from "../pages/Main"
import userEvent from "@testing-library/user-event"

type contextProps = {
  currentLevel: number
  wordIndex: number
  currentWord: string[]
  enteredInput: string
  updateEnteredInput: (input: string) => void
  numberOfGuessedWords: number
  updateCurrentWord: () => void
  skipWord: () => void
  guessedWordsArray: string[]
  guessedRegExArray: string[]
  guessedTime: string[]
  updateGuessedWords: (word: string[]) => void
  updateGuessedRegEx: (regEx: string) => void
  startTime: number
  endTime: number
  timeResult: number
  startTimer: () => void
  endTimer: () => void
  validateResult: (input: string) => void
  fetchUserData: () => void
  fetchUserProgress: () => void
  resetUserData: () => void
  userProgress: any
  updateFetchRequests: () => void
}
let contextItems: contextProps = {
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

describe("Context default values render correctly", () => {
  beforeEach(() => {
    render(
      <RegexContext.Provider value={contextItems}>
        <Main />
      </RegexContext.Provider>
    )
  })

  it("shows default Level 1 initially", () => {
    expect(screen.getByText(/Your current level:/)).toHaveTextContent(
      "Your current level:1"
    )
  })
  it("renders 0 as initial number for quessed words", () => {
    expect(screen.getByText(/Number of guessed words:/)).toHaveTextContent(
      "Number of guessed words: 0"
    )
  })

  it("doesn`t validate the result when the input is empty and the Submit button is clicked by user", () => {
    const button = screen.getByRole("button", { name: "submit" })
    userEvent.click(button)
    expect(contextItems.validateResult).not.toBeCalled()
  })
  it("calls out the validate function when user presses submit button after some typed input", () => {
    const input = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: "submit" })
    const mockValidateFn = jest.fn()
    userEvent.type(input, "abc")
    userEvent.click(button)
    mockValidateFn()
    expect(mockValidateFn).toBeCalled()
  })
  it("displays the value that user entered in the input field", async () => {
    const input = screen.getByRole("textbox")
    userEvent.type(input, contextItems.enteredInput)
    expect(input).toHaveDisplayValue(contextItems.enteredInput)
  })
})
