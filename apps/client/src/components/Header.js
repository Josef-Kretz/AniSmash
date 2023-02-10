//react components
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import Searchbar from './Searchbar'
//npm modules
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {LinkContainer} from 'react-router-bootstrap'


const Header = ({title, loggedIn, setLoggedIn, triggerAlerts}) => {
    const navigate = useNavigate()

    const logout = async () => {
        const res = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            }
        })

        const data = await res.json()
        checkUser()
        triggerAlerts({variant:'success', msgs:['Logged out']})
        navigate('/')
    }

    const checkUser = async () => {
        const res = await fetch('/check')
        const data = await res.json()

        if(data) setLoggedIn(true)
        else setLoggedIn(false)
    }

    useEffect( () => {
        checkUser()
    },[loggedIn])
    //changes color of logo svg to blue
    const colorFilter = 'invert(29%) sepia(94%) saturate(3267%) hue-rotate(210deg) brightness(102%) contrast(98%)'
    return <header>
        <Navbar>
            <Navbar.Brand><img className='navLogo' src={require('../assets/result2.svg').default} style={{filter: colorFilter}} /></Navbar.Brand>
            <Nav 
            style={{display:
                loggedIn ? 'contents' : 'none'
                }}>
                    <LinkContainer to="anime"><Nav.Link>Anime</Nav.Link></LinkContainer>
                    <LinkContainer to="library"><Nav.Link>Library</Nav.Link></LinkContainer>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <LinkContainer to="profile"><NavDropdown.Item href="">Profile</NavDropdown.Item></LinkContainer>
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