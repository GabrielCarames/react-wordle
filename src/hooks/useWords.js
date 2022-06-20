import { useEffect, useMemo, useState } from "react"
import { wordListArray } from "./wordsList"

export const useWords = (currentWord, setCurrentWord, words, setWords, wordsDivRef) => {
    const [switchShake, setSwitchShake] = useState(false)
    const wordsList = useMemo(() => wordListArray(), []) 

    useEffect(() => {
        keydownEvent()
    }, [words, currentWord, switchShake])
    
    const keydownEvent = () => {
        let timeoutId = 0
        window.addEventListener("keydown", (event) => {
            if(event.repeat) return
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                const key = event.key
                const currentLetterIndex = getCurrentLetterIndex()
                let wordsCopy = words 
                switch (key) {
                    case "Enter":
                        const finishedWord = checkWord()
                        if(finishedWord !== -1) setCurrentWord(currentWord + 1)
                        else {
                            wordsDivRef.current.childNodes[currentWord].className = "word shake"
                            setTimeout(() => {
                                wordsDivRef.current.childNodes[currentWord].className = "word"
                                setSwitchShake(!switchShake)
                            }, 200)
                        }
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
        if(event.key.length === 1 && event.key.match(/[a-z]/i)) {
            wordsCopy[currentWord][currentLetterIndex] = letter
            setWords([...wordsCopy])
        }
    }

    const removeLetterFromWord = (currentLetterIndex, wordsCopy) => {
        if(currentLetterIndex === -1) wordsCopy[currentWord][words[currentWord].length -1] = ""
        else wordsCopy[currentWord][currentLetterIndex -1] = ""
        setWords([...wordsCopy])
    }

    const getCurrentLetterIndex = () => words[currentWord].findIndex(letter => letter === "")
    
    const checkWord = () => {
        const wordToCheck = words[currentWord].join("")
        const wordIndex = wordsList.findIndex(word => word === wordToCheck)
        return wordIndex
    }

    return {}
}
