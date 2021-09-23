import { AuthContext } from "../store/auth-context"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Logout from "../pages/Logout"
import userEvent from "@testing-library/user-event"


describe("Login/Logout Component", () => {

  it("renders Login Form correctly", () => {

    const contextItems = {
        enteredEmail: "",
        enteredPassword: "",
        enterEmail: jest.fn(),
        enterPassword: jest.fn(),
        isLogin: true,
        handleIsLogin: jest.fn(),
        fetchData: jest.fn(),
        isLoading: false,
        token: null,
        login: jest.fn(),
        logout: jest.fn(),
      }
 
    
    render(
        <AuthContext.Provider value ={contextItems}>
          <Logout />
        </AuthContext.Provider>
      )

    expect(screen.getByText(/Login to RegEx/)).toBeInTheDocument()
  })
  it("renders button with the text 'Login' initially", () => {
    const contextItems = {
        enteredEmail: "",
        enteredPassword: "",
        enterEmail: jest.fn(),
        enterPassword: jest.fn(),
        isLogin: true,
        handleIsLogin: jest.fn(),
        fetchData: jest.fn(),
        isLoading: false,
        token: null,
        login: jest.fn(),
        logout: jest.fn(),
      }

  
    
    render(
        <AuthContext.Provider value ={contextItems}>
          <Logout />
        </AuthContext.Provider>
      )
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()
  })
  it('renders "Create new account" under login button', () => {
    const contextItems = {
        enteredEmail: "",
        enteredPassword: "",
        enterEmail: jest.fn(),
        enterPassword: jest.fn(),
        isLogin: true,
        handleIsLogin: jest.fn(),
        fetchData: jest.fn(),
        isLoading: false,
        token: null,
        login: jest.fn(),
        logout: jest.fn(),
      }
  
    
    render(
        <AuthContext.Provider value ={contextItems}>
          <Logout />
        </AuthContext.Provider>
      )
    
    const newAccountText = screen.getByText("Create new account", {
      exact: false,
    })
    expect(newAccountText).toBeVisible()
  })
  
  it('renders "Login with existing account" - if clicked on Create new acc', () => {

    const contextItems = {
        enteredEmail: "",
        enteredPassword: "",
        enterEmail: jest.fn(),
        enterPassword: jest.fn(),
        isLogin: false,
        handleIsLogin: jest.fn(),
        fetchData: jest.fn(),
        isLoading: false,
        token: null,
        login: jest.fn(),
        logout: jest.fn(),
      }
  
    
    render(
        <AuthContext.Provider value ={contextItems}>
          <Logout />
        </AuthContext.Provider>
      )
      const existingAccountText = screen.getByText("Login with existing account", {
        exact: false,
      })
      expect(existingAccountText).toBeVisible()
  })
  it('calls out the function when login button is clicked', () => {

    const contextItems = {
        enteredEmail: 'user@user.com',
        enteredPassword: '123',
        enterEmail: jest.fn(),
        enterPassword: jest.fn(),
        isLogin: true,
        handleIsLogin: jest.fn(),
        fetchData: jest.fn(),
        isLoading: false,
        token: 'some string',
        login: jest.fn(),
        logout: jest.fn(),
      }
  
    
    render(
        <AuthContext.Provider value ={contextItems}>
          <Logout/>
        </AuthContext.Provider>
      )
 
      const button = screen.getByRole('button', {name: 'Login'})
      userEvent.type(screen.getByTestId('username'), 'user@user.com')
      userEvent.type(screen.getByTestId('password'), '123')
      userEvent.click(button)
      expect(screen.getByTestId('password')).toHaveTextContent('Password is too short')
  })
})
