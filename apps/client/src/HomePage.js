import HomeDemo from './components/HomeDemo'

const HomePage = () => {

    return <section className='home'>
        <section className='introCon'>
            <img className='shake homeLogo' src={require('./assets/animeLogo.svg').default} alt='AniSmash large logo' />
            <HomeDemo />
        </section>
    </section>
}

export default HomePage