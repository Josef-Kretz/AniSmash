import {useLoaderData, json} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

export async function loader(){
    try{
        const res = await fetch('/getProfile')
        const data = await res.json()
        
        return data
    }catch(err){
        throw json({msg:err},{statusText:'Could not retrieve user profile'})
    }
}

const Profile = () => {
    const userData = useLoaderData()
    const likes = userData.likes.join('\n')
    const notLikes = userData.notLikes.join('\n')
    console.log(userData)

    if(userData){
        return <section className='profile'>
            <h1>{userData.email}</h1>
            <label for='profileLikes'></label>
            <textarea id='profileLikes' readonly value={likes}></textarea>
            <textarea id='profileNotLikes' readonly value={notLikes}></textarea>
        </section>
    }
    return <Spinner role='status' variant='info' className='animeSpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
}

export default Profile