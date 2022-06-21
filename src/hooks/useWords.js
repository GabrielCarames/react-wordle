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
        const wordInserted = words[currentWordIndex]
        let winnerWordCopy = winnerWord.split('')
        let matches = []
        wordInserted.forEach(letter => {
            let indexOfFoundLetter = null
            if(matches.includes(letter)) indexOfFoundLetter = indexOfFoundLetter.lastIndexOf(letter)
            else indexOfFoundLetter = winnerWordCopy.indexOf(letter)
            console.log("jarra", indexOfFoundLetter)
            if(indexOfFoundLetter !== -1) { //ahora queda decir si ademas de encontrar la letra, indicar en que index se encuentra
                matches.push({letter: letter, index: indexOfFoundLetter})
                winnerWordCopy.splice(indexOfFoundLetter, 1, "")
            }
        })
        setInsertedWords([...insertedWords, matches])
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

    const getLetterAndIndexMatches = (letter, index) => {
        console.log("insertedWords", insertedWords, insertedWords.length)
        return insertedWords[currentWordIndex -insertedWords.length].find(insertedLetter => {
            return index ? insertedLetter.letter === letter && insertedLetter.index === index : insertedLetter.letter === letter
        })
    }

    const handleWordClassName = (letter, letterIndex, wordIndex) => {
        console.log("letter", letter, "letterIndex", letterIndex, "wordIndex", wordIndex, "currentWordIndex", currentWordIndex)
        if(wordIndex <= currentWordIndex-1 && currentWordIndex >= 1) {
            if(getLetterAndIndexMatches(letter, letterIndex)) return "word__letter correct"
            else if(getLetterAndIndexMatches(letter)) return "word__letter almost"
            else return "word__letter wrong"
        } else {
            if(letter !== "") return "word__letter active"
            else return "word__letter"
        }
    }

    return {handleWordClassName}
}
