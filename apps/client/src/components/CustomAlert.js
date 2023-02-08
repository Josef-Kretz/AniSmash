import Alert from 'react-bootstrap/Alert'
import {useState} from 'react'

function CustomAlert({alerts, setAlerts, dismissible=true}){
    const [showAlert, setShowAlert] = useState(false)

    if(!alerts.msgs) return
    const message = alerts.msgs.join(`\n`)

    const handleClose = () => {
        setShowAlert(false)
        setAlerts({variant: '', msgs: []})
    }
    
    if(!showAlert && alerts.msgs.length){
        setShowAlert(true)
    }

    return <Alert className='alertCon' show={showAlert} variant={alerts.variant} dismissible={dismissible} onClose={handleClose}>
                <p style={{whiteSpace: 'pre-line'}}>{message}</p>
            </Alert>
    
}

export default CustomAlert