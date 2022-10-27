import { useEffect, useState } from "react"
import { getWordList } from "../services"
import { useKeyboard } from "./useKeyboard"

export const useWords = (
  currentWordIndex,
  setCurrentWordIndex,
  words,
  setWords,
  wordsDivRef,
  setFinishedGame,
  insertedWords,
  setInsertedWords,
  winnerWord,
  setShowNotification
) => {
  const [switchShake, setSwitchShake] = useState(false)
  const { setCurrentKey } = useKeyboard()
  let timeoutId = 0

  useEffect(() => {
    currentWordIndex >= 1 && checkGameFinished()
  }, [currentWordIndex])

  const checkGameFinished = () => {
    if (words[currentWordIndex - 1].every(letter => letter.bgColor === "green")) {
      setShowNotification({ state: true, message: "¡Palabra correcta!" })
      setTimeout(() => {
        setFinishedGame({ result: "win", state: true })
      }, 2000)
    } else if (currentWordIndex === 6) {
      setShowNotification({ state: true, message: "¡Has perdido!" })
      setTimeout(() => {
        setFinishedGame({ result: "lose", state: true })
      }, 2000)
    }
  }

  useEffect(() => {
    keydownEvent()
  }, [words, currentWordIndex, switchShake])

  const keydownEvent = () => {
    window.addEventListener(
      "keydown",
      event => {
        if (event.repeat) return
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          const key = event.key
          const currentLetterIndex = getCurrentLetterIndex()
          let wordsCopy = words
          switch (key) {
            case "Enter":
              handleEnter()
              break
            case "Backspace":
              removeLetterFromWord(wordsCopy, currentLetterIndex)
              break
            default:
              addLetterToWord(key.toLowerCase(), wordsCopy, currentLetterIndex)
              break
          }
        }, 0)
      },
      { once: true }
    )
  }

  const addLetterToWord = (letter, wordsCopy, currentLetterIndex) => {
    if (
      letter.length === 1 &&
      letter.match(/[a-z\u00f1]/i) &&
      currentLetterIndex !== -1 &&
      JSON.parse(localStorage.getItem("alreadyPlayed")).canPlay === true
    ) {
      wordsCopy[currentWordIndex][currentLetterIndex].letter = letter
      setWords([...wordsCopy])
      setCurrentKey([...letter])
    } else {
      if (JSON.parse(localStorage.getItem("alreadyPlayed")).canPlay === false)
        shake("Ya has jugado por hoy.")
      else shake("Caracter ingresado incorrecto.")
    }
  }

  const removeLetterFromWord = (wordsCopy, currentLetterIndex) => {
    setCurrentKey(["borrar"])
    switch (currentLetterIndex) {
      case 0:
        shake()
        break
      case -1:
        wordsCopy[currentWordIndex][wordsCopy[currentWordIndex].length - 1].letter = ""
        setWords([...wordsCopy])
        break
      default:
        wordsCopy[currentWordIndex][currentLetterIndex - 1].letter = ""
        setWords([...wordsCopy])
        break
    }
  }

  const getCurrentLetterIndex = () =>
    words[currentWordIndex].findIndex(letter => letter.letter === "")

  const shake = message => {
    wordsDivRef.current.childNodes[currentWordIndex].className = "word shake"
    message && setShowNotification({ state: true, message: message })
    setTimeout(() => {
      wordsDivRef.current.childNodes[currentWordIndex].className = "word active"
      setSwitchShake(!switchShake)
    }, 200)
  }

  const handleEnter = async () => {
    setCurrentKey(["enviar"])
    const foundWord = await checkCurrentWordInWordList()
    if (foundWord) {
      if (!foundWord) shake("No hay suficientes letras.")
      else successWord()
    } else shake("Palabra no encontrada en la lista.")
  }

  const successWord = () => {
    let winnerWordArray = winnerWord.word.split("")
    words[currentWordIndex].forEach((letter, index) => {
      let currentLetterInWords = words[currentWordIndex][index]
      if (winnerWordArray[index] === letter.letter) {
        currentLetterInWords.bgColor = "green"
        winnerWordArray[index] = null
      } else if (winnerWordArray.includes(letter.letter) && letter.bgColor !== "green") {
        currentLetterInWords.bgColor = "yellow"
        winnerWordArray[winnerWordArray.indexOf(letter.letter)] = null
      } else currentLetterInWords.bgColor = "grey"
    })
    wordAnimation()
    const insertedWord = words[currentWordIndex].map(letter => letter)
    setInsertedWords([...insertedWords, insertedWord])
    setCurrentWordIndex(currentWordIndex + 1)
  }

  const checkCurrentWordInWordList = async () => {
    const wordToCheck = words[currentWordIndex].map(letter => letter.letter).join("")
    const wordsList = await getWordList()
    if (wordToCheck.length <= 0) return
    const foundWord = wordsList.find(word => word === wordToCheck)
    return foundWord
  }

  const handleLetterClassName = letter => (letter !== "" ? "word__letter active" : "word__letter")

  const wordAnimation = () => {
    setTimeout(() => {
      wordsDivRef.current.childNodes[currentWordIndex].className = "word success"
      setTimeout(() => {
        wordsDivRef.current.childNodes[currentWordIndex].className = "word"
      }, 1500)
    }, 0)
  }

  return { handleLetterClassName }
}
