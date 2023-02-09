import {useSearchParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import SearchCard from './components/SearchCard'

const getResults = async (search, setAnimes, setIsFetching, setBigError)=>{
    const url = 'https://graphql.anilist.co'
    const query = `{
        Page(page: 1, perPage:50)
        {
          media(search:"${search}", type:ANIME, isAdult:false) {
            id
            idMal
            title
            {
                english
                romaji
            }
            coverImage {
                extraLarge
                large
                medium
                color
            }
            averageScore
            description
            bannerImage
            isAdult
        }
      }
    }`

    const options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({query: query})
    }
    try{
        const res = await fetch(url, options)
        const data = await res.json()
        
        if(res.status != 200) throw new Response('',{status: res.status, statusText: res.statusText})
        
        setAnimes(data.data.Page.media)
        setIsFetching(false)
    }catch(err){
        setIsFetching(false)
        //useEffect swallows throws
        setBigError({status: err.status || 400, statusText: err.statusText || err})
    }
}

const SearchPage = ({params}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [animes, setAnimes] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [bigError, setBigError] = useState()
    

    useEffect(()=>{
        const search = searchParams.get('q')
        if(search) {
            setIsFetching(true)
            getResults(search, setAnimes, setIsFetching, setBigError)
        }
    }, [searchParams])

    if(bigError) throw new Response('', bigError) //useEffect swallows throws
    
    if(animes.length) {
        return <section className='searchSection'>
            {animes.map(anime => <SearchCard key={anime.id||anime.title} anime={anime} />)}
        </section>
    }
    if(isFetching) return <section className='searchSection'>
        <Spinner role='status' variant='info' className='searchSpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
    </section>
    return <></>
}

export default SearchPage