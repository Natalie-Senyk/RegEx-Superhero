import { render, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Router } from "react-router-dom"
import '@testing-library/jest-dom/extend-expect'
import {createMemoryHistory} from 'history'
import Navigation from "../components/Nav/Navigation"


describe('React Router', () => {
    it('should render the home page', () => {
        const history = createMemoryHistory()
        const {container, getByText, getByTestId} = render(
            <Router history={history}>
            <Navigation />
            </Router>
        )
        const navbar = getByTestId('navbar')
        const link = getByTestId('home')
        expect(container.innerHTML).toMatch('Game')
        expect(navbar).toContainElement(link)
    })
    it('should navigate to page', () => {
        const history = createMemoryHistory()
        const {container, getByTestId} = render(
            <Router history={history}>
            <Navigation />
            </Router>
        )
        fireEvent.click(getByTestId('home'))
        expect(container.innerHTML).toMatch('Game')
    })
    
})