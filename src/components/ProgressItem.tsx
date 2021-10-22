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
        <span className={classes.regexName} data-testid="regex">
        {props.regex}
        </span>
        <h3
          data-testid="words" className={classes.wordName}
        >
          {cardWord}
        </h3>
        <h5 className={classes.time}>
        Time: {props.time}
        </h5>
      </Card>
    )
  }

export default React.memo(ProgressItem, () => true)
