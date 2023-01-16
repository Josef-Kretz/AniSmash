const SmashButton = () => {
    //user presses button for anime they like
    //use form submission

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch('/check')
        const data = await res.json()

        console.log(data)
    }

    return (
        <form id='smashButton' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton