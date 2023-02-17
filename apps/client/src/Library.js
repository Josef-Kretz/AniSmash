import {useState, useEffect} from 'react'
import {useLoaderData, Link, useOutletContext} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import LibraryCard from './components/LibraryCard'
import useInfiniteScroll from './components/useInfiniteScroll'

export async function loader(){
    try{
        const res = await fetch('/api/getlibrary')
        const data = await res.json()

        if(res.status != 200) throw new Response('',{status: res.status, statusText: res.statusText})
 
        return {data: data, isError: false}
    }catch(err){
        return {data: [err], isError: true}
    }

}

const Library = () => {
    const {data, isError} = useLoaderData()
    const [animeLikes, setAnimeLikes] = useState([])
    const [isFetching, setIsFetching] = useInfiniteScroll(loadMoreAnime)
    const [reqsSent, setReqsSent] = useState(1)
    const {triggerAlerts} = useOutletContext()

    useEffect( ()=>{
        if(isError) triggerAlerts({variant: 'warning', msgs: data})
        else setAnimeLikes([...data])
    }, [])

    async function loadMoreAnime() {
        try{
            let reqs = reqsSent*12
            let dbAnime = animeLikes.length+12
            if(reqs > dbAnime) {
                setIsFetching(false)
                triggerAlerts({variant:'primary', msgs: ['You reached the end of your library!']})
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
            setIsFetching(false)
            triggerAlerts({variant: 'warning', msgs: ['Error accessing library: ', err]})
            return
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