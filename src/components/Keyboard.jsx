import { useKeyboard } from "../hooks/useKeyboard"
import deleteIcon from '../icons/delete.svg'
export default function Keyboard() {
    const {keyboard} = useKeyboard()
    
    return (
        <div className="keyboard">
            {
                keyboard.map((row, index) => 
                    <div className="row" key={index}>
                        {
                            row.map((key, index) =>
                                key === "borrar" ? <button className="keyboard__key" key={index}><img className="keyboard__key--delete" src={deleteIcon} alt="Borrar letra"/></button>
                                : <button className="keyboard__key" key={index}>{key}</button>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
