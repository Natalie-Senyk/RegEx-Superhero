import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { InputAdornment, TextField } from "@material-ui/core"
import LogoutImage from "../assets/logout-image.svg"
import classes from "./AuthForm.module.css"
import { AccountCircle } from "@material-ui/icons"
import PrimaryButton from "../UI/PrimaryButton"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { AuthContext } from "../store/auth-context"
// import {RouteComponentProps} from 'react-router-dom'

const useStyles = makeStyles(() => ({
  logoutField: {
    width: "30ch",
  },
}))

const AuthForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>()
  const [errorEmailMessage, setErrorEmailMessage] = useState<boolean>(false)
  const [errorPasswordMessage, setErrorPasswordMessage] =
    useState<boolean>(false)
  const styles = useStyles()
  const authCtx = useContext(AuthContext)
  const { enteredEmail } = authCtx
  const { enteredPassword } = authCtx
  const { enterEmail } = authCtx
  const { enterPassword } = authCtx
  const { isLogin } = authCtx
  const { handleIsLogin } = authCtx
  const { fetchData } = authCtx
  const { isLoading } = authCtx
  const history = useHistory()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const switchAuthModeHandler = () => {
    handleIsLogin()
  }
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    enterPassword(e.target.value)
  }

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    enterEmail(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!enteredEmail.includes("@")) {
      setErrorEmailMessage(true)
      return
    }

    if (enteredPassword.trim().length < 8) {
      setErrorPasswordMessage(true)
      return
    }
    fetchData(setErrorEmailMessage, setErrorPasswordMessage)
    history.replace('/')
  }
  return (
    <div className={classes.logout}>
      <div className={classes.content}>
        <h1>
          {isLogin ? "Login" : "Sign Up"} to RegEx
          <span className={classes.superhero}>Superhero</span>
        </h1>
        <p>
          Please, fill in the necessary details to log in and start your
          journey!
        </p>
        <form onSubmit={submitHandler}>
          <TextField
            className={styles.logoutField}
            value={enteredEmail}
            onChange={emailChangeHandler}
            error={errorEmailMessage}
            data-testid="username"
            label={
              errorEmailMessage ? "Email address is not valid" : "Username"
            }
            helperText={
              errorEmailMessage && "Username cannot be empty and must contain @"
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={styles.logoutField}
            type={showPassword ? "text" : "password"}
            value={enteredPassword}
            onChange={passwordChangeHandler}
            data-testid="password"
            error={errorPasswordMessage}
            label={errorPasswordMessage ? "Password is too short" : "Password"}
            helperText={
              errorPasswordMessage && "Password must be at least 8 characters"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.buttonsStyle}>
            <PrimaryButton
              customStyle={true}
              name={isLogin ? "Login" : "Sign up"}
            />
            <p data-testid="paragraph" className={classes.newAccount} onClick={switchAuthModeHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </p>
          </div>
          {isLoading && <p className={classes.loading}>Sending request...</p>}
        </form>
      </div>
      <img src={LogoutImage} alt="logout" />
    </div>
  )
}

export default AuthForm
