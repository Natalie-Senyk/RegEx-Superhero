import React, { useContext } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Icon from "@material-ui/core/Icon"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import Timer from "@material-ui/icons/Timer"
import CachedIcon from '@material-ui/icons/Cached';
import { RegexContext } from "../store/regex-context"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  custom: {
    margin: theme.spacing(7),
    marginTop: "40px",
    marginBottom: "5px",
    width: "20ch",
  },
}))

type ButtonProps = {
  name: string
  customStyle?: boolean
  onClick?: () => void
  disabled?: boolean
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles()
  const regExContext = useContext(RegexContext)
  const { numberOfGuessedWords} = regExContext

  const endIcon =
    props.name === "submit" ? (
      <Icon>send</Icon>
    ) : props.name === "skip" ? (
      <DoubleArrowIcon>skip</DoubleArrowIcon>
    ) : props.name === "track time" ? (
      <Timer>track time</Timer>
    ) : props.name === "load more" ? (
      <CachedIcon>load more</CachedIcon>
    ) : (
      <MeetingRoomIcon>Sign In</MeetingRoomIcon>
    )

  return (
    <Button
      variant="contained"
      type={props.name === "skip" ? "button" : "submit"}
      color="primary"
      className={!props.customStyle ? classes.button : classes.custom}
      endIcon={endIcon}
      onClick={props.onClick}
      disabled={numberOfGuessedWords === 30 || props.disabled}
    >
      {props.name}
    </Button>
  )
}

export default PrimaryButton
