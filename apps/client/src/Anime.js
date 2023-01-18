import {useEffect, useState} from 'react'
import SmashButton from './components/SmashButton'
import PassButton from './components/PassButton'

const Anime = ({anime, setLoggedIn}) => {
    const [vids, setVids] = useState('')
   useEffect(() => {
    async function test() {
        let res = await fetch('http://localhost:2121/api/trailer')
        let data = await res.json()

        console.log('data', data)
        setVids(data)
    }
    //test()
   }, [])

    return <>
        <h2>Anime Name</h2>
        <iframe  />
        <p>Anime Description</p>
        <SmashButton />
        <PassButton setLoggedIn={setLoggedIn} />
    </>
}

export default Anime