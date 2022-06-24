import { useEffect, useState } from "react"
import github from "../icons/github.svg"
import close from "../icons/close.svg"
import Statistic from "./Statistic"

export default function FinishedGame({finishedGame, setFinishedGame, winnerWord}) {
    const [timeLeft, setTimeLeft] = useState()
    const [statistics, setStatistics] = useState(JSON.parse(localStorage.getItem("statistics")) ? JSON.parse(localStorage.getItem("statistics")) : [{number: 0, text: "Partidas"}, {number: "0%", text: "Ganadas"}, {number: 0, text: "Racha"}, {number: 0, text: "Mejor Racha"}])

    useEffect(() => {
        console.log(finishedGame.state, localStorage.getItem("alreadyPlayed"))
        if(finishedGame.result === "win" && JSON.parse(localStorage.getItem("alreadyPlayed")).shouldPlay === true) {
            const statisticsCopy = statistics
            statisticsCopy[0].number += 1
            statisticsCopy[2].number += 1
            statisticsCopy[3].number += 1
            statisticsCopy[1].number = `${Math.round(statisticsCopy[2].number / statisticsCopy[0].number * 100)}%`
            localStorage.setItem("alreadyPlayed", JSON.stringify({shouldPlay: false, result: "win", winnerWord: winnerWord}))
            localStorage.setItem("statistics", JSON.stringify(statisticsCopy))
            setStatistics(statisticsCopy)
        }
    }, [finishedGame])

    useEffect(() => {
        let count = setInterval(() => {
            console.log("hora actualizada matame por favor")
            const date_future = new Date(new Date().getFullYear() +1, 0, 1)
            const date_now = new Date()
            let seconds = Math.floor((date_future - (date_now))/1000)
            let minutes = Math.floor(seconds/60)
            let hours = Math.floor(minutes/60)
            const days = Math.floor(hours/24)
            hours = hours-(days*24)
            minutes = minutes-(days*24*60)-(hours*60)
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60)
            setTimeLeft([formatTime(hours), formatTime(minutes), formatTime(seconds)])
        }, 1000)
        return () => clearInterval(count)
    }, [])

    const formatTime = (time) => {
        if(time >= 1 && time <= 9) return "0" + time
        else return time
    }
    
    return (
        <section className="finished-game">
            <div className="modal">
                <button className="close" onClick={() => setFinishedGame({...finishedGame, state: false})}><img className="close__icon" src={close} alt="Cerrar modal" /></button>
                <div className={finishedGame.result || JSON.parse(localStorage.getItem("alreadyPlayed")).shouldPlay === false ? "header" : "header no-data"}>
                    <h1 className="finished-game__title">¡Has {finishedGame.result === "win" || JSON.parse(localStorage.getItem("alreadyPlayed")).result ? "ganado" : "perdido"}!</h1>
                    <h2 className="finished-game__winner-word">La palabra era <span className="finished-game__winner-word--bold">{winnerWord.word}</span></h2>
                    <h2 className="finished-game__no-data">Juega para obtener más datos</h2>
                </div>
                <ul className="statistics">
                    {
                        statistics.map((statistic, index) =>
                            <Statistic number={statistic.number} text={statistic.text} key={index} />
                        )
                    }
                </ul>
                <div className="data">
                    {
                        finishedGame.result || JSON.parse(localStorage.getItem("alreadyPlayed")).shouldPlay === false ?
                        <div className="time-left">
                            <p className="time-left__text">Nueva palabra en:</p>
                            {timeLeft && `${timeLeft[0]}:${timeLeft[1]}:${timeLeft[2]}`}
                        </div>
                        : <></>
                    }
                    <div className="github">
                        <a className="github__button" href="https://github.com/GabrielCarames" target="_blank" rel="noreferrer">
                            <img className="github__logo" src={github} alt="Logo de github" />
                            <p className="github__text">Repositorio</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}