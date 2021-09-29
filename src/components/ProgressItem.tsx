import React, { useState } from "react"
import { useContext } from "react"
import { RegexContext } from "../store/regex-context"
import classes from "./ProgressItem.module.css"

import Card from "../UI/Card"

const ProgressItem: React.FC<{ word: string; wordIndex: number }> = React.memo(
  (props) => {
    const [hover, setHover] = useState<boolean>(false)
    const regExContext = useContext(RegexContext)
    const { guessedRegExArray, guessedTime } = regExContext

    const cardHoverHandler = (
      e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
    ) => {
      setHover(true)
    }
    const cardLeaveHandler = (
      e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
    ) => {
      setHover(false)
    }

    let guessedRegExArrayTransformed: string[] = []

    for (let value of guessedRegExArray) {
      guessedRegExArrayTransformed = [
        ...guessedRegExArrayTransformed,
        value,
        value,
        value,
      ]
    }

    let guessedTimeTransformed: string[] = []

    for (let value of guessedTime) {
      guessedTimeTransformed = [...guessedTimeTransformed, value, value, value]
    }

    return (
      <Card>
        <h3
          onMouseEnter={cardHoverHandler}
          onMouseLeave={cardLeaveHandler}
          className={classes.wordName}
        >
          {hover
            ? guessedRegExArrayTransformed.filter(
                (regex, index) => index === props.wordIndex
              )
            : props.word}
        </h3>
        <span className={classes.time}>
          Time:{" "}
          {guessedTimeTransformed.filter(
            (time, index) => index === props.wordIndex
          )}
        </span>
        <h5 className={classes.regexName}>
          {guessedRegExArrayTransformed.filter(
            (regex, index) => index === props.wordIndex
          )}
        </h5>
      </Card>
    )
  }
)

export default ProgressItem
