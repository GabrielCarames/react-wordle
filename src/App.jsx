import { useMemo, useState } from "react"
import Notification from "./components/Notification"
import FinishedGame from "./components/FinishedGame"
import Keyboard from "./components/Keyboard"
import Navbar from "./components/Navbar"
import Words from "./components/Words"
import { wordListArray } from "./hooks/wordsList"

function App() {
    const [finishedGame, setFinishedGame] = useState(false)
    const [insertedWords, setInsertedWords] = useState([])
    const [showNotification, setShowNotification] = useState({state: false, message: ""})
    const [words, setWords] = useState([
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}]
    ])
    const {wordsList, winnerWord} = useMemo(() => wordListArray(), [])

    return (
        <div className="App">
            {showNotification.state && <Notification showNotification={showNotification} setShowNotification={setShowNotification} />}
            {finishedGame.state && <FinishedGame finishedGame={finishedGame} setFinishedGame={setFinishedGame} winnerWord={winnerWord} />}
            <Navbar finishedGame={finishedGame} setFinishedGame={setFinishedGame} />
            <Words words={words} 
                setWords={setWords} 
                setFinishedGame={setFinishedGame} 
                insertedWords={insertedWords} 
                setInsertedWords={setInsertedWords} 
                wordsList= {wordsList}
                winnerWord={winnerWord}
                setShowNotification={setShowNotification}
            />
            <Keyboard insertedWords={insertedWords} />
        </div>
    )
}

export default App
