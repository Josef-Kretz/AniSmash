import {useEffect, useState} from 'react'
import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'

const Anime = ({anime, setLoggedIn}) => {
    const [vids, setVids] = useState([])

   useEffect(() => {
    async function test() {
        let res = await fetch('/api/trailer')
        let data = await res.json()

        if(data.isError) return
        console.log(data)
        setVids(data.data.Page.media)
    }
    test()
   }, [])

    if(vids.length){
        return <>
        <h1>{vids[0].title.english ? vids[0].title.english : vids[0].title.romaji}</h1>
        <iframe src={vids[0].trailer.id ? 'https://youtube.com/embed/'+vids[0].trailer.id : 'https://youtu.be/jfKfPfyJRdk'} />
        <p>{vids[0].description}</p>
        <SmashButton />
        <PassButton vids={vids} setVids={setVids} />
    </>
    }

    return <h1>Loading</h1>
}

export default Anime