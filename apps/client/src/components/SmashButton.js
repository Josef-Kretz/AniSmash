import { useOutletContext } from "react-router-dom"
import {useState, useEffect} from 'react'

const SmashButton = ({incrementVid, animeId}) => {
    //user presses button for anime they like
    //set incrementVid to function to choose next anime, or set to false
    const triggerAlerts = useOutletContext() //triggerAlerts({variant:'', msgs:['']})

    const addLike = async () => {
        
        if(!animeId || !(+animeId)) return false

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({animeId: +animeId})
        }

        try{
            const res = await fetch('/like', options)
            const data = await res.json()

            if(res.status != 200) throw new Error(`Bad response from server: ${res.status} ${res.statusText}`)

            return true
        }catch(err){
            triggerAlerts({variant:'warning', msgs:['Error liking this anime:',err]})
            return false
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const success = await addLike() //only increment if successful response from server
        if(success && typeof incrementVid === 'function') incrementVid()
    }

    return (
        <form id='smashForm' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton