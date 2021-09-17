import {useContext} from 'react'
import { RegexContext } from "../store/regex-context"
import classes from './ProgressItem.module.css'

import Card from "../UI/Card"

const ProgressItem: React.FC<{word: string, wordIndex: number}> = (props) => {
    const regExContext = useContext(RegexContext)
    const { guessedRegExArray } = regExContext

  return (

    <Card>
      <h3 className={classes.wordName}>{props.word}</h3>
      <h5 className={classes.regexName}>{guessedRegExArray.filter((regex, index) => index === props.wordIndex)}</h5>
    </Card>
  )
}

export default ProgressItem
