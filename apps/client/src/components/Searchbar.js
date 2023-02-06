import {Form} from 'react-router-dom'

const Searchbar = () => {
    const searchIcon = require('../assets/icons/searchicon.png')
    return <Form className='searchForm' method='get' action='/search'>
        <input className='searchField' aria-label='search anime' type='text' name='q' placeholder='Search anime' />
        <button className='searchButton' type='submit'>
            <img className='searchIcon' src={searchIcon}alt='search icon button' />
        </button>
    </Form>
}

export default Searchbar