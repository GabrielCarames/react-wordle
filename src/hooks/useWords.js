import { useEffect, useMemo, useState } from "react"
import { wordListArray } from "./wordsList"

export const useWords = (currentWordIndex, setCurrentWordIndex, words, setWords, wordsDivRef) => {
    const [insertedWords, setInsertedWords] = useState([])
    const [switchShake, setSwitchShake] = useState(false)
    const {wordsList, winnerWord} = useMemo(() => wordListArray(), []) 
    let timeoutId = 0

    useEffect(() => {
        keydownEvent()
    }, [words, currentWordIndex, switchShake])
    
    const keydownEvent = () => {
        window.addEventListener("keydown", (event) => {
            if(event.repeat) return
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                const key = event.key
                const currentLetterIndex = getCurrentLetterIndex()
                let wordsCopy = words 
                switch (key) {
                    case "Enter": handleEnter()
                        break;
                    case "Backspace": removeLetterFromWord(currentLetterIndex, wordsCopy)
                        break;
                    default: addLetterToWord(currentLetterIndex, key, wordsCopy, event)
                        break;
                }
            }, 0)
        }, {once : true})
    }
    
    const getMatchingLetters = () => {
        words[currentWordIndex].filter((letter, index) => {
            console.log(letter, winnerWord.split('')[index])
            letter === winnerWord.split('')[index]
        })
        

        setInsertedWords([...insertedWords, words[currentWordIndex].filter((letter, index) => letter === winnerWord.split('')[index])])
    }

    const addLetterToWord = (currentLetterIndex, letter, wordsCopy, event) => {
        if(event.key.length === 1 && event.key.match(/[a-z]/i)) {
            wordsCopy[currentWordIndex][currentLetterIndex] = letter
            setWords([...wordsCopy])
        }
    }

    const removeLetterFromWord = (currentLetterIndex, wordsCopy) => {
        if(currentLetterIndex === -1) wordsCopy[currentWordIndex][words[currentWordIndex].length -1] = ""
        else wordsCopy[currentWordIndex][currentLetterIndex -1] = ""
        setWords([...wordsCopy])
    }

    const getCurrentLetterIndex = () => words[currentWordIndex].findIndex(letter => letter === "")
    
    const checkWord = () => {
        const wordToCheck = words[currentWordIndex].join("")
        const foundWord = wordsList.find(word => word === wordToCheck)
        if(foundWord) {
            getMatchingLetters(foundWord)
            return true
        } else return false 
    }

    const handleEnter = () => {
        const foundWord = checkWord()
        foundWord ? setCurrentWordIndex(currentWordIndex + 1) : wrongWord()
    }

    const wrongWord = () => {
        wordsDivRef.current.childNodes[currentWordIndex].className = "word shake"
        setTimeout(() => {
            wordsDivRef.current.childNodes[currentWordIndex].className = "word"
            setSwitchShake(!switchShake)
        }, 200)
    }

    const handleWordClassName = (letter) => {
        if(currentWordIndex >= 1) {
            console.log("holadsadasd", insertedWords[currentWordIndex -1])
            if(insertedWords[currentWordIndex -1].find(letter => letter === letter)) {
                return "word__letter correct"
            } else return "word__letter wrong"
        } else {
            if(letter.length >= 1) {
                return "word__letter active"
            } else {
                return "word__letter"
            }
        }
    }

    return {handleWordClassName}
}
