import {useEffect, useState} from 'react'
import { useOutletContext } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'
import ControlledCarousel from './components/ControlledCarousel'
import Tags from './components/Tags'
import Genres from './components/Genres'
import ExtLinks from './components/ExtLinks'

const Anime = () => {
    //stores array of anime info
    const [vids, setVids] = useState([])
    //stores current video trailer link, needs vids then fetches from jikan(MAL)
    const [trailer, setTrailer] = useState([])
    //triggers use effect when nextvid is true
    const [nextVid, setNextVid] = useState(false)
    const triggerAlerts = useOutletContext()

    const incrementVid = () => setNextVid(!nextVid)

   useEffect(()=>{
    const grabAnimes = async () => {
        try{
            let res = await fetch('/api/trailer')
            let data = await res.json()
            
            if(data.isError || res.status!= 200){
                triggerAlerts({variant: 'warning', msgs: [res.status, "Can't access Anime API"]})
                return
            }

            let animelist = data.data.Page.media
            animelist = animelist.map( anime => {
                anime.description = anime.description.replace(/(<[^>]+>)/g, '')
                return anime
            })
            
            setVids(animelist.slice())
        }catch(err){
            triggerAlerts({variant: 'warning', msgs: ['Error accessing Anime API:', err]})
            return
        }}

        if(vids.length > 1) setVids(vids.slice(1))
        else    grabAnimes()

        
    }, [nextVid])

   useEffect(() => {
    window.scrollTo(0,0) //scroll to top whenever current anime changes (vids[0])

    const grabTrailer = async () => {
        if(!vids[0].idMal) return

        try{
            let res = await fetch(`https://api.jikan.moe/v4/anime/${vids[0].idMal}/videos`)
            let data = await res.json()

            if(res.status != 200){
                //don't need to interrupt app if no trailer found
                return
            }

            if(!data.data.promo.length){
                setTrailer([])
                return
            }
            const trailers = data.data.promo.map(trail => trail.trailer.embed_url)
            setTrailer(trailers)
        }catch(err){
            triggerAlerts({variant: 'warning', msgs: ['Error accessing Trailer API:', err]})
            return
        }

    }
        if(vids[0]) grabTrailer()

   }, [vids[0]])

    if(vids.length){
        return <section className='anime'>
            <section className='animeCoverBanner'>
                <img className='animeBanner' src={vids[0].bannerImage || ''} />
                <h1>{vids[0].title.english ? vids[0].title.english : vids[0].title.romaji}</h1>
                <Genres genres={vids[0].genres} />
            </section>
            {
                trailer.length ? 
                <ControlledCarousel trailer={trailer} />
                :
                <img className='animeCover' src={vids[0].coverImage.extraLarge || ''} />
            }
        <section className='smashPassCon'>
            <SmashButton incrementVid={incrementVid} animeId={vids[0].id} />
            <PassButton incrementVid={incrementVid} animeId={vids[0].id} />
        </section>
        <p className='animeDesc'>{vids[0].description}</p>
        <Tags tags={vids[0].tags.slice(0,5)} />
        <ExtLinks links={vids[0].externalLinks} />  
    </section>
    }

    return <Spinner role='status' variant='info' className='animeSpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
}

export default Anime