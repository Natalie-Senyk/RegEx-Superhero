import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import PrimaryButton from "../UI/PrimaryButton"

describe('Button behaviour with passed props', () => {
    it("should except props with name 'submit' and render button text correctly", () => {
        render(<PrimaryButton name="submit" />)
        const button = screen.getByRole("button", {name: 'submit'})
    
        expect(button).toBeInTheDocument()
      
    })
    it("should except props with name 'skip' and render button text correctly", () => {
        render(<PrimaryButton name="skip" />)
        const button = screen.getByRole("button", {name: 'skip'})
    
        expect(button).toBeInTheDocument()
      
    })
})
  