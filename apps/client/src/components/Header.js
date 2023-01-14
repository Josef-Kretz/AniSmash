import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const Header = ({title}) => {
    return <header>
        {/* <img src={siteLogo} alt='site-logo' /> */}
        <h1>{title}</h1>
        <ul>
            <li><LoginModal /></li>
            <li><RegisterModal /></li>
        </ul>
    </header>
}

export default Header