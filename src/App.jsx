import { useMemo, useState } from "react"
import FinishedGame from "./components/FinishedGame"
import Keyboard from "./components/Keyboard"
import Navbar from "./components/Navbar"
import Words from "./components/Words"
import { wordListArray } from "./hooks/wordsList"

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
    const {wordsList, winnerWord} = useMemo(() => wordListArray(), []) 
    console.log("winnerWord", winnerWord)
    return (
        <div className="App">
            {finishedGame.state && <FinishedGame finishedGame={finishedGame} winnerWord={winnerWord} />}
            <Navbar />
            <Words words={words} 
                setWords={setWords} 
                setFinishedGame={setFinishedGame} 
                insertedWords={insertedWords} 
                setInsertedWords={setInsertedWords} 
                wordsList= {wordsList}
                winnerWord={winnerWord}
            />
            <Keyboard insertedWords={insertedWords} />
        </div>
    )
}

export default App
