import { Timer } from '@material-ui/icons'
import {useContext, useEffect, useState} from 'react'
import { RegexContext } from "../store/regex-context"
import { AuthContext } from "../store/auth-context"
import classes from './TimeTracker.module.css'


const TimeTracker = () => {
const [seconds, setSeconds] = useState<number>(0);
const [minutes, setMinutes] = useState<number>(0);
const [hours, setHours] = useState<number>(0);

    const regExContext = useContext(RegexContext)
    const authCtx = useContext(AuthContext)
    const {timerIsActive, updateTimeResultStatement} = regExContext
    const {token} = authCtx
    

    useEffect(() => {
        let interval: any = null
        if (timerIsActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds < 59 ? seconds + 1 : seconds = 0)
            setMinutes(minutes => seconds === 59 ? minutes + 1 : minutes)
            setHours(hours => minutes === 59 && seconds === 59 ? hours + 1 : hours)
          }, 1000);
        } else if (token === null) {
          clearInterval(interval);
        }
        updateTimeResultStatement(seconds, minutes, hours)
        return () => clearInterval(interval);
      }, [timerIsActive, seconds, minutes, hours, token, updateTimeResultStatement]);

    return (
        <div className={classes.timer}>
            <Timer />
            <div className={classes.timeFormat}>
            <span>{hours < 10 ? '0' + hours : hours}:</span>
            <span>{minutes < 10 ? '0' + minutes : minutes}:</span>
            <span>{seconds < 10 ? '0' + seconds : seconds}</span>
            </div>
          
        </div>
    )

}

export default TimeTracker