import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "30ch",
    marginBottom: '30px',
    marginTop: '20px'
  },
}))

type InputAdornmentValues = {
  password: string
  showPassword: boolean
}

const PasswordInput: React.FC = () => {
  const classes = useStyles()

  const [values, setValues] = React.useState<InputAdornmentValues>({
    password: "",
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
  };
  return (
    <div className={classes.root}>
      <FormControl className={clsx(classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  )
}

export default PasswordInput
