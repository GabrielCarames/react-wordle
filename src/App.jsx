import { useState } from "react"
import FinishedGame from "./components/FinishedGame"
import Keyboard from "./components/Keyboard"
import Navbar from "./components/Navbar"
import Words from "./components/Words"

function App() {
    const [finishedGame, setFinishedGame] = useState(false)
    const [insertedWords, setInsertedWords] = useState([])
    const [words, setWords] = useState([
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}]
    ])
    return (
    <div className="App">
        {finishedGame.state && <FinishedGame finishedGame={finishedGame} />}
        <Navbar />
        <Words words={words} setWords={setWords} setFinishedGame={setFinishedGame} insertedWords={insertedWords} setInsertedWords={setInsertedWords} />
        <Keyboard insertedWords={insertedWords} />
    </div>
    )
}

export default App
