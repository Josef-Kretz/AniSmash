import Carousel from 'react-bootstrap/Carousel'

const HomeDemo = () => {

    return <Carousel interval={null}>
        <Carousel.Item>
            <p>Checkout the trailers of great Anime</p>
            <img src={require('../assets/homepage/trailer.png')} />
        </Carousel.Item>
        <Carousel.Item>
            <p>
                Click
                <img src={require('../assets/homepage/smash.png')} />
                to like an Anime and add to your Library
            </p>
        </Carousel.Item>
        <Carousel.Item>
            <p>
                Click
                <img src={require('../assets/homepage/pass.png')} />
                on Anime you Hate to never see it again
            </p>
        </Carousel.Item>
        <Carousel.Item>
            <img src={require('../assets/homepage/library.png')} />
            <p>Track your Likes in your Library</p>
        </Carousel.Item>
        <Carousel.Item>
            <p>Find where to watch</p>
            <img src={require('../assets/homepage/links.png')} />
        </Carousel.Item>
        <Carousel.Item>
            <img src={require('../assets/homepage/search.png')} />
            <p>Search to add any Anime you want</p>
        </Carousel.Item>
    </Carousel>
}

export default HomeDemo