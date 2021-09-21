import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ProgressList from "../pages/Progress"
import { BrowserRouter } from "react-router-dom"



describe('Progress component', () => {
    it("shows 'no progress' block if guessedWords === 0", () => {
     render(<BrowserRouter><ProgressList /></BrowserRouter>)
    
     let guessedWordsArray = []
        expect(screen.getByTestId('progress')).toBeInTheDocument()
    })
   
    
})
  