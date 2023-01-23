import {useState, useEffect} from 'react'
import {useLoaderData} from 'react-router-dom'
import LibraryCard from './components/LibraryCard'

export async function loader(){
    try{
        const res = await fetch('/api/getlibrary')
        const data = await res.json()

        return data
    }catch(err){
        //replace with throw afterwards
        console.log(err)
    }

}

const Library = () => {
    const animeLikes = useLoaderData()
    //future: limit library to 10-20 items per page (server side)
    //change library/:id to modals display info, use :id to change pages(params sent to server to select section of library)

    return animeLikes.map(anime => <LibraryCard anime={anime} key={anime.id} />)
}

export default Library