import RegexContextProvider, { RegexContext } from "../store/regex-context"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import Main from "../pages/Main"

import { BrowserRouter } from "react-router-dom"
import React from "react"

// describe("RegexContextProvider", () => {
//   it("updates number of guessed words", () => {
//     const { getByText } = render(
//       <RegexContextProvider>
//         <RegexContext.Consumer>
//           {(value) => (
//             <>
//               <span>Number of words: {value.numberOfGuessedWords}</span>
//               <button onClick={value.updateGuessedWordsNumber}>Submit</button>
//             </>
//           )}
//         </RegexContext.Consumer>
//       </RegexContextProvider>
//     )
//     userEvent.click(getByText("Submit"))
//     expect(getByText("Number of words: 1")).toBeTruthy()
//   })

//   it("initially renders level 1", () => {
//     const { getByText } = render(
//       <RegexContextProvider>
//         <RegexContext.Consumer>
//           {(value) => <span>Your current level: {value.currentLevel}</span>}
//         </RegexContext.Consumer>
//       </RegexContextProvider>
//     )
//     expect(getByText("Your current level: 1")).toBeTruthy()
//   })
//   it("level changes when every 2 words are guessed", () => {
//     const { queryByText, getByTestId, getByText } = render(
//       <RegexContextProvider>
//         <RegexContext.Consumer>
//           {(value) => (
//             <>
//               <span data-testid="level">{value.currentLevel}</span>
//               <span>Number of guessed words: {value.numberOfGuessedWords}</span>
//               <button onClick={value.updateGuessedWordsNumber}>Submit</button>
//               <button onClick={value.validateLevel}>Validate</button>
//             </>
//           )}
//         </RegexContext.Consumer>
//       </RegexContextProvider>
//     )

//     const level = getByTestId("level")

//     userEvent.click(getByText("Submit"))
//     userEvent.click(getByText("Validate"))
//     expect(queryByText("Number of guessed words: 1")).toBeTruthy()
//     expect(level.textContent).toBe("1")

//     userEvent.click(getByText("Submit"))
//     userEvent.click(getByText("Validate"))
//     expect(queryByText("Number of guessed words: 2")).toBeTruthy()
//     expect(level.textContent).toBe("2")

//     userEvent.click(getByText("Submit"))
//     userEvent.click(getByText("Validate"))
//     expect(queryByText("Number of guessed words: 3")).toBeTruthy()
//     expect(level.textContent).toBe("2")
//   })

// })

describe("Context", () => {
  it("Consumer component shows default value", () => {
    type contextProps = {
      currentLevel: number
      numberOfGuessedWords: number
    }

    const contextItems: contextProps = {
      currentLevel: 1,
      numberOfGuessedWords: 0,
    }

    
    const { getByText } = render(
      <RegexContextProvider value={{contextItems}}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </RegexContextProvider>
    )
    expect(getByText(/Your current level:/)).toHaveTextContent(
      "Your current level:1"
    )
  })
})
