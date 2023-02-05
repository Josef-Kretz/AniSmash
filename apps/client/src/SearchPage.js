import {useSearchParams, json} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import SearchCard from './components/SearchCard'

const getResults = async (search, setAnimes, setIsFetching)=>{
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
        const result = data.data.Page.media
        
        setAnimes(data.data.Page.media)
        setIsFetching(false)
    }catch(err){
        throw json('Improper or failed search')
    }
}

const SearchPage = ({params}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [animes, setAnimes] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(()=>{
        const search = searchParams.get('q')
        if(search) {
            setIsFetching(true)
            getResults(search, setAnimes, setIsFetching)
        }
    }, [searchParams])
    
    if(animes.length) {
        return <section className='librarySection'>
            {animes.map(anime => <SearchCard key={anime.id||anime.title} anime={anime} />)}
        </section>
    }
    if(isFetching) return <section className='librarySection'>
        <Spinner role='status' variant='info' className='librarySpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
    </section>
    return <></>
}

export default SearchPage