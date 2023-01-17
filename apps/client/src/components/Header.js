//react components
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
//npm components
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/NavBar'
import NavDropdown from 'react-bootstrap/NavDropdown'


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
                    <Nav.Link>Anime Viewer</Nav.Link>
                    <Nav.Link>Collections</Nav.Link>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item href="">Profile</NavDropdown.Item>
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