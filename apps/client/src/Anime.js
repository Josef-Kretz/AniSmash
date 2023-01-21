import {useEffect, useState} from 'react'
import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'

const Anime = ({anime, setLoggedIn}) => {
    const [vids, setVids] = useState([])
    const [trailer, setTrailer] = useState('')

    const grabAnimes = async () => {
        let res = await fetch('/api/trailer')
        let data = await res.json()

        if(data.isError) return
        console.log(data)
        setVids(data.data.Page.media)
    }

    const grabTrailer = async (idMal) => {
        let res = await fetch(`https://api.jikan.moe/v4/anime/${idMal}/videos`)
        let data = await res.json()
        
        setTrailer(data.data.promo[0].trailer.embed_url)
    }

    const incrementVid = async () => {
        if(vids.length)
        {
            try{
                let res = await fetch(`https://api.jikan.moe/v4/anime/${vids[0].idMal}/videos`)
                let data = await res.json()
        
                setTrailer(data.data.promo[0].trailer.embed_url)
            }catch(err){
                console.log(err)
            }
        }
        else
        {
            try{
                let res = await fetch('/api/trailer')
                let data = await res.json()
                    .then( () => setVids(data.data.Page.media))
                    .then( () => incrementVid())

                if(data.isError) return

                
                //setVids(data.data.Page.media)

                //incrementVid()
            }catch(err){
                console.log(err)
            }
        }
    }

   useEffect(() => {
    if(vids.length === 0) incrementVid()
   }, [])

    if(vids.length){
        return <>
        <h1>{vids[0].title.english ? vids[0].title.english : vids[0].title.romaji}</h1>
        <iframe src={trailer} />
        <p>{vids[0].description}</p>
        <SmashButton />
        <PassButton vids={vids} setVids={setVids} />
    </>
    }

    return <h1>Loading</h1>
}

export default Anime