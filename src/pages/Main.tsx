import React from "react"
import CustomButton from "../UI/CustomButton";
import classes from "./Main.module.css"



const Main: React.FC = () => {
  return (
    <div className={classes.main}>
      <h1>Your current level: 1</h1>
      <h2>Number of guessed words: 2</h2>
      <label htmlFor="input">Enter RegEx for "123test"</label>
      <input type="text" id="input" />
      <div className={classes.actionButtons}>
          <CustomButton name="skip"/>
          <CustomButton name="submit" />
      </div>
    </div>
  )
}

export default Main
