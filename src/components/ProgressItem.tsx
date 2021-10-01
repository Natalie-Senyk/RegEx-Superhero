import React from "react"
import classes from "./ProgressItem.module.css"

import Card from "../UI/Card"

type progressItemProps = {
  words: string[]
  regex: string
  time: string
}

const ProgressItem: React.FC<progressItemProps> = (props) => {
 

    const cardWord = props.words.map(word => <div key={word}>{word}</div>)

    return (
      <Card>
        <h3
          className={classes.wordName}
        >
          {cardWord}
        </h3>
        <span className={classes.time}>
          Time:{" "}
         {props.time}
        </span>
        <h5 className={classes.regexName}>
         {props.regex}
        </h5>
      </Card>
    )
  }

export default ProgressItem
