//react components
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import Searchbar from './Searchbar'
//npm modules
import { useNavigate, Link } from 'react-router-dom'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'


const Header = ({auth, triggerAlerts}) => {
    const {check, loggedIn, setLoggedIn} = auth
    const navigate = useNavigate()

    const logout = async () => {
        const res = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            }
        })

        const data = await res.json()
        check()
        triggerAlerts({variant:'success', msgs:['Logged out']})
        navigate('/')
    }

    //changes color of logo svg to blue
    const colorFilter = 'invert(29%) sepia(94%) saturate(3267%) hue-rotate(210deg) brightness(102%) contrast(98%)'
    return <header>
        <Navbar>
            <Navbar.Brand>
                <Link to='/'><img className='navLogo' src={require('../assets/modalLogo.svg').default} style={{filter: colorFilter}} alt='logo'/></Link>
            </Navbar.Brand>
            <Nav 
            style={{display:
                loggedIn ? 'contents' : 'none'
                }}>
                    <Nav.Link as={Link} to='anime'>Anime</Nav.Link>
                    <Nav.Link as={Link} to='library'>Library</Nav.Link>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to='profile'>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav 
                style={{display:
                !loggedIn ? 'contents' : 'none'
                }}>
                <LoginModal setLoggedIn={setLoggedIn} triggerAlerts={triggerAlerts} />
                <RegisterModal setLoggedIn={setLoggedIn} triggerAlerts={triggerAlerts} />
            </Nav>
            <Searchbar />
        </Navbar>
    </header>
}

export default Header