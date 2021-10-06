import { Timer } from "@material-ui/icons"
import { useContext, useEffect, useState } from "react"
import { RegexContext } from "../store/regex-context"
import { AuthContext } from "../store/auth-context"
import classes from "./TimeTracker.module.css"
import { useLocation } from "react-router-dom"
import { format, startOfSecond } from "date-fns"

const TimeTracker = () => {
  const [time, setTime] = useState<string | Date>("00: 00: 00")
  const [initialTime, setInitialTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)
  const location = useLocation()
  const { pathname } = location

  const regExContext = useContext(RegexContext)
  const authCtx = useContext(AuthContext)
  const { timerIsActive, updateTimeResultStatement } = regExContext
  const { token } = authCtx

  useEffect(() => {
    setInitialTime(Date.now())
  }, [])

  useEffect(() => {
    pathname !== "/" && setEndTime(Date.now())
  }, [pathname])

  useEffect(() => {
    let interval: any = null
    if (timerIsActive) {
      const date = startOfSecond(new Date())
      interval = setInterval(() => {
        setTime(format(date, "hh:mm:ss"))
      }, 1000)
    } else if (token === null) {
      clearInterval(interval)
    }
    updateTimeResultStatement(initialTime, endTime)

    return () => clearInterval(interval)
  }, [
    time,
    timerIsActive,
    token,
    updateTimeResultStatement,
    initialTime,
    endTime,
  ])

  return (
    <div className={classes.timer}>
      <Timer />
      <div className={classes.timeFormat}>
        <span>{time} </span>
      </div>
    </div>
  )
}

export default TimeTracker
