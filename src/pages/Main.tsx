import React from "react"
import CustomButton from "../UI/CustomButton"
import Input from "../components/Input"
import classes from "./Main.module.css"
import MainImage from '../assets/main.png'

const Main: React.FC = () => {
  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <h1>
          Your current level: <span className={classes.badge}>1</span>
        </h1>
        <h2>Number of guessed words: <span className={classes.wordNumber}>2</span></h2>
        <p>Enter RegEx for "123test"</p>
        <Input />
        <div className={classes.actionButtons}>
          <CustomButton name="skip" />
          <CustomButton name="submit" />
        </div>
      </div>
      <img src={MainImage} alt="girl with cards" />
    </div>
  )
}

export default Main
