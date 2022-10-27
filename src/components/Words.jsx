import { useRef, useState } from "react"
import { handleLetterStyle } from "../hooks/handleLetterStyle"
import { useWords } from "../hooks/useWords"

export default function Words({
  words,
  setWords,
  setFinishedGame,
  insertedWords,
  setInsertedWords,
  winnerWord,
  setShowNotification
}) {
  const getSavedCurrentIndex = () => {
    const words = JSON.parse(localStorage.getItem("words"))
    if (!words) return
    const currentIndex = words.findIndex(word => word[0].letter === "")
    return currentIndex
  }

  const [currentWordIndex, setCurrentWordIndex] = useState(
    getSavedCurrentIndex() ? getSavedCurrentIndex() : 0
  )
  const wordsDivRef = useRef()
  const { handleLetterClassName } = useWords(
    currentWordIndex,
    setCurrentWordIndex,
    words,
    setWords,
    wordsDivRef,
    setFinishedGame,
    insertedWords,
    setInsertedWords,
    winnerWord,
    setShowNotification
  )

  return (
    <section className="table">
      <div className="words" ref={wordsDivRef}>
        {words.map((word, wordIndex) => (
          <ul className={currentWordIndex === wordIndex ? "word active" : "word"} key={wordIndex}>
            {word.map((letter, letterIndex) => (
              <li
                className={handleLetterClassName(letter.letter)}
                style={handleLetterStyle(letter.bgColor)}
                key={letterIndex}
              >
                {letter.letter}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
