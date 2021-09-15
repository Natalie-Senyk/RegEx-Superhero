import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Icon from "@material-ui/core/Icon"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  custom: {
    margin: theme.spacing(2),
    width: "23ch",
    display: "flex",
  },
}))

type ButtonProps = {
  name: string
  customStyle?: boolean
  onClick?: () => void
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles()

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
    >
      {props.name}
    </Button>
  )
}

export default PrimaryButton
