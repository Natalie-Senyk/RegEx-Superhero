import { RegexContext } from "../store/regex-context"
import RegexContextProvider from "../store/regex-context"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Main from "../pages/Main"

describe("RegexContextProvider", () => {
  it("updates number of guessed words", () => {
    const { getByText } = render(
      <RegexContextProvider>
        <RegexContext.Consumer>
          {(value) => (
            <>
              <span>Number of words: {value.numberOfGuessedWords}</span>
              <button onClick={value.updateGuessedWordsNumber}>Submit</button>
            </>
          )}
        </RegexContext.Consumer>
      </RegexContextProvider>
    )
    userEvent.click(getByText("Submit"))
    expect(getByText("Number of words: 1")).toBeTruthy()
  })

  it("initially renders level 1", () => {
    const { getByText } = render(
      <RegexContextProvider>
        <RegexContext.Consumer>
          {(value) => <span>Your current level: {value.currentLevel}</span>}
        </RegexContext.Consumer>
      </RegexContextProvider>
    )
    expect(getByText("Your current level: 1")).toBeTruthy()
  })
  it("level changes when every 2 words are guessed", () => {
    const { queryByText, getByTestId, getByText } = render(
      <RegexContextProvider>
        <RegexContext.Consumer>
          {(value) => (
            <>
              <span data-testid="level">{value.currentLevel}</span>
              <span>Number of guessed words: {value.numberOfGuessedWords}</span>
              <button onClick={value.updateGuessedWordsNumber}>Submit</button>
              <button onClick={value.validateLevel}>Validate</button>
            </>
          )}
        </RegexContext.Consumer>
      </RegexContextProvider>
    )

    const level = getByTestId("level")

    userEvent.click(getByText("Submit"))
    userEvent.click(getByText("Validate"))
    expect(queryByText("Number of guessed words: 1")).toBeTruthy()
    expect(level.textContent).toBe("1")

    userEvent.click(getByText("Submit"))
    userEvent.click(getByText("Validate"))
    expect(queryByText("Number of guessed words: 2")).toBeTruthy()
    expect(level.textContent).toBe("2")

    userEvent.click(getByText("Submit"))
    userEvent.click(getByText("Validate"))
    expect(queryByText("Number of guessed words: 3")).toBeTruthy()
    expect(level.textContent).toBe("2")
  })
  
})
