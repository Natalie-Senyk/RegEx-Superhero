import React from "react"
import { NavLink } from "react-router-dom"
import classes from "./Navigation.module.css"

const Navigation: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}><NavLink to="/">/r/e/g/e/x/ </NavLink></div>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/" exact>
              Game
            </NavLink>
          </li>
          <li>
            <NavLink  activeClassName={classes.active} to="/progress">Progress</NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
