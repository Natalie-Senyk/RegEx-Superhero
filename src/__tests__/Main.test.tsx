import { render, screen } from "@testing-library/react"
import Main from "../pages/Main"
import "@testing-library/jest-dom"


describe("Main component", () => {
  beforeEach(() => {
    render(<Main />)
  })
  it("should display girl image on the main page", () => {
    const image = screen.getByTestId("image")
    expect(image).toBeTruthy()
  })
  it("should display leaf imagee", () => {
    const image = screen.getByAltText("leaf")
    expect(image).toBeInTheDocument()
  })
  it("should display main header", () => {
    const header = screen.getByText("Your current level", { exact: false })
    expect(header).toBeInTheDocument()
  })
  it("should display second header on the number of words", () => {
    const subHeader = screen.getByText("Number of guessed words", {
      exact: false,
    })
    expect(subHeader).toBeInTheDocument()
  })
  it("should display user input field", () => {
    const input = screen.getByTestId("input-block")
    expect(input).toBeInTheDocument()
  })
  it('should display the current word to guess, not just empty "" ', () => {
    const currentWord = screen.queryByTestId("current-word")
    expect(currentWord).not.toBeUndefined()
  })
  it("should correspond to snapshot", () => {
    const { asFragment } = render(<Main />)
    expect(asFragment()).toMatchSnapshot()
  })
})
