import { useRef, useState } from "react"
import { handleLetterStyle } from "../hooks/handleLetterStyle"
import { useWords } from "../hooks/useWords"

export default function Words({words, setWords, finishedGame, setFinishedGame, insertedWords, setInsertedWords, wordsList, winnerWord}) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const wordsDivRef = useRef()
    const {handleLetterClassName} = useWords(currentWordIndex, setCurrentWordIndex, words, setWords, wordsDivRef, finishedGame, setFinishedGame, insertedWords, setInsertedWords, wordsList, winnerWord)

    return (
        <section className="table">
            <div className="words" ref={wordsDivRef}>
                {
                    words.map((word, wordIndex) => 
                        <ul className={currentWordIndex === wordIndex ? "word active" : "word"} key={wordIndex}>
                            {
                                word.map((letter, letterIndex) =>
                                    <li className={handleLetterClassName(letter.letter)} style={handleLetterStyle(letter.bgColor)} key={letterIndex}>
                                        {letter.letter}
                                    </li>
                                )
                            }
                        </ul> 
                    )
                }
            </div>
        </section>
    )
}