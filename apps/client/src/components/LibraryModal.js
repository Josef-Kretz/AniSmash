import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const LibraryModal = ({show, setShow, animeId}) => {
    const closeModal = () => setShow(false)

    return <Modal className='libraryModal' show={show} fullscreen={true}>
        <Modal.Header><Button onClick={closeModal}>&#11160;</Button></Modal.Header>
        <Modal.Body>
            <iframe className='modalFrame' src={`library/${animeId}`} />
        </Modal.Body> 
    </Modal>
}

export default LibraryModal