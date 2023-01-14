const SmashButton = () => {
    //user presses button for anime they like
    //use form submission

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form id='smashButton' onSubmit={onSubmit} className='smashButton button'>
            <input type='submit' id='submitSmash' value='Smash' />
        </form>
    )
}

export default SmashButton