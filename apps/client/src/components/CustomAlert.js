import Alert from 'react-bootstrap/Alert'
import {useState, useEffect} from 'react'

function CustomAlert({alerts, setAlerts}){
    const [showAlert, setShowAlert] = useState(false)

    const handleClose = () => {
        setShowAlert(false)
        setAlerts({variant: '', msgs: []})
    }

    useEffect( () => {
        if(!showAlert && alerts.msgs.length) setShowAlert(true)

        const timer = setTimeout(() => {
            handleClose()
          }, 3000)

        return () => clearTimeout(timer)
    }, [alerts])

    return <Alert className='alertCon' show={showAlert} variant={alerts.variant} dismissible={true} onClose={handleClose}>
                <p style={{whiteSpace: 'pre-line'}}>{alerts.msgs.join(`\n`)}</p>
            </Alert>
    
}

export default CustomAlert