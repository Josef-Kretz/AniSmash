const PassButton = () => {
    //user clicks button for anime they do not like
    //use form submission

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form id='passButton' onSubmit={onSubmit} className='passButton button'>
            <input type='submit' id='submitPass' value='Pass' />
        </form>
    )

}

export default PassButton