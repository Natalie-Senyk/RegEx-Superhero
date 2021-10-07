import { Timer } from "@material-ui/icons"
import { useContext, useEffect } from "react"
import { RegexContext } from "../store/regex-context"
import classes from "./TimeTracker.module.css"
import { useLocation } from "react-router-dom"
import { useStopwatch } from "react-timer-hook"

const TimeTracker = () => {
  const location = useLocation()
  const { pathname } = location

  const regExContext = useContext(RegexContext)
  const { updateTimeResultStatement } = regExContext

  const { seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: true,
  })

  useEffect(() => {
    updateTimeResultStatement(minutes, hours)
  }, [updateTimeResultStatement, minutes, hours])

  useEffect(() => {
    pathname !== "/" ? pause() : start()
  }, [pathname])

  return (
    <div className={classes.timer}>
      <Timer />
      <div className={classes.timeFormat}>
        <span>{hours < 10 ? "0" + hours : hours}:</span>
        <span>{minutes < 10 ? "0" + minutes : minutes}:</span>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
    </div>
  )
}

export default TimeTracker
