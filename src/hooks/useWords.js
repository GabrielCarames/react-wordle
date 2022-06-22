import { useEffect, useMemo, useState } from "react"
import { useKeyboard } from "./useKeyboard"
import { wordListArray } from "./wordsList"

export const useWords = (currentWordIndex, setCurrentWordIndex, words, setWords, wordsDivRef) => {
    const [switchShake, setSwitchShake] = useState(false)
    const {wordsList, winnerWord} = useMemo(() => wordListArray(), []) 
    const {setCurrentKey} = useKeyboard()
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

    const addLetterToWord = (currentLetterIndex, letter, wordsCopy, event) => {
        if(event.key.length === 1 && event.key.match(/[a-z\u00f1]/i) && currentLetterIndex !== -1){
            wordsCopy[currentWordIndex][currentLetterIndex].letter = letter
            setWords([...wordsCopy])
            setCurrentKey([...letter])
        } else shake()
    }

    const removeLetterFromWord = (currentLetterIndex, wordsCopy) => {
        setCurrentKey(["borrar"])
        switch (currentLetterIndex) {
            case 0: shake()
                break;
            case -1: 
                wordsCopy[currentWordIndex][wordsCopy[currentWordIndex].length -1].letter = ""
                setWords([...wordsCopy])
                break;
            default:
                wordsCopy[currentWordIndex][currentLetterIndex -1].letter = ""
                setWords([...wordsCopy])
                break;
        }
    }

    const getCurrentLetterIndex = () => words[currentWordIndex].findIndex(letter => letter.letter === "")

    const shake = () => {
        wordsDivRef.current.childNodes[currentWordIndex].className = "word shake"
        setTimeout(() => {
            wordsDivRef.current.childNodes[currentWordIndex].className = "word active"
            setSwitchShake(!switchShake)
        }, 200)
    }

    const handleEnter = () => {
        setCurrentKey(["enviar"])
        if(checkCurrentWordInWordList()) successWord() 
        else shake()
    }

    const successWord = () => {
        let winnerWordArray = winnerWord.split('')
        words[currentWordIndex].forEach((letter, index) => {
            let currentLetterInWords = words[currentWordIndex][index]
            if(winnerWordArray[index] === letter.letter) {
                currentLetterInWords.bgColor = "green"
                winnerWordArray[index] = null
            } else if (winnerWordArray.includes(letter.letter) && letter.bgColor !== "green") {
                currentLetterInWords.bgColor = "yellow"
                winnerWordArray[winnerWordArray.indexOf(letter.letter)] = null
            } else currentLetterInWords.bgColor = "grey"
        })
        wordAnimation()
        setCurrentWordIndex(currentWordIndex + 1)
    }

    const checkCurrentWordInWordList = () => {
        const wordToCheck = words[currentWordIndex].map(letter => letter.letter).join("")
        const foundWord = wordsList.find(word => word === wordToCheck)
        return foundWord
    }

    const handleLetterClassName = letter => letter !== "" ? "word__letter active" : "word__letter"

    const handleLetterStyle = bgColor => {
        switch (bgColor) {
            case "grey": return {backgroundColor: "#787C7E", border: "2px solid #787C7E", color: "#FFFFFF"}
            case "green": return {backgroundColor: "#6AAA64", border: "2px solid #6AAA64", color: "#FFFFFF"}
            case "yellow": return {backgroundColor: "#C9B458", border: "2px solid #C9B458", color: "#FFFFFF"}
        }
    }

    const wordAnimation = () => {
        wordsDivRef.current.childNodes[currentWordIndex].className = "word success"
        setTimeout(() => {
            wordsDivRef.current.childNodes[currentWordIndex].className = "word"
        }, 1500)
    }

    return {handleLetterClassName, handleLetterStyle}
}