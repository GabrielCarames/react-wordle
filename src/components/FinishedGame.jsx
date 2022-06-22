export default function FinishedGame({finishedGame}) {
    return (
        <section className="finished-game">
            <div className="modal">
                <h1 className="finished-game__title">¡Has {finishedGame.result === "win" ? "ganado" : "perdido"}!</h1>
                <h2 className="github">Visita mi repositorio</h2>
            </div>
        </section>
    )
}