import { useRef, useState } from "react"
import { useWords } from "../hooks/useWords"

function Words() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [words, setWords] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ])
    const wordsDivRef = useRef()
    const {handleWordClassName} = useWords(currentWordIndex, setCurrentWordIndex, words, setWords, wordsDivRef)

    return (
        <section className="table">
            <div className="words" ref={wordsDivRef}>
                {
                    words.map((word, index) => 
                        <ul className="word" key={index}>
                            {
                                word.map((letter, index) =>
                                    <li className={handleWordClassName(letter)} key={index}>
                                        {letter}
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