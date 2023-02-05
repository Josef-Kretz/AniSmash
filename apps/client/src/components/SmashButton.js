const SmashButton = ({incrementVid, animeId}) => {
    //user presses button for anime they like
    //set incrementVid to function to choose next anime, or set to false

    const addLike = async () => {
        if(!animeId || !(+animeId)) return

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

            //add error handling and alerts afterward
            console.log(data)
        }catch(err){
            console.log(err)
        }
        
        
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        addLike()
        if(typeof incrementVid === 'function') incrementVid()
    }

    return (
        <form id='smashButton' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton