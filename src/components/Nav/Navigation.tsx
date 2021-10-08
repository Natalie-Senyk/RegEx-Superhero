import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import classes from "./Navigation.module.css"
import { AuthContext } from "../../store/auth-context"
import PopOver from "../../UI/PopOver"
import { RegexContext } from "../../store/regex-context"
import TimeTracker from "../TimeTracker"
import PrimaryButton from "../../UI/PrimaryButton"

const Navigation: React.FC = () => {
  const authCtx = useContext(AuthContext)
  const regExContext = useContext(RegexContext)
  const [showTimer, setShowTimer] = useState<boolean>(false)
  const { token } = authCtx
  const {launchTimer} = regExContext

  const logoutHandler = () => {
    authCtx.logout()
    regExContext.resetUserData()
  }

  const showTrackerHandler = () => {
    setShowTimer(true)
    launchTimer()
  }

  return (
    <header className={classes.header}>
      {!showTimer && (
        <PrimaryButton name="track time" onClick={showTrackerHandler} />
      )}
      {token !== null && showTimer && <TimeTracker />}
      <div className={classes.logo}>
        <NavLink to="/">/r/e/g/e/x/ </NavLink>
      </div>
      <nav data-testid="navbar">
        <ul>
          {token !== null && (
            <li>
              <NavLink
                data-testid="home"
                activeClassName={classes.active}
                to="/"
                exact
              >
                Game
              </NavLink>
            </li>
          )}
          {token !== null && (
            <li>
              <NavLink activeClassName={classes.active} to="/progress">
                Progress
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              activeClassName={classes.active}
              to="/login"
              onClick={logoutHandler}
            >
              {token !== null ? "Logout" : "Log In"}
            </NavLink>
            {token === null && <PopOver />}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
