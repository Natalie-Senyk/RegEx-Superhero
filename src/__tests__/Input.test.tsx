import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import Input from "../components/Input"

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
  it("should display skip button", () => {
    const button = screen.getByRole('button', {name: 'skip'})
    expect(button).toBeInTheDocument()
  })
  it("should clear input field after clicking submit button", () => {
    const inputElement = screen.getByTestId("input-field")
    const button = screen.getByRole("button", {name: 'submit'})
    userEvent.click(button)

    expect(inputElement).toHaveTextContent("Enter your RegEx here")
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
})
