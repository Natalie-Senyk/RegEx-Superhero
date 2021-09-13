import React from "react"
import { NavLink } from "react-router-dom"
import classes from "./Navigation.module.css"

const Navigation: React.FC = () => {
  return (
    <header className={classes.header}>
      <span>/r/e/g/e/x/ </span>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact>
              Game
            </NavLink>
          </li>
          <li>
            <NavLink to="/progress">Progress</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
