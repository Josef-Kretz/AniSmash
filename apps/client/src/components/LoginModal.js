import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const LoginModal = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const onSubmit = (e) => {
        e.preventDefault()
        const email = e.target.elements.loginEmail.value
        const pw = e.target.elements.loginPassword.value
        console.log(email, pw)
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