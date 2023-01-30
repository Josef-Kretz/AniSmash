import Accordion from 'react-bootstrap/Accordion'

const Tags = ({tags}) => {
    if(tags.length){
        return <Accordion defaultActiveKey={0} alwaysOpen>
            {tags.map((tag, ind) => {
                return <Accordion.Item key={tag.id} eventKey={ind}>
                    <Accordion.Header>{tag.category}</Accordion.Header>
                    <Accordion.Body>{tag.description}</Accordion.Body>
                </Accordion.Item>
            })}
        </Accordion>
    }
}

export default Tags