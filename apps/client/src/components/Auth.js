import {useNavigate, useOutletContext} from 'react-router-dom'
import { useEffect } from 'react'

const Auth = ({children}) => {
    const {auth, triggerAlerts} = useOutletContext()
    const navigate = useNavigate()

    useEffect(()=>{
        
        const checkSession = async () => {
            const check = await auth.check()
            if(check == false) {
                triggerAlerts({variant: 'warning', msgs: ['User not logged in']})
                navigate('/')
            }
        }
        checkSession()
    }, [])

    return children
}

export default Auth