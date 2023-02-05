import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'

import LibraryModal from './LibraryModal'

const LibraryCard = ({anime}) => {
    const {id, title:{english, romaji}, coverImage:{large}, description} = anime
    const title = english ? english : romaji
    const [show, setShow] = useState(false)

    //shortens description for card displays
    let short_description = (description.length>100 ? description.slice(0,200)+'...' : description)
    //removes html
    short_description = short_description.replace(/(<[^>]+>)/g, '')

    const popupAnime = (e) => setShow(true)

    const dislikeAnime = async (e) => {
        e.preventDefault()
        const animeId = e.target.parentNode.id
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

            if(res.status===200) e.target.parentNode.style.display = 'none'
            //console.log('data:',data, 'res:', res)
        }catch(err){
            console.log(err)
        }
    }

    return (<Card key={id||title} id={id} className='libraryCard' style={{backgroundColor:'rgba(255,255,255,0.7)'}}>
        <LibraryModal show={show} setShow={setShow} animeId={id}><iframe src={'library/'+id.toString()} /></LibraryModal>
        <Card.Img variant="top" src={large} onClick={popupAnime}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{short_description}</Card.Text>
        </Card.Body>
        <Button variant="secondary" onClick={dislikeAnime}>Remove</Button>
    </Card>)
}

export default LibraryCard