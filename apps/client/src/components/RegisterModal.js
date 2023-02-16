import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const RegisterModal = ({setLoggedIn, triggerAlerts}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () =>  setShow(true)

    const onSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.elements.signupEmail.value
        const pw = e.target.elements.signupPassword.value
        const confirmPw = e.target.elements.confirmSignupPassword.value 

        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: email, password: pw, confirmPassword: confirmPw})
        })

        const data = await res.json()
        
        if(data.isError === true){
            triggerAlerts({variant: 'warning', msgs : data.msgs})
        }
        else{
            triggerAlerts({variant: 'success', msgs: data.msgs})
            setLoggedIn(true)
            setShow(false)
        }
    }

    return ( <>
        <Button id='regButton' variant='primary' onClick={handleShow}>
            Register
        </Button>
        <Modal show={show} fullscreen={true} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Register</Modal.Title>
                <Button onClick={handleClose}>X</Button> 
            </Modal.Header>
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