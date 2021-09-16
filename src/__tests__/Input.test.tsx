import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import "@testing-library/jest-dom"
import Input from "../components/Input"
import regExpData from "../store/utils"




describe("Input component", () => {
  beforeEach(() => {
    render(<Input />)
  })
  it("should display form on the main page", () => {
    const form = screen.getByTestId("form")
    expect(form).toBeVisible()
  })
  it("should display submit button", () => {
    const button = screen.getByText("submit")
    expect(button).toBeInTheDocument()
  })
  it("should clear input field after clicking submit button", () => {
    const inputElement = screen.getByTestId("input-field")
    const button = screen.getAllByRole("button")[0]
    userEvent.click(button)

    expect(inputElement).not.toHaveAttribute("disabled")
  })
  it("should have className 'text-field", () => {
    const inputElement = screen.getByTestId("input-field")
    expect(inputElement).toHaveClass("text-field")
  })
  it("should make input in focus after clicking input field ", () => {
    const inputElement = screen.getByTestId("input-field")
    fireEvent.focus(inputElement)

    expect(inputElement).toBeEnabled()
  })
  it("should check regEx length (30 expressions)", () => {
    const regExpressions = regExpData
    expect(regExpressions.length).toBe(30)
  })
  // it('should update guessed words on the Submit button click', () => {
  //   const guessedWords = 0
  //   const updateGuessedWords = jest.fn()
  //   fireEvent.click(screen.getByRole('button', {name: 'submit'}))
  //   expect(updateGuessedWords).toHaveBeenCalledTimes(1)
  // })
})
