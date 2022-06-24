import statisticsLogo from '../icons/statistics.svg'
import helpLogo from '../icons/help.svg'

export default function Navbar({finishedGame, setFinishedGame, setInstructions}) {
    return (
        <nav className="navbar">
            <img className="navbar__logo" src={helpLogo} alt="Ayuda" onClick={() => setInstructions(true)} />
            <h1 className="navbar__title">WORDLE CLONE</h1>
            <img className="navbar__logo" src={statisticsLogo} alt="Estadísticas" onClick={() => setFinishedGame({...finishedGame, state: true})} />
        </nav>
    )
}
