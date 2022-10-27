import { useEffect, useMemo, useState } from "react"
import { getWinnerWord } from "./hooks/getWinnerWord"
import Notification from "./components/Notification"
import FinishedGame from "./components/FinishedGame"
import Instructions from "./components/Instructions"
import Keyboard from "./components/Keyboard"
import Navbar from "./components/Navbar"
import Words from "./components/Words"

function App() {
  const [finishedGame, setFinishedGame] = useState(false)
  const [instructions, setInstructions] = useState(false)
  const [insertedWords, setInsertedWords] = useState([])
  const [showNotification, setShowNotification] = useState({ state: false, message: "" })
  const [words, setWords] = useState([
    [
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" }
    ],
    [
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" }
    ],
    [
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" }
    ],
    [
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" }
    ],
    [
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" }
    ],
    [
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" },
      { letter: "", bgColor: "white" }
    ]
  ])
  const [winnerWord, setWinnerWord] = useState("")
  useMemo(() => getWinnerWord(setWinnerWord), [])
  useEffect(() => {
    winnerWord && console.log("Solo para curiosos: ", winnerWord)
  }, [winnerWord])

  return (
    <div className="App">
      {showNotification.state && (
        <Notification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      )}
      {finishedGame.state && (
        <FinishedGame
          finishedGame={finishedGame}
          setFinishedGame={setFinishedGame}
          winnerWord={winnerWord}
        />
      )}
      {instructions && <Instructions setInstructions={setInstructions} />}
      <Navbar
        finishedGame={finishedGame}
        setFinishedGame={setFinishedGame}
        setInstructions={setInstructions}
      />
      <Words
        words={words}
        setWords={setWords}
        setFinishedGame={setFinishedGame}
        insertedWords={insertedWords}
        setInsertedWords={setInsertedWords}
        winnerWord={winnerWord}
        setShowNotification={setShowNotification}
      />
      <Keyboard insertedWords={insertedWords} />
    </div>
  )
}

export default App
