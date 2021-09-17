import { mergeClasses } from '@material-ui/styles'
import {useContext} from 'react'
import { RegexContext } from "../store/regex-context"
import classes from './ProgressItem.module.css'

import Card from "../UI/Card"

const ProgressItem: React.FC<{word?: string, regex?: string}> = (props) => {
    const regExContext = useContext(RegexContext)
    const { guessedRegExArray } = regExContext

  return (

    <Card>
      <h3 className={classes.wordName}>{props.word}</h3>
      <h5 className={classes.regexName}>{guessedRegExArray.length && guessedRegExArray[0]}</h5>
    </Card>
  )
}

export default ProgressItem
