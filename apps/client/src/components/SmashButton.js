const SmashButton = ({incrementVid, animeId}) => {
    //user presses button for anime they like
    //use form submission

    const addLike = () => {
        
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(animeId)
        //incrementVid()
    }

    return (
        <form id='smashButton' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton