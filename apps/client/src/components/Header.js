//react components
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
//npm modules
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {LinkContainer} from 'react-router-bootstrap'


const Header = ({title, loggedIn, setLoggedIn}) => {

    const logout = async () => {
        const res = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            }
        })

        const data = await res.json()
        checkUser()
    }

    const checkUser = async () => {
        const res = await fetch('/check')
        const data = await res.json()

        if(data) setLoggedIn(true)
        else setLoggedIn(false)
    }

    checkUser()

    const navUser = () => {
        if(loggedIn){
            return (
                <Nav>
                    <LinkContainer to="anime"><Nav.Link>Anime</Nav.Link></LinkContainer>
                    <LinkContainer to="library"><Nav.Link>Library</Nav.Link></LinkContainer>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <LinkContainer to="profile"><NavDropdown.Item href="">Profile</NavDropdown.Item></LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
        return (
            <Nav>
                <LoginModal setLoggedIn={setLoggedIn} />
                <RegisterModal setLoggedIn={setLoggedIn} />
            </Nav>
        )
    }
    
    return <header>
        <Navbar>
            <Navbar.Brand>{title}</Navbar.Brand>
            {navUser()}
        </Navbar>
    </header>
}

export default Header