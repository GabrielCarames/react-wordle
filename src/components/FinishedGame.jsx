import { useEffect, useState } from "react"
import github from "../icons/github.svg"
import Statistic from "./Statistic"

export default function FinishedGame({finishedGame, winnerWord}) {
    const [timeLeft, setTimeLeft] = useState(null)
    const statistics = [{number: 1, text: "Partidas"}, {number: "100%", text: "Ganadas"}, {number: 2, text: "Racha"}, {number: 3, text: "Mejor Racha"}]

    useEffect(() => {
        setInterval(() => {
            const date_future = new Date(new Date().getFullYear() +1, 0, 1)
            const date_now = new Date()
            let seconds = Math.floor((date_future - (date_now))/1000)
            let minutes = Math.floor(seconds/60)
            let hours = Math.floor(minutes/60)
            const days = Math.floor(hours/24)
            hours = hours-(days*24)
            minutes = minutes-(days*24*60)-(hours*60)
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60)
            setTimeLeft([hours, minutes, seconds])
        }, 1000)
    }, [timeLeft])
    

    return (
        <section className="finished-game">
            <div className="modal">
                <div className="header">
                    <h1 className="finished-game__title">¡Has {finishedGame.result === "win" ? "ganado" : "perdido"}!</h1>
                    <h2 className="finished-game__winner-word">La palabra era <span className="finished-game__winner-word--bold">{winnerWord.word}</span></h2>
                </div>
                <ul className="statistics">
                    {
                        statistics.map((statistic, index) => 
                            <Statistic number={statistic.number} text={statistic.text} key={index} />
                        )
                    }
                </ul>
                <div className="data">
                    <div className="time-left">
                        <p className="time-left__text">Nueva palabra en:</p>
                        {timeLeft && `${timeLeft[0]}:${timeLeft[1]}:${timeLeft[2]}`}
                    </div>
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