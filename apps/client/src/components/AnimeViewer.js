import {useEffect, useState} from 'react'
import SmashButton from './SmashButton'
import PassButton from './PassButton'

const AnimeViewer = ({anime}) => {
    const [vids, setVids] = useState('')
   useEffect(() => {
    async function test() {
        let res = await fetch('http://localhost:2121/api/trailer')
        let data = await res.json()

        console.log('data', data)
        setVids(data)
    }
    test()
   }, [])

    return <>
        <h2>Anime Name</h2>
        <iframe src={vids.yUrl} />
        <p>Anime Description</p>
        <SmashButton />
        <PassButton />
    </>
}

export default AnimeViewer