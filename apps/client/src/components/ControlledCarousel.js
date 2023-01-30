import {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'

const ControlledCarousel = ({trailer}) => {
    const [index, setIndex] = useState(0)

    const changeCarIndex = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    useEffect( () => {
        setIndex(0)
    }, [trailer])

    if(trailer.length < 1) return <></>

    return <Carousel className='trailerCarousel' activeIndex={index} onSelect={changeCarIndex} interval={null}>
    {trailer.map(vid => {
        const match = vid.match(/\/(?<key>[^\?]+)/)
        //double ternary, check for match, check for groups: resolves annoying edge cases
        //at worst use full vid url as key
        const key = match ? match.groups ? match.groups.key : '' : ''
        const noAutoplay = vid.replace('autoplay=1', 'autoplay=0')
        return <Carousel.Item key={key||vid}>
            <iframe src={noAutoplay} className="trailerItem" alt="a fabulous anime trailer that will change your world" />
        </Carousel.Item>
    })}
</Carousel>
}

export default ControlledCarousel