import React, { useState, useEffect } from "react";

export default function Pomodoro() {
    const STATUS = {
        pause: 0,
        start: 1,
        default: 2
    }
    const TIMER = {
        pomo: 0,
        short: 1,
        long: 2
    }
    
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [status, setStatus] = useState(STATUS.default);
    const [timer, setTimer] = useState(TIMER.pomo)
    const [sessions, setSessions] = useState(0);
    const intervalRef = React.useRef();

    function handler() {
        if (seconds === 0) {
            if (minutes === 0) {
                if (timer === 0) {
                    short();
                } else {
                    setDisplayMessage("Session completed!");
                    setSessions(sessions + 1);
                    stop();
                }
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } else {
            setSeconds(seconds - 1);
        }
    };

    useEffect(() => {
        if (status === STATUS.start) {
            intervalRef.current = setInterval(() => {
                handler()
            }, 1000);
        } else if (status === STATUS.pause && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [minutes, seconds, status]);


    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const start = () => setStatus(STATUS.start);
    const pause = () => setStatus(STATUS.pause);
    const stop = () => {
        setStatus(pause);
        pomo();
    }

    const pomo = () => {
        setTimer(TIMER.pomo);
        setMinutes(0);
        setSeconds(1);
        setDisplayMessage("Time to focus! Take a break in:");
    }
    const short = () => {
        setTimer(TIMER.short);
        setMinutes(0);
        setSeconds(5);
        setDisplayMessage("A short break to recharge!");
    }
    const long = () => {
        setTimer(TIMER.long);
        setMinutes(15);
        setSeconds(0);
        setDisplayMessage("Take a longer break, you deserve it!");
    }

    return <div className="pomodoro">
        <button className="btn" id="timerBtn1" onClick={() => pomo()}>POMODORO</button>
        <button className="btn" id="timerBtn2" onClick={() => short()}>SHORT BREAK</button>
        <button className="btn" id="timerBtn3" onClick={() => long()}>LONG BREAK</button>
        <div className="message">
            {displayMessage}
        </div>
        <div className="timer">
            {timerMinutes}:{timerSeconds}
        </div>
        <button className="btn" id="startBtn" onClick={() => start()}>START</button>
        <button className="btn" id="pauseBtn" onClick={() => pause()}>PAUSE</button>
        <button className="btn" id="stopBtn" onClick={() => stop()}>RESET</button>
        <div className="stats">
            Sessions completed: {sessions}
        </div>
    </div>

}
