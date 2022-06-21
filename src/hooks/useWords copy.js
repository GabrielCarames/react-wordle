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
            if(indexOfFoundLetter !== -1) {
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

    const getLetterResult = (letter, word, wordIndex, letterIndex) => {
        const correctLetter = insertedWords[wordIndex].some(insertedLetter => insertedLetter.letter === letter && insertedLetter.index === letterIndex)
        const almostLetter = insertedWords[wordIndex].find(insertedLetter => insertedLetter.letter === letter)
        const letterMatchesInAnotherIndex = insertedWords[wordIndex].some(insertedLetter => insertedLetter.letter === letter && insertedLetter.index !== letterIndex)
        const numberOfTimesletterIsRepeated = word.filter(insertedLetter => insertedLetter === letter).length
        const maxAmountOfLettersRepeatedAllowed = insertedWords[wordIndex].filter(insertedLetter => insertedLetter.letter === letter).length
        console.log(`me fijo que la letra ${letter} este en el indice y sea la letra correcta`, correctLetter)
        console.log("me fijo que exista pero no este en el índice:", insertedWords[wordIndex].some(insertedLetter => insertedLetter.letter === letter && insertedLetter.index !== letterIndex), "me fijo cuantas veces se repite la letra en la palabra que metí:", word.filter(insertedLetter => insertedLetter === letter).length, "me fijo cuantas letras de R hay en la palabra ganadora", maxAmountOfLettersRepeatedAllowed)
        const repeatedLetterThatShouldBeWrong = letterIndex === word.lastIndexOf(letter) || letterIndex === word.indexOf(letter)
        console.log("cosa", letterIndex, word.lastIndexOf(letter))
        if(correctLetter) return "word__letter correct"
        else if(almostLetter) {
            if(repeatedLetterThatShouldBeWrong && numberOfTimesletterIsRepeated > maxAmountOfLettersRepeatedAllowed) return "word__letter wrong"
            else return "word__letter almost"
        }
        else if(letterMatchesInAnotherIndex && numberOfTimesletterIsRepeated > maxAmountOfLettersRepeatedAllowed) return "word__letter wrong"
        else return "word__letter wrong"
    }

    const handleWordClassName = (letter, letterIndex, word, wordIndex) => {
        console.log("letter", letter, "letterIndex", letterIndex, "word", word.join(''), "wordIndex", wordIndex, "currentWordIndex", "currentWordIndex", currentWordIndex, "insertedWords", insertedWords, "words", words)
        if(word.join('') === words[wordIndex].join('') && currentWordIndex > wordIndex) return getLetterResult(letter, word, wordIndex, letterIndex)
        else {
            if(letter !== "") return "word__letter active"
            else return "word__letter"
        }
    }

    return {handleWordClassName}
}
