import { useRef, useState } from "react"
import { useWords } from "../hooks/useWords"

function Words() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [words, setWords] = useState([
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}],
        [{letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}, {letter: "", bgColor: "white"}]
    ])
    const wordsDivRef = useRef()
    const {handleLetterClassName, handleLetterStyle} = useWords(currentWordIndex, setCurrentWordIndex, words, setWords, wordsDivRef)

    return (
        <section className="table">
            <div className="words" ref={wordsDivRef}>
                {
                    words.map((word, wordIndex) => 
                        <ul className="word" key={wordIndex}>
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

export default Words