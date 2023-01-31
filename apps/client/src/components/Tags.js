import Accordion from 'react-bootstrap/Accordion'

const Tags = ({tags}) => {
    if(tags.length){
        return <Accordion alwaysOpen>
            {tags.map((tag, ind) => {
                return <Accordion.Item key={tag.id} eventKey={ind} style={{backgroundColor:'rgba(255,255,255,0.5)'}}>
                    <Accordion.Header>{tag.category}</Accordion.Header>
                    <Accordion.Body>{tag.description}</Accordion.Body>
                </Accordion.Item>
            })}
        </Accordion>
    }
    return <></>
}

export default Tags