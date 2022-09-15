import { Link } from "react-router-dom";
import logo from "../images/logo-white.svg";

function Header({ onClick, mail, route, title}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto"/>
      <nav className="header__auth">
        <p className="header__text">{mail}</p>
        <Link to={route} className="header__link" onClick={onClick}>{title}</Link>
      </nav>
    </header>
  )
}

export default Header;
