import { useEffect, useState } from "react"
import Statistic from "./Statistic"
import github from "../icons/github.svg"
import close from "../icons/close.svg"

export default function FinishedGame({ finishedGame, setFinishedGame, winnerWord }) {
  const [timeLeft, setTimeLeft] = useState()
  const [statistics, setStatistics] = useState(
    JSON.parse(localStorage.getItem("statistics"))
      ? JSON.parse(localStorage.getItem("statistics"))
      : [
          { number: 0, text: "Partidas" },
          { number: "0%", text: "Ganadas" },
          { number: 0, text: "Racha" },
          { number: 0, text: "Mejor Racha" }
        ]
  )

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("alreadyPlayed")).canPlay === true) {
      const statisticsCopy = statistics
      console.log(statisticsCopy)
      switch (finishedGame.result) {
        case "win":
          statisticsCopy[0].number += 1
          statisticsCopy[2].number += 1
          statisticsCopy[3].number += 1
          statisticsCopy[1].number = `${Math.round(
            (statisticsCopy[2].number / statisticsCopy[0].number) * 100
          )}%`
          localStorage.setItem(
            "alreadyPlayed",
            JSON.stringify({ canPlay: false, result: "win", winnerWord: winnerWord })
          )
          localStorage.setItem("statistics", JSON.stringify(statisticsCopy))
          setStatistics(statisticsCopy)
          break
        case "lose":
          statisticsCopy[0].number += 1
          if (statisticsCopy[2].number > statisticsCopy[3].number)
            statisticsCopy[3].number += statisticsCopy[2].number
          statisticsCopy[1].number = `${Math.floor(
            (statisticsCopy[2].number / statisticsCopy[0].number) * 100
          )}%`
          statisticsCopy[2].number = 0
          localStorage.setItem(
            "alreadyPlayed",
            JSON.stringify({ canPlay: false, result: "lose", winnerWord: winnerWord })
          )
          localStorage.setItem("statistics", JSON.stringify(statisticsCopy))
          setStatistics(statisticsCopy)
          break
      }
    }
  }, [finishedGame])

  useEffect(() => {
    let count
    let everySecond = 0
    if (JSON.parse(localStorage.getItem("alreadyPlayed")).canPlay === false) {
      count = setInterval(() => {
        const date_future = new Date(new Date().getFullYear() + 1, 0, 1)
        const date_now = new Date()
        let seconds = Math.floor((date_future - date_now) / 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        hours = hours - days * 24
        minutes = minutes - days * 24 * 60 - hours * 60
        seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
        everySecond = 1000
        setTimeLeft([formatTime(hours), formatTime(minutes), formatTime(seconds)])
      }, everySecond)
    }
    return () => clearInterval(count)
  }, [])

  const formatTime = time => {
    if (time >= 1 && time <= 9) return "0" + time
    else return time
  }

  return (
    <section className="finished-game">
      <div className="modal">
        <button
          className="close"
          onClick={() => setFinishedGame({ ...finishedGame, state: false })}
        >
          <img className="close__icon" src={close} alt="Cerrar modal" />
        </button>
        <div
          className={
            finishedGame.result ||
            JSON.parse(localStorage.getItem("alreadyPlayed")).canPlay === false
              ? "header"
              : "header no-data"
          }
        >
          <h1 className="finished-game__title">
            ¡Has{" "}
            {finishedGame.result === "win" ||
            JSON.parse(localStorage.getItem("alreadyPlayed")).result === "win"
              ? "ganado"
              : "perdido"}
            !
          </h1>
          <h2 className="finished-game__winner-word">
            La palabra era{" "}
            <span className="finished-game__winner-word--bold">{winnerWord.word}</span>
          </h2>
          <h2 className="finished-game__no-data">Juega para obtener más datos</h2>
        </div>
        <ul className="statistics">
          {statistics.map((statistic, index) => (
            <Statistic number={statistic.number} text={statistic.text} key={index} />
          ))}
        </ul>
        <div className="data">
          {finishedGame.result ||
          JSON.parse(localStorage.getItem("alreadyPlayed")).canPlay === false ? (
            <div className="time-left">
              <p className="time-left__text">Nueva palabra en:</p>
              {timeLeft && `${timeLeft[0]}:${timeLeft[1]}:${timeLeft[2]}`}
            </div>
          ) : (
            <></>
          )}
          <div className="github">
            <a
              className="github__button"
              href="https://github.com/GabrielCarames/react-wordle"
              target="_blank"
              rel="noreferrer"
            >
              <img className="github__logo" src={github} alt="Logo de github" />
              <p className="github__text">Repositorio</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
