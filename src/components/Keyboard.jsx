import { useKeyboard } from "../hooks/useKeyboard"
import deleteIcon from '../icons/delete.svg'

export default function Keyboard({insertedWords}) {
    const {keyboard, keyUsed, keyClicked} = useKeyboard(insertedWords)
    
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