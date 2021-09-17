import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ProgressList from "../pages/ProgressList"



describe('Progress component', () => {
    it("shows 'no progress' block if guessedWords === 0", () => {
     render(<ProgressList />)
    
     let guessedWordsArray = []
        // expect(screen.getByTestId('progress')).toBeNull()
        // guessedWordsArray = ['firstWord']
        expect(screen.getByTestId('progress')).toBeInTheDocument()
    })
   
    
})
  