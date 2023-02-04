import {useEffect, useState} from 'react'
import { json } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'
import ControlledCarousel from './components/ControlledCarousel'
import Tags from './components/Tags'
import Genres from './components/Genres'

const Anime = () => {
    //stores array of anime info
    const [vids, setVids] = useState([])
    //stores current video trailer link, needs vids then fetches from jikan(MAL)
    const [trailer, setTrailer] = useState([])
    //triggers use effect when nextvid is true
    const [nextVid, setNextVid] = useState(false)
    //useEffect swallows catches
    const [bigError, setBigError] = useState()

    const incrementVid = () => setNextVid(!nextVid)

   useEffect(()=>{
    const grabAnimes = async () => {
        console.log('grabbing anime')
        try{
            let res = await fetch('/api/trailer')
            let data = await res.json()

            if(data.isError || res.status!= 200){
                setBigError({msg: res.status },{statusText: "Can't access Anime API"})
                return
            }

            let animelist = data.data.Page.media
            animelist = animelist.map( anime => {
                anime.description = anime.description.replace(/(<[^>]+>)/g, '')
                return anime
            })
            
            setVids(animelist.slice())
        }catch(err){
            setBigError({msg: err},{statusText: "Can't access Anime API"})
        }}

        if(vids.length > 1) setVids(vids.slice(1))
        else    grabAnimes()

        window.scrollTo(0,0)
    }, [nextVid])

   useEffect(() => {
    console.log(vids[0])
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
            setBigError({msg: err},{statusText: "Can't access Trailer API"})
        }
        
    }
        if(vids[0]) grabTrailer()

   }, [vids[0]])

   if(bigError) throw json(bigError)

    if(vids.length){
        return <section>
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
        <p className='animeDesc'>{vids[0].description}</p>
        <Tags tags={vids[0].tags.slice(0,5)} />
        <SmashButton incrementVid={incrementVid} animeId={vids[0].id} />
        <PassButton incrementVid={incrementVid} animeId={vids[0].id} />
    </section>
    }

    return <Spinner role='status' variant='info' className='animeSpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
}

export default Anime