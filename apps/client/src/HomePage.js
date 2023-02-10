import Logo from './components/Logo'

const HomePage = () => {
    /*
    *animate smash logo on home screen?*
    carousel with html items and pictures
    - explaining smash and pass buttons
    - explain trailer carousel
    - explain library
    - explain search and manual addition
    */

    return <section className='home'>
        <section className='introCon'>
            <div className='logoCon'>
                <Logo />
            </div>
            <div className='intro'>
                <h2>Smash or Pass on Trending Anime</h2>
                <ul>
                    <li>Look through multiple trailers</li>
                    <li>Swipe right on the ones you like</li>
                    <li>We keep track of what you like for you</li>
                    <li>Search and add any Anime you like</li>
                    <li>Easily find which streaming sites have your show</li>
                </ul>
            </div>
        </section>
    </section>
}

export default HomePage