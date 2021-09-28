import React, { useState } from "react"

type AuthContextObj = {
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
}

export const AuthContext = React.createContext<AuthContextObj>({
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
})

const AuthContextProvider: React.FC = (props) => {
  const initialToken = localStorage.getItem('token')
  const [enteredEmail, setEnteredEmail] = useState<string>("")
  const [enteredPassword, setEnteredPassword] = useState<string>("")
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [token, setToken] = useState<string | undefined | null>(initialToken)

  function loginHandler(token: string) {
    setToken(token)
    localStorage.setItem('token', token)
  }
  function logoutHandler() {
    setToken(null)
    setEnteredEmail("")
    setEnteredPassword("")
    localStorage.removeItem('token')
  }

  function enterEmail(value: string) {
    setEnteredEmail(value)
  }
  function enterPassword(value: string) {
    setEnteredPassword(value)
  }

  function handleLogin() {
    setIsLogin((prev) => !prev)
  }

  let url: string
  if (isLogin) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiGf0rtiDfeXmOmoVyIsZ4AG6aoNZguHY"
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiGf0rtiDfeXmOmoVyIsZ4AG6aoNZguHY"
  }

  function fetchData(
    emailErrorMessage: (status: boolean) => void,
    passwordErrorMessage: (status: boolean) => void
  ) {
    setIsLoading(true)
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail.toLowerCase(),
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false)
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              emailErrorMessage(true)
              passwordErrorMessage(true)
            }
          })
        }
      })
      .then((data) => {
        loginHandler(data.idToken)
     
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const contextValue: AuthContextObj = {
    enteredEmail: enteredEmail,
    enteredPassword: enteredPassword,
    enterEmail: enterEmail,
    enterPassword: enterPassword,
    isLogin: isLogin,
    handleIsLogin: handleLogin,
    fetchData: fetchData,
    isLoading: isLoading,
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
