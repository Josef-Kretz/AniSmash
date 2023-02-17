import {useNavigate, useOutletContext} from 'react-router-dom'
import { useEffect } from 'react'

const Auth = ({children}) => {
    const {auth, triggerAlerts} = useOutletContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(auth.loggedIn == false) {
            triggerAlerts({variant: 'warning', msgs: ['User not logged in']})
            navigate('/')
        }
    }, [])

    return children
}

export default Auth