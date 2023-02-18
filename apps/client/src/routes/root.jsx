//npm modules
import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
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
            try{
                const res = await fetch('/check')
                const data = await res.json()
        
                if(data) setLoggedIn(true)
                else setLoggedIn(false)

                return data
            }catch(err){
                triggerAlerts({variant:'warning', msgs: ['Error checking user session:',err]})
            }
            
        },
        loggedIn : loggedIn,
        setLoggedIn : setLoggedIn
    }
    
    const triggerAlerts = (alertObj) => {
        //use {variant: '', msgs: []} structure
        setAlerts(alertObj)
    }

    useEffect(()=>{
        auth.check()
    },[])

    return (<>
            <BgClouds limit={100} />
            <Header auth={auth} triggerAlerts={triggerAlerts} />
            <CustomAlert alerts={alerts} setAlerts={setAlerts} />
            <Outlet context={{triggerAlerts, auth}} />
            <Footer />
        </>)
}