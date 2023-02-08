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
    
    const triggerAlerts = (alertObj) => {
        //use {variant: '', msgs: []} structure
        setAlerts(alertObj)
    }

    return (<>
            <BgClouds limit={100} />
            <Header title="AniSmash" loggedIn={loggedIn} setLoggedIn={setLoggedIn} triggerAlerts={triggerAlerts} />
            <CustomAlert alerts={alerts} setAlerts={setAlerts} />
            <Outlet context={triggerAlerts} />
            <Footer />
        </>)
}