import {useState} from 'react'
import {json, useLoaderData, Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

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
            if(reqs > dbAnime) {
                setIsFetching(false)
                return
            }

            const res = await fetch(`/api/getlibrary/${reqsSent}`)
            const data = await res.json()
            
            let filteredList = [...animeLikes, ...data].filter((obj, ind, arr)=> {
                let id = obj.id
                return arr.findIndex((objs) => id === objs.id) === ind
            })

            setAnimeLikes(filteredList)
            setIsFetching(false)
            setReqsSent(reqsSent+1)
        }catch(err){
            throw json({msg: err},{statusText: "Can't access Library"})
        }
        
    }

    if(!animeLikes.length) return <section>There's no error, there's just nothing here. Swipe on some <Link to='../anime' style={{fontWeight:'bold'}}>Animes</Link>!</section>

    return <section className='librarySection'>{animeLikes.map(anime => <LibraryCard key={anime.id} anime={anime} />)}
    {
        isFetching ? 
        <Spinner role='status' variant='info' className='librarySpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
        : <></>
    }
    </section>
}

export default Library