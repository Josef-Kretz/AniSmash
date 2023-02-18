import { useOutletContext } from "react-router-dom"

const PassButton = ({incrementVid, animeId, closeModal}) => {
    //user clicks button for anime they do not like
    //set incrementVid to function to choose next anime, or set to false
    const {triggerAlerts, auth} = useOutletContext() //triggerAlerts({variant:'', msgs:['']})
    const disLike = async () => {
        if(!animeId || !(+animeId)) return
        if(!auth.loggedIn){
            triggerAlerts({variant:'warning', msgs: ['Must log in to Pass']})
            return
        }

        const options = {
            method: "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({animeId : +animeId})
        }
        try{
            const res = await fetch('/hate', options)
            const data = await res.json()

            if(res.status != 200) throw new Error(`Error ${res.status} ${res.statusText}`)

            return true
        }catch(err){
            triggerAlerts({variant:'warning', msgs:['Error in disliking this anime: ', err]})
            if(typeof closeModal === 'function')  closeModal()
            return false
        }
        
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        
        const id = document.getElementById(animeId)
        const name = id ? id.querySelector('.h5').innerText : ''


        const success = await disLike() //only increment if successful response from server
        //increments video after success for Anime, not library or search
        if(success && typeof incrementVid === 'function') incrementVid()
        //in library or search, close modal and send alert
        if(success && typeof closeModal === 'function')  {
            triggerAlerts({variant: 'success', msgs:[`Disliked ${name || 'Anime'}`]})
            //checks if page is library, optimistic removal
            if(document.querySelector('.librarySection')) id.style.display = 'none'
            closeModal()
        }
    }

    return (
        <form id='passForm' onSubmit={onSubmit} className='passButton button'>
            <input type='submit' id='submitPass' value='Pass' />
        </form>
    )

}

export default PassButton