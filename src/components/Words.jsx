import { useRef, useState } from "react"
import { useWords } from "../hooks/useWords"

function Words() {
    const [currentWord, setCurrentWord] = useState(0)
    const [words, setWords] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ])
    const wordsDivRef = useRef()
    useWords(currentWord, setCurrentWord, words, setWords, wordsDivRef)

    return (
        <section className="table">
            <div className="words" ref={wordsDivRef}>
                {
                    words.map((word, index) => 
                        <ul className="word" key={index}>
                            {
                                word.map((letter, index) =>
                                    <li className={letter.length >= 1 ? "word__letter active" : "word__letter"} key={index}>
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