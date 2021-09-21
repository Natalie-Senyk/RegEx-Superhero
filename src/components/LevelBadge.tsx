import { RegexContext } from "../store/regex-context"
import { useContext } from "react"
import classes from "./LevelBadge.module.css"
import Newbee from '../assets/newbee.png'
import Pro from '../assets/pro.png'
import Mid from '../assets/mid.png'
import {millisecondsToMinutes} from 'date-fns'

type TimeProps = {
    time: number
}

const LevelBadge: React.FC<TimeProps> = (props) => {
    const regExContext = useContext(RegexContext)
    const {numberOfGuessedWords} = regExContext
    let convertedTimeResult = millisecondsToMinutes(props.time)

    // if (convertedTimeResult > 59){
    //     convertedTimeResult = millisecondsToMinutes(props.time) 
    // }

    let level;

    if (numberOfGuessedWords < 15) {
        level = "NEWBEE"
    }
    if (numberOfGuessedWords >= 15 && numberOfGuessedWords < 25) {
        level = "MID"
    } 
    if (numberOfGuessedWords >= 25) {
        level = "MID"
    } 
    let imgBadge;
    if (level === 'NEWBEE'){
        imgBadge = Newbee
    }
    if (level === 'MID') {
        imgBadge = Mid
    }
    if (level === 'PRO') {
        imgBadge = Pro
    }
    


    return (
        <div>
            <h1 className={classes.level}>Congrats, your level is {level}!</h1>
            <h4 className={classes.time}>{convertedTimeResult === 0 ? `Great job! You did it in less than a minute!` : `It took you ${convertedTimeResult} min`}</h4>
            <div className={classes.badge}>
            <img  data-testid="badge" src={imgBadge} alt="level badge" className="animate__animated animate__swing animate__delay-1s"/>
            </div>
        </div>
    )

}

export default LevelBadge