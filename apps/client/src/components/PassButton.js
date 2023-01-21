const PassButton = ({vids, setVids}) => {
    //user clicks button for anime they do not like
    //use form submission

    const onSubmit = (e) => {
        e.preventDefault()
        setVids(vids.slice(1))
    }

    return (
        <form id='passButton' onSubmit={onSubmit} className='passButton button'>
            <input type='submit' id='submitPass' value='Pass' />
        </form>
    )

}

export default PassButton