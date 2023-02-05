import {Form} from 'react-router-dom'

const Searchbar = () => {

    return <Form method='get' action='/search'>
        <input aria-label='search anime' type='text' name='q'/>
        <button type='submit'>Search</button>
    </Form>
}

export default Searchbar