import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



const LibraryCard = ({anime}) => {
    const {id, title:{english, romaji}, coverImage:{large}, description} = anime

    //shortens description for card displays
    let short_description = (description.length>100 ? description.slice(0,200)+'...' : description)
    //removes html
    short_description = short_description.replace(/(<[^>]+>)/g, '')

    return (<Card style={{width:'18rem'}} >
        <Card.Img variant="top" src={large} />
        <Card.Body>
            <Card.Title>{english ? english : romaji}</Card.Title>
            <Card.Text>{short_description}</Card.Text>
            <Button variant="primary">View Full Page</Button>
        </Card.Body>
    </Card>)
}

export default LibraryCard