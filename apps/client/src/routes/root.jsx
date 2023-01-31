//npm modules
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
//react components
import Header from '../components/Header'
import Footer from '../components/Footer'
import BgClouds from '../components/BgClouds'

export default function Root(){
    const [loggedIn, setLoggedIn] = useState(false)
    const [anime, setAnime] = useState([])

    return (<>
            <BgClouds limit={100} />
            <Header title="AniSmash" loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Outlet />
            <Footer />
        </>)
}