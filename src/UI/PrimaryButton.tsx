import React, {useContext} from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Icon from "@material-ui/core/Icon"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import { RegexContext } from "../store/regex-context"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  custom: {
    margin: theme.spacing(2),
    width: "20ch",
    display: "flex",
    marginLeft: '15%'
  },
}))

type ButtonProps = {
  name: string
  customStyle?: boolean
  onClick?: () => void
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles()
  const regExContext = useContext(RegexContext)
  const { numberOfGuessedWords } = regExContext

  const endIcon =
    props.name === "submit" ? (
      <Icon>send</Icon>
    ) : props.name === "skip" ? (
      <DoubleArrowIcon>skip</DoubleArrowIcon>
    ) : (
      <MeetingRoomIcon>Sign In</MeetingRoomIcon>
    )


  return (
    <Button
      variant="contained"
      type={props.name === "submit" ? "submit" : "button"}
      color="primary"
      className={!props.customStyle ? classes.button : classes.custom}
      endIcon={endIcon}
      onClick={props.onClick}
      disabled={numberOfGuessedWords === 30}
    >
      {props.name}
    </Button>
  )
}

export default PrimaryButton
