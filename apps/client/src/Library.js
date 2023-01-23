import {useState, useEffect} from 'react'
import {useLoaderData} from 'react-router-dom'
import LibraryCard from './components/LibraryCard'

export async function loader(){
    try{
        console.log('test')
        const res = await fetch('/api/getLibrary')
        const data = await res.json()

        return data.likes
    }catch(err){
        //replace with throw afterwards
        console.log(err)
    }
}

const Library = () => {
    const animeLikes = useLoaderData()
    

    return animeLikes.map(anime => <LibraryCard anime={anime} />)
}

export default Library