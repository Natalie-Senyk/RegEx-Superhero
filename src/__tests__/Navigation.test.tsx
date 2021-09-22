import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Router } from "react-router-dom"
import "@testing-library/jest-dom/extend-expect"
import { createMemoryHistory } from "history"
import Navigation from "../components/Nav/Navigation"
import { AuthContext } from "../store/auth-context"

describe("React Router", () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    render(
      <AuthContext.Provider value={contextItems}>
        <Router history={history}>
          <Navigation />
        </Router>
      </AuthContext.Provider>
    )
  })

  type contextProps = {
    enteredEmail: string
    enteredPassword: string
    enterEmail: (value: string) => void
    enterPassword: (value: string) => void
    isLogin: boolean
    handleIsLogin: () => void
    fetchData: (
      emailErrorMessage: (status: boolean) => void,
      passwordErrorMessage: (status: boolean) => void
    ) => void
    isLoading: boolean
    token: null | string
    login: (token: string) => void
    logout: () => void
  }
  const contextItems: contextProps = {
    enteredEmail: "",
    enteredPassword: "",
    enterEmail: () => {},
    enterPassword: () => {},
    isLogin: true,
    handleIsLogin: () => {},
    fetchData: () => {},
    isLoading: false,
    token: "some string",
    login: () => {},
    logout: () => {},
  }
  it("should contain link to Home page in the header", () => {
    const navbar = screen.getByTestId("navbar")
    const link = screen.getByTestId("home")
    expect(navbar).toContainElement(link)
  })
 
})
