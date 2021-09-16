import React from "react"
import { RegexContext } from "../store/regex-context"
import RegexContextProvider from "../store/regex-context"
import { render, fireEvent } from "@testing-library/react"

describe("RegexContextProvider", () => {
  it("initially renders number of words to guess as 0", () => {
    const { getByText } = render(
      <RegexContextProvider>
        <RegexContext.Consumer>
          {(value) => (
            <span>Number of words: {value.numberOfGuessedWords}</span>
          )}
        </RegexContext.Consumer>
      </RegexContextProvider>
    )
    expect(getByText("Number of words: 0")).toBeTruthy()
  })

  it("updates number of guessed words", () => {
    const { getByText } = render(
      <RegexContextProvider>
        <RegexContext.Consumer>
          {(value) => (
            <>
              <span>Number of words: {value.numberOfGuessedWords}</span>
              <button onClick={value.updateGuessedWords}>Submit</button>
            </>
          )}
        </RegexContext.Consumer>
      </RegexContextProvider>
    )
    fireEvent.click(getByText('Submit'))
    expect(getByText('Number of words: 1')).toBeTruthy()
  })
})
