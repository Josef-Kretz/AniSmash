import { useOutletContext } from "react-router-dom"
import {useState, useEffect} from 'react'

const SmashButton = ({incrementVid, animeId, closeModal}) => {
    //user presses button for anime they like
    //set incrementVid to function to choose next anime, or set to false
    const {triggerAlerts, auth} = useOutletContext() //triggerAlerts({variant:'', msgs:['']})

    const addLike = async () => {
        
        if(!animeId || !(+animeId)) return false
        if(!auth.loggedIn){
            triggerAlerts({variant:'warning', msgs: ['Must log in to Smash']})
            return
        }

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
            if(typeof closeModal === 'function')  closeModal()

            return false
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const id = document.getElementById(animeId)
        const name = id ? id.querySelector('.h5').innerText : ''

        const success = await addLike() //only increment if successful response from server
        //increments video after success for Anime, not library or search
        if(success && typeof incrementVid === 'function') incrementVid()
        //in library or search, close modal and send alert
        if(success && typeof closeModal === 'function') {
            triggerAlerts({variant:'success', msgs:[`Liked ${name || 'Anime'}`]})
            closeModal()
        }
    }

    return (
        <form id='smashForm' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton