import helpLogo from '../icons/help.svg'
import settingsLogo from '../icons/settings.svg'

function Navbar() {
  return (
    <nav className="navbar">
        <img className="navbar__logo" src={helpLogo} alt="Ayuda" />
        <h1 className="navbar__title">WORDLE CLONE</h1>
        <img className="navbar__logo" src={settingsLogo} alt="Configuración" />
    </nav>
  )
}

export default Navbar