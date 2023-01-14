import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const RegisterModal = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const onSubmit = (e) => {
        e.preventDefault()
        const email = e.target.elements.signupEmail.value
        const pw = e.target.elements.signupPassword.value
        console.log(email, pw)
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
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='signupEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter your email' />
                    </Form.Group>
                    <Form.Group controlId='signupPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
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