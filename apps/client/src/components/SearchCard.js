import Card from 'react-bootstrap/Card'
import {useState} from 'react'


import LibraryModal from './LibraryModal'

const SearchCard = ({anime}) => {
    const [show, setShow] = useState(false)
    const {id, title:{english, romaji}, coverImage:{large}, description} = anime
    const title = english ? english : romaji
    
    let short_description
    if(description){
        //shortens description for card displays
        short_description = (description.length>100 ? description.slice(0,200)+'...' : description)
        //removes html
        short_description = short_description.replace(/(<[^>]+>)/g, '')
    }
    
    const handleClick = () => setShow(true)

    return (<Card id={id} className='libraryCard' style={{backgroundColor:'rgba(255,255,255,0.7)'}}>
    <Card.Img variant="top" src={large||''} onClick={handleClick}/>
    <LibraryModal show={show} setShow={setShow} animeId={id}><iframe src={'library/'+id.toString()} /></LibraryModal>
    <Card.Body>
        <Card.Title>{title||''}</Card.Title>
        <Card.Text>{short_description||''}</Card.Text>
    </Card.Body>
</Card>)
}

export default SearchCard