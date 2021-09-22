import { RegexContext } from "../store/regex-context"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import Main from "../pages/Main"



describe("Context default values render correctly", () => {

  beforeEach(() => {
    render(
      <RegexContext.Provider value={contextItems}>
        <Main />
      </RegexContext.Provider>
    )

  })



  type contextProps = {
    currentLevel: number
    wordIndex: number
    currentWord: string
    numberOfGuessedWords: number
    updateCurrentWord: () => void
    skipWord: () => void
    guessedWordsArray: string[]
    guessedRegExArray: string[]
    updateGuessedWords: (word: string) => void
    updateGuessedRegEx: (regEx: string) => void
    startTime: number
    endTime: number
    startTimer: () => void
    endTimer: () => void
    validateResult: (input: string) => void
  }

  const contextItems: contextProps = {
  currentLevel: 1,
  wordIndex: 0,
  currentWord: 'abc123',
  numberOfGuessedWords: 0,
  updateCurrentWord: () => {},
  skipWord: () => {},
  guessedWordsArray: [],
  guessedRegExArray: [],
  updateGuessedWords: () => {},
  updateGuessedRegEx: () => {},
  startTime: 0,
  endTime: 0,
  startTimer: jest.fn(),
  endTimer: () => {},
  validateResult:  jest.fn()
  }

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
  it("starts the timer when the user click on input the first time", () => {

    const input = screen.getByLabelText('Enter your RegEx here', {exact: false})
    fireEvent.focus(input)

    expect(contextItems.startTimer).toBeCalled()

  })
  it("doesn`t validate the result when the input is empty and the Submit button is clicked by user", () => {

    const button = screen.getByRole('button', {name: 'submit'})
    fireEvent.click(button)
    expect(contextItems.validateResult).not.toBeCalled()

  })
})
