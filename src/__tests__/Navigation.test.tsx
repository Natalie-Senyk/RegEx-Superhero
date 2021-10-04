import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { BrowserRouter, Router } from "react-router-dom"
import "@testing-library/jest-dom/extend-expect"
import { createMemoryHistory } from "history"
import Navigation from "../components/Nav/Navigation"
import { AuthContext } from "../store/auth-context"


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
  token: undefined | string | null
  login: (token: string) => void
  logout: () => void
  error: string
}

  let contextItems: contextProps = {
    enteredEmail: "",
    enteredPassword: "",
    enterEmail: () => {},
    enterPassword: () => {},
    isLogin: true,
    handleIsLogin: () => {},
    fetchData: () => {},
    isLoading: false,
    token: null,
    login: () => {},
    logout: () => {},
    error: "",
  }

describe("Navigation", () => {

  it("should not contain link to Home page in the header if user is not logged in", () => {
    render(
      <AuthContext.Provider value={contextItems}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )
    const navbar = screen.getByTestId("navbar")
    const link = screen.queryByTestId("home")
    expect(link).toBeNull()
  })
  it("doesn`t render Progress link in the headera if token is null", () => {
    render(
      <AuthContext.Provider value={contextItems}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )
    const progressLink = screen.queryByText("progress")
    expect(progressLink).toBeNull()

  })
  it("renders Progress link in the headera if token is not null", () => {
    contextItems = {
      ...contextItems,
      token: 'some text'
    }
    render(
      <AuthContext.Provider value={contextItems}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )
    const progressLink = screen.getByText("Progress")
    expect(progressLink).toBeVisible()

  })
  it("renders three list items in the header if token is not null", () => {
    contextItems = {
      ...contextItems,
      token: 'some text'
    }
    render(
      <AuthContext.Provider value={contextItems}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )
    const listElements = screen.getAllByRole('listitem')
    expect(listElements).toHaveLength(3)

  })
  it("renders one list item (Log In) in the header if token is null", async() => {
    contextItems = {
      ...contextItems,
      token: null
    }
    render(
      <AuthContext.Provider value={contextItems}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthContext.Provider>
    )
    const listElements = await screen.findAllByRole('listitem')
    expect(listElements).toHaveLength(1)

  })
})
