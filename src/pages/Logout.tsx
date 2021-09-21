import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, InputAdornment, TextField } from "@material-ui/core"
import LogoutImage from "../assets/logout-image.svg"
import classes from './Logout.module.css'
import { AccountCircle } from "@material-ui/icons"
import PasswordInput from "../UI/PasswordInput"
import PrimaryButton from "../UI/PrimaryButton"


const useStyles = makeStyles((theme) => ({
   
  logoutField: {
    // margin: theme.spacing(1),
    width: "30ch",

  },
}))

const Logout: React.FC = () => {
    // const [errorMessage, setErrorMessage] = useState(false)
    const errorMessage = false
    const styles = useStyles()
  return (
    <div className={classes.logout}>
      <div className={classes.content}>
        <h1>Sign In to RegEx <span className={classes.superhero}>Superhero</span></h1>
        <p>
          Please, fill in the necessary details to log in and start your
          journey!
        </p>
        <form>
          <TextField
            className={styles.logoutField}
            error={errorMessage}
            id="filled-basic"
            label={
              errorMessage ? "Fill in this field" : "Username"
            }
            helperText={errorMessage && "Username or password cannot be empty!"}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
          />
          <PasswordInput />
          <PrimaryButton customStyle={true} name="Sign In" />
          <Button className={classes.buttonStyle} color="primary">Create new account</Button>
        </form>
      </div>
      <img src={LogoutImage} alt="logout" />
    </div>
  )
}

export default Logout
