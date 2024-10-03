import {Logo} from "./Logo"
import '../styles/header.css'

const Header = () => {
  return (
    <nav data-scroll-section className="header">
        <Logo />
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>
  )
}

export default Header