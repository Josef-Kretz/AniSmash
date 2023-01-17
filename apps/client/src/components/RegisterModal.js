import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CustomAlert from './CustomAlert'
import LinkSaver from './LinkSaver'


const RegisterModal = ({setLoggedIn}) => {
    const [show, setShow] = useState(false)
    const [alerts, setAlerts] = useState({variant: '', msgs: []})

    const handleClose = () => setShow(false)
    const handleShow = () => {
        setAlerts({variant: '', msgs: []})
        setShow(true)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.elements.signupEmail.value
        const pw = e.target.elements.signupPassword.value
        const confirmPw = e.target.elements.confirmSignupPassword.value 

        const res = await fetch(LinkSaver.signupLink, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: email, password: pw, confirmPassword: confirmPw})
        })

        const data = await res.json()
        
        if(data.isError === true){
            setAlerts({variant: 'warning', msgs : data.msgs})
        }
        else{
            setAlerts({variant: 'success', msgs: data.msgs})
            setLoggedIn(true)
            //auto close after successful registration?
        }
    }

    return ( <>
        <Button variant='primary' onClick={handleShow}>
            Register
        </Button>
        <Modal show={show} fullscreen={true} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Register</Modal.Title>
                <Button onClick={handleClose}>X</Button> 
            </Modal.Header>
            <CustomAlert alerts={alerts} setAlerts={setAlerts} />
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='signupEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' name='email' placeholder='Enter your email' />
                    </Form.Group>
                    <Form.Group controlId='signupPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' placeholder='Password' />
                    </Form.Group>
                    <Form.Group controlId='confirmSignupPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' name='confirmPassword' placeholder='Confirm Password' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Register</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </>)
}

export default RegisterModal