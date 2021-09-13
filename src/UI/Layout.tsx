import React from "react"
import Navigation from "../components/Nav/Navigation"
import classes from "./Layout.module.css"

const Layout: React.FC = (props) => {
  return (
    <div>
      <Navigation />
      <main className={classes.layout}>{props.children}</main>
    </div>
  )
}

export default Layout
