import React, { useState, useEffect } from "react";

export default function Pomodoro() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);

    //change logic - separate pomodoro & breaks
    useEffect(() => {
        //set interval every 1000ms
        let interval = setInterval(() => {
            clearInterval(interval); //always clear
            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else {//timer finished
                    //if displaymsg true(break done) then start next pomodoro session
                    //else start break (5 minutes)
                    let minutes = displayMessage ? 24 : 4;
                    let seconds = 59;
                    setMinutes(minutes);
                    setSeconds(seconds);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds - 1);
            }
         }, 1000)
     }, [seconds]);
   
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return <div className="pomodoro">
        <button className="btn" id="timerBtns">POMODORO</button>
        <button className="btn" id="timerBtns">SHORT BREAK</button>
        <button className="btn" id="timerBtns">LONG BREAK</button>
        <div className="message">
        {displayMessage && "Break time! Next session starts in:"}
        </div>
        <div className="timer">
            {timerMinutes}:{timerSeconds}
        </div>
        <button className="btn" id="startBtn">START</button>
    </div>
}