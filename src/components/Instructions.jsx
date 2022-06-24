import close from "../icons/close.svg"

export default function Instructions({setInstructions}) {
    const instructions = [
        {word: ["c", "l", "a", "v", "e"], text: "La letra C se encuentra en la palabra y en su posición correcta"},
        {word: ["m", "a", "g", "i", "a"], text: "La letra G se encuentra en la palabra pero en la posición incorrecta"},
        {word: ["v", "o", "l", "a", "r"], text: "La letra R no se encuentra en la palabra"}
    ]
    
    return (
        <section className="instructions">
            <div className="modal">
                <button className="close" onClick={() => setInstructions(false)}><img className="close__icon" src={close} alt="Cerrar modal" /></button>
                <h1 className="modal__title">Como jugar</h1>
                <p className="modal__description">Adivina la palabra en 6 intentos. Luego de cada intento, el color de las casilla va a cambiar para mostrar que tan cerca estas de la palabra correcta.</p>
                <ul className="list">
                    {
                        instructions.map((instruction, index) => {
                            return (
                                <li className="list__item" key={index}>
                                    <ul className="word">
                                        {
                                            instruction.word.map((letter, letterIndex) => 
                                                <li className="word__letter" key={letterIndex}>{letter}</li>
                                            )
                                        }
                                    </ul>
                                    <p className="list__text">{instruction.text}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <p className="modal__disclaimer">Este proyecto es una versión propia del juego original Wordle. <a className="modal__link" href="https://github.com/GabrielCarames/react-wordle" target="_blank">Puedes visitar el código aquí</a></p>
            </div>
        </section>
    )
}