import HomeDemo from './components/HomeDemo'

import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {
    const {auth} = useOutletContext()

    useEffect(()=>{
        const checkLogin = async () => auth.check()

        checkLogin()
    }, [])

    return <section className='home'>
        <section className='introCon'>
            <img className='shake homeLogo' src={require('./assets/animeLogo.svg').default} alt='AniSmash large logo' />
            <HomeDemo />
        </section>
    </section>
}

export default HomePage