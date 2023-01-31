const PassButton = ({incrementVid, animeId}) => {
    //user clicks button for anime they do not like
    //use form submission

    const disLike = async () => {
        if(!animeId || !(+animeId)) return

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
        }catch(err){
            console.log(err)
        }
        
    }

    const onSubmit = (e) => {
        e.preventDefault()

        disLike()
        incrementVid()
    }

    return (
        <form id='passButton' onSubmit={onSubmit} className='passButton button'>
            <input type='submit' id='submitPass' value='Pass' />
        </form>
    )

}

export default PassButton