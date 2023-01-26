const SmashButton = ({incrementVid, animeId}) => {
    //user presses button for anime they like
    //use form submission

    const addLike = async () => {
        if(!animeId || !(+animeId)) return

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({animeId: +animeId})
        }

        const res = await fetch('/like', options)
        const data = await res.json()
        
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        addLike()
        incrementVid()
    }

    return (
        <form id='smashButton' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton