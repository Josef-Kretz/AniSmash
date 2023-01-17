import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CustomAlert from './CustomAlert'
import LinkSaver from './LinkSaver'


const LoginModal = ({setLoggedIn}) => {
    const [show, setShow] = useState(false)
    const [alerts, setAlerts] = useState({variant: '', msgs: []})

    const handleClose = () => setShow(false)
    const handleShow = () => {
        setAlerts({variant: '', msgs: []})
        setShow(true)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.elements.loginEmail.value
        const pw = e.target.elements.loginPassword.value

        const res = await fetch(LinkSaver.loginLink, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: email, password: pw})
        })

        const data = await res.json()
        
        if(data.isError === true){
            setAlerts({variant: 'warning', msgs : data.msgs})
        }
        else{
            setAlerts({variant: 'success', msgs: data.msgs})
            setLoggedIn(true)
            //auto close after successful login?
        }
    }

    return ( <>
        <Button variant='primary' onClick={handleShow}>
            Login
        </Button>
        <Modal show={show} fullscreen={true} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
                <Button onClick={handleClose}>X</Button>
            </Modal.Header>
            <CustomAlert alerts={alerts} setAlerts={setAlerts} />
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='loginEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter your email' />
                    </Form.Group>
                    <Form.Group controlId='loginPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Login</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </>)
}

export default LoginModal