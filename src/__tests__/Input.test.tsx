import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import Input from "../components/Input"

describe("Input component", () => {
  beforeEach(() => {
    render(<Input userInputHighlight={() => {}} />)
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
  it("should have label", () => {
    const labelEl = screen.getByLabelText(/Enter your regex here/i)
    expect(labelEl).toBeInTheDocument()
  })
  it("should have the input field not required", () => {
    const inputEl = screen.getByLabelText(/Enter your regex here/i)
    expect(inputEl).not.toBeRequired()
  })
  it("should have id attribute", () => {
    const inputEl = screen.getByLabelText(/Enter your regex here/i)
    expect(inputEl).toHaveAttribute('id')
  })
  it("doesn`t show Invalid expression message if user submits empty input, just the usual label", async() => {

    const enteredInput = screen.getByLabelText(/Enter your regex here/i)
    userEvent.type(enteredInput, '')
    fireEvent.click(screen.getByText("submit"))
    expect(screen.queryByLabelText(/Invalid expression/i)).toBeNull()

    
  })
  it('input focus', () => {
    const input = screen.getByLabelText(/Enter your regex here/i)
    expect(input).not.toHaveFocus()
    input.focus()
    expect(input).toHaveFocus()
  })
})

