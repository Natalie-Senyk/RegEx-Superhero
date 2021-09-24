import { AuthContext } from "../store/auth-context"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Logout from "../pages/Logout"
import userEvent from "@testing-library/user-event"

let contextItems = {
  enteredEmail: "",
  enteredPassword: "",
  enterEmail: jest.fn(),
  enterPassword: jest.fn(),
  isLogin: true,
  handleIsLogin: jest.fn(),
  fetchData: jest.fn(),
  isLoading: false,
  token: "",
  login: jest.fn(),
  logout: jest.fn(),
}

describe("Login/Logout Component", () => {
  it("renders Login Form correctly", async () => {
    render(
      <AuthContext.Provider value={contextItems}>
        <Logout />
      </AuthContext.Provider>
    )

    expect(screen.getByText("Login to RegEx")).toBeVisible()
  })
  it("renders button with the text 'Login' initially", () => {
    render(
      <AuthContext.Provider value={contextItems}>
        <Logout />
      </AuthContext.Provider>
    )

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()
  })
  it('renders "Create new account" under login button', () => {
    render(
      <AuthContext.Provider value={contextItems}>
        <Logout />
      </AuthContext.Provider>
    )
    const newAccountText = screen.getByText("Create new account", {
      exact: false,
    })
    expect(newAccountText).toBeVisible()
  })

  it("calls out the function when login button is clicked", () => {
    contextItems = {
      ...contextItems,
      enteredEmail: "user@user.com",
      enteredPassword: "123",
      token: "some string",
    }
    render(
      <AuthContext.Provider value={contextItems}>
        <Logout />
      </AuthContext.Provider>
    )

    const button = screen.getByRole("button", { name: "Login", hidden: true })
    userEvent.type(screen.getByTestId("username"), "user@user.com")
    userEvent.type(screen.getByTestId("password"), "123")
    userEvent.click(button)
    expect(screen.getByTestId("password")).toHaveTextContent(
      "Password is too short"
    )
  })
  it('renders "Login with existing account" - if clicked on Create new acc', () => {
    contextItems = { ...contextItems, isLogin: false }
    render(
      <AuthContext.Provider value={contextItems}>
        <Logout />
      </AuthContext.Provider>
    )
    const existingAccountText = screen.getByText(
      "Login with existing account",
      {
        exact: false,
      }
    )
    expect(existingAccountText).toBeInTheDocument()
  })
})
