import {useEffect, useState} from 'react'
import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'

const Anime = ({anime, setLoggedIn}) => {
    const [vids, setVids] = useState([])
    const [trailer, setTrailer] = useState('')
    const [nextVid, setNextVid] = useState(false)

    const incrementVid = () => setNextVid(true)

   useEffect(()=>{
    const grabAnimes = async () => {
        let res = await fetch('/api/trailer')
        let data = await res.json()

        if(data.isError) return
        
        setVids(data.data.Page.media)

        return data.data.Page.media[0].idMal
    }

        if(vids.length > 1) setVids(vids.slice(1))
        else{
            grabAnimes()
        }

        setNextVid(false)
   }, [nextVid])

   useEffect(() => {
    const grabTrailer = async () => {
        let res = await fetch(`https://api.jikan.moe/v4/anime/${vids[0].idMal}/videos`)
        let data = await res.json()
        
        setTrailer(data.data.promo[0].trailer.embed_url)
    }
        if(vids[0]) grabTrailer()
   }, [vids[0]])

    if(vids.length){
        return <>
        <h1>{vids[0].title.english ? vids[0].title.english : vids[0].title.romaji}</h1>
        <iframe src={trailer} />
        <p>{vids[0].description}</p>
        <SmashButton incrementVid={incrementVid} animeId={vids[0].id} />
        <PassButton incrementVid={incrementVid} animeId={vids[0].id} />
    </>
    }

    return <h1>Loading</h1>
}

export default Anime