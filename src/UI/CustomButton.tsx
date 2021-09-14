import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Icon from "@material-ui/core/Icon"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

type ButtonProps = {
  name: string;
  
}

const CustomButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles()


  return (
    <Button
      variant="contained"
      type={props.name === 'submit' ? "submit" : "button"}
      color="primary"
      className={classes.button}
      endIcon={
        props.name === "submit" ? (
          <Icon>send</Icon>
        ) : (
          <DoubleArrowIcon>skip</DoubleArrowIcon>
        )
      }
    >
      {props.name}
    </Button>
  )
}

export default CustomButton
