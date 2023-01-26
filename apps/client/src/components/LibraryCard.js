import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



const LibraryCard = ({anime}) => {
    const {id, title:{english, romaji}, coverImage:{large}, description} = anime
    const title = english ? english : romaji

    //shortens description for card displays
    let short_description = (description.length>100 ? description.slice(0,200)+'...' : description)
    //removes html
    short_description = short_description.replace(/(<[^>]+>)/g, '')

    const popupAnime = () => {
        //load and show modal of anime?
        console.log('test')
    }

    return (<Card className='libraryCard'>
        <Card.Img variant="top" src={large} onClick={popupAnime}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{short_description}</Card.Text>
        </Card.Body>
        <Button variant="secondary">Delete</Button>
    </Card>)
}

export default LibraryCard