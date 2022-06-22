import { useRef, useState } from "react"
import { useWords } from "../hooks/useWords"

export default function Words({words, setWords, setFinishedGame, insertedWords, setInsertedWords}) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const wordsDivRef = useRef()
    const {handleLetterClassName, handleLetterStyle} = useWords(currentWordIndex, setCurrentWordIndex, words, setWords, wordsDivRef, setFinishedGame, insertedWords, setInsertedWords)

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