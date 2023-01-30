import {useState, useEffect} from 'react'
import {json, useLoaderData} from 'react-router-dom'

import LibraryCard from './components/LibraryCard'
import useInfiniteScroll from './components/useInfiniteScroll'

export async function loader(){
    try{
        const res = await fetch('/api/getlibrary')
        const data = await res.json()

        return data
    }catch(err){
        throw json({msg: err},{statusText: "Can't access user library"})
    }

}

const Library = () => {
    const [animeLikes, setAnimeLikes] = useState([...useLoaderData()])
    const [isFetching, setIsFetching] = useInfiniteScroll(loadMoreAnime)
    const [reqsSent, setReqsSent] = useState(1)

    async function loadMoreAnime() {
        try{
            let reqs = reqsSent*12
            let dbAnime = animeLikes.length+12
            if(reqs > dbAnime) return

            const res = await fetch(`/api/getlibrary/${reqsSent}`)
            const data = await res.json()
            
            let filteredList = [...animeLikes, ...data].filter((obj, ind, arr)=> {
                let id = obj.id
                return arr.findIndex((objs) => id === objs.id) === ind
            })

            setAnimeLikes(filteredList)
            setIsFetching(false)
            setReqsSent(reqsSent+1)
            console.log('what?')
        }catch(err){
            console.log('error tripped',err)
            throw json({msg: err},{statusText: "Can't access Library"})
        }
        
    }

    return <section className='librarySection'>{animeLikes.map(anime => <LibraryCard anime={anime} key={anime.id} />)}</section>
}

export default Library