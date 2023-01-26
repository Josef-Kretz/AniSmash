import {useEffect, useState} from 'react'
import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'

const Anime = ({anime, setLoggedIn}) => {
    //stores array of anime info
    const [vids, setVids] = useState([])
    //stores current video trailer link, needs vids then fetches from jikan(MAL)
    const [trailer, setTrailer] = useState('')
    //triggers use effect when nextvid is true
    const [nextVid, setNextVid] = useState(false)

    const incrementVid = () => setNextVid(!nextVid)

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
            let res = await fetch(`https://api.jikan.moe/v4/anime/${vids[0].idMal}/videos`)
            let data = await res.json()

            if(!data.data.promo.length){
                setTrailer('')
                return
            }
            setTrailer(data.data.promo[0].trailer.embed_url||'')
        }catch(err){
            //replace with throw error afterwards
            console.log(err)
        }
        
    }
        if(vids[0]) grabTrailer()

   }, [vids[0]])

    if(vids.length){
        return <>
        <h1>{vids[0].title.english ? vids[0].title.english : vids[0].title.romaji}</h1>
        {
            trailer ? <iframe src={trailer} /> 
            : <img src={vids[0].bannerImage} />
        }
        <p>{vids[0].description}</p>
        <SmashButton incrementVid={incrementVid} animeId={vids[0].id} />
        <PassButton incrementVid={incrementVid} animeId={vids[0].id} />
    </>
    }

    return <h1>Loading</h1>
}

export default Anime