import Carousel from 'react-bootstrap/Carousel'

const HomeDemo = () => {

    return <Carousel slide={false} controls={false} indicators={false} interval={3500}>
        <Carousel.Item>
            <p>Check out the trailers of great Anime</p>
            <img src={require('../assets/homepage/trailer.png')} alt='Example of trailer slidershow' />
        </Carousel.Item>
        <Carousel.Item>
            <p>
                Click
                <img style={{width:'200px'}} src={require('../assets/homepage/smash.png')} alt='Smash button, adds an anime to library' />
                to like an Anime and add to your Library
            </p>
        </Carousel.Item>
        <Carousel.Item>
            <p>
                Click
                <img style={{width:'200px'}} src={require('../assets/homepage/pass.png')} alt='Pass button, ignores anime' />
                on Anime you Hate to never see it again
            </p>
        </Carousel.Item>
        <Carousel.Item>
            <img src={require('../assets/homepage/library.png')} alt='Example of a library containing liked anime' />
            <p>Track your Likes in your Library</p>
        </Carousel.Item>
        <Carousel.Item>
            <p>Find where to watch</p>
            <img src={require('../assets/homepage/links.png')} alt='Example of streaming site logos found with some anime' />
        </Carousel.Item>
        <Carousel.Item>
            <img src={require('../assets/homepage/search.png')} alt='Example of a searchbar, used to find anime' />
            <p>Search to add any Anime you want</p>
        </Carousel.Item>
    </Carousel>
}

export default HomeDemo