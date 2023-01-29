import {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'

import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'

const Anime = ({anime, setLoggedIn}) => {
    //stores array of anime info
    const [vids, setVids] = useState([])
    //stores current video trailer link, needs vids then fetches from jikan(MAL)
    const [trailer, setTrailer] = useState([])
    const [nextTrailer, setNextTrailer] = useState(0)
    //triggers use effect when nextvid is true
    const [nextVid, setNextVid] = useState(false)

    const incrementVid = () => setNextVid(!nextVid)

    const loadCarousel = () => {
        if(trailer.length)
        {    return <Carousel className='trailerCarousel' interval={null}>
                {trailer.map(vid => {
                    const match = vid.match(/\/(?<key>[^\?]+)/)
                    //double ternary, check for match, check for groups: resolves annoying edge cases
                    //at worst use full vid url as key
                    const key = match ? match.groups ? match.groups.key : '' : ''
                    return <Carousel.Item key={key||vid}>
                        <iframe src={vid} className="trailerItem" alt="a fabulous anime trailer that will change your world" />
                    </Carousel.Item>
                })}
            </Carousel>
            }
    }

    const loadTags = () => {
        const tags = vids[0].tags.slice(0,5)
        if(tags.length){
            return <Accordion defaultActiveKey={0} flush alwaysOpen>
                {tags.map((tag, ind) => {
                    return <Accordion.Item key={tag.id} eventKey={ind}>
                        <Accordion.Header>{tag.category}</Accordion.Header>
                        <Accordion.Body>{tag.description}</Accordion.Body>
                    </Accordion.Item>
                })}
            </Accordion>
        }
    }

    const loadGenres = () => {
        const genres = vids[0].genres
        if(genres.length){
            return <section>
                {genres.map(gen => {
                    const key = gen
                    return <Badge pill bg='info' key={key} >{gen}</Badge>
                })}
            </section>
        }
    }

   useEffect(()=>{
    const grabAnimes = async () => {
        try{
            let res = await fetch('/api/trailer')
            let data = await res.json()

            if(data.isError) return //replace with throw error afterwards

            let animelist = data.data.Page.media
            animelist = animelist.map( anime => {
                anime.description = anime.description.replace(/(<[^>]+>)/g, '')
                return anime
            })
            
            setVids(animelist.slice())
        }catch(err){
            //replace with throw error afterwards
            console.log(err)
        }}

        if(vids.length > 1) setVids(vids.slice(1))
        else    grabAnimes()

        
    
    }, [nextVid])

   useEffect(() => {
    const grabTrailer = async () => {
        try{
            setNextTrailer(0)
            let res = await fetch(`https://api.jikan.moe/v4/anime/${vids[0].idMal}/videos`)
            let data = await res.json()

            if(!data.data.promo.length){
                setTrailer([])
                return
            }
            const trailers = data.data.promo.map(trail => trail.trailer.embed_url)
            setTrailer(trailers)
        }catch(err){
            //replace with throw error afterwards
            console.log(err)
        }
        
    }
        if(vids[0]) grabTrailer()

   }, [vids[0]])

    if(vids.length){
        return <section>
            <section>
            <img className='animeBanner' src={vids[0].bannerImage || ''} />
            <h1>{vids[0].title.english ? vids[0].title.english : vids[0].title.romaji}</h1>
            {loadGenres()}
            </section>
            {loadCarousel()}
        <p className='animeDesc'>{vids[0].description}</p>
        {loadTags()}
        <SmashButton incrementVid={incrementVid} animeId={vids[0].id} />
        <PassButton incrementVid={incrementVid} animeId={vids[0].id} />
    </section>
    }

    return <h1>Loading</h1>
}

export default Anime