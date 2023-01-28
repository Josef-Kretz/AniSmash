import {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
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

        if(trailer)
        {    return <Carousel className='trailerCarousel' interval={null}>
                {trailer.map(vid => {
                    const key = vid.match(/\/(?<key>[\w]+)\?/).groups.key
                    return <Carousel.Item key={key||vid}>
                        <iframe src={vid} className="trailerItem" alt="a fabulous anime trailer that will change your world" />
                    </Carousel.Item>
                })}
            </Carousel>
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
            {/* add tags/genres here */}
            </section>
            {loadCarousel()}
        <p className='animeDesc'>{vids[0].description}</p> 
        <SmashButton incrementVid={incrementVid} animeId={vids[0].id} />
        <PassButton incrementVid={incrementVid} animeId={vids[0].id} />
    </section>
    }

    return <h1>Loading</h1>
}

export default Anime