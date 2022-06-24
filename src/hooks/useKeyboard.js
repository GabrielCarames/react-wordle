import { useEffect, useState } from "react"
import {handleLetterStyle} from '../hooks/handleLetterStyle'

export const useKeyboard = (insertedWords) => {
    const [currentKey, setCurrentKey] = useState([])
    const firstRow = ["q","w","e","r","t","y","u","i","o","p"]
    const secondRow = ["a","s","d","w","f","g","h","j","k","l","ñ"]
    const thirdRow = ["Enter","z","x","c","v","b","n","m","borrar"]
    const keyboard = [firstRow, secondRow, thirdRow]
    const keyboardTotalArray = firstRow.concat(secondRow).concat(thirdRow)

    useEffect(() => {
        if(currentKey.length >= 1) {
            const keyIndex = keyboardTotalArray.indexOf(currentKey[0])
            if(keyIndex >= 0 && keyIndex <= 9) changeKeyClassName(0, keyIndex)
            else if(keyIndex >= 10 && keyIndex <= 20) changeKeyClassName(1, keyIndex - 10)
            else if(keyIndex >= 21 && keyIndex <= 29) changeKeyClassName(2, keyIndex - 21)
        }
    }, [currentKey])

    const changeKeyClassName = (row, keyIndex) => {
        document.getElementsByClassName("keyboard")[0].childNodes[row].childNodes[keyIndex].className = "keyboard__key active"
        setTimeout(() => {
            document.getElementsByClassName("keyboard")[0].childNodes[row].childNodes[keyIndex].className = "keyboard__key"
        }, 500)
    }

    const keyUsed = key => {
        let letter = null
        for(let i = 0; i < insertedWords.length; i++) {
            const result = insertedWords[i].find(letter => letter.letter === key)
            if(result) {
                letter = result
                break
            }
        }
        if(letter) return handleLetterStyle(letter.bgColor)
    }

    const keyClicked = (key) => window.dispatchEvent(new KeyboardEvent('keydown', {'key': key}))

    return {keyboard, setCurrentKey, keyUsed, keyClicked}
}