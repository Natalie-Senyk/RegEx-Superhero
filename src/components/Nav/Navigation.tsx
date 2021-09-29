import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import classes from "./Navigation.module.css"
import { AuthContext } from "../../store/auth-context"
import PopOver from "../../UI/PopOver"

const Navigation: React.FC = () => {
  const authCtx = useContext(AuthContext)

  const { token } = authCtx

  const logoutHandler = () => {
    authCtx.logout()
  }

  return (
    <header className={classes.header}>
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
