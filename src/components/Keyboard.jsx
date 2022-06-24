import { handleLetterStyle } from "../hooks/handleLetterStyle"
import { useKeyboard } from "../hooks/useKeyboard"
import deleteIcon from '../icons/delete.svg'

export default function Keyboard({insertedWords}) {
    const {keyboard} = useKeyboard()
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

    return (
        <div className="keyboard">
            {
                keyboard.map((row, keyboardIndex) => 
                    <div className="row" key={keyboardIndex}>
                        {
                            row.map((key, rowIndex) =>
                                key === "borrar" ? <button className="keyboard__key" key={rowIndex} onClick={() => keyClicked("borrar")}><img className="keyboard__key--delete" src={deleteIcon} alt="Borrar letra"/></button>
                                : <button className="keyboard__key" id={key} style={keyUsed(key)} key={rowIndex} onClick={() => keyClicked(key)}>{key}</button>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
