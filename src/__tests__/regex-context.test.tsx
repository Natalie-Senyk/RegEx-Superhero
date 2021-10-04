import { RegexContext } from "../store/regex-context"
import { render, screen} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Main from "../pages/Main"
import userEvent from "@testing-library/user-event"

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
  timeResult: "",
  updateTimeResultStatement: () => {},
  validateResult: jest.fn(),
  fetchUserData: () => {},
  fetchUserProgress: () => {},
  resetUserData: () => {},
  userProgress: [],
  updateFetchRequests: () => {},
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
