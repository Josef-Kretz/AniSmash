//npm modules
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
//react components
import Header from '../components/Header'
import Footer from '../components/Footer'
import BgClouds from '../components/BgClouds'
import CustomAlert from '../components/CustomAlert'

export default function Root(){
    const [loggedIn, setLoggedIn] = useState(false)
    const [alerts, setAlerts] = useState({variant: '', msgs: []})

    const auth = {
        check: async () => {
            const res = await fetch('/check')
            const data = await res.json()
    
            if(data) setLoggedIn(true)
            else setLoggedIn(false)
        },
        loggedIn : loggedIn
    }
    
    const triggerAlerts = (alertObj) => {
        //use {variant: '', msgs: []} structure
        setAlerts(alertObj)
    }

    return (<>
            <BgClouds limit={100} />
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} triggerAlerts={triggerAlerts} />
            <CustomAlert alerts={alerts} setAlerts={setAlerts} />
            <Outlet context={{triggerAlerts, auth}} />
            <Footer />
        </>)
}