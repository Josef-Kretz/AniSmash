import {useLoaderData, json} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

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
    const numLikes = userData.likes.length
    const notLikes = userData.notLikes.join('\n')
    const numNotLikes = userData.notLikes.length

    const handleErase = async (e) => {
        const buttons = {
            'eraseLikes' : {
                url : 'eraseLikes',
                msg : 'Are you certain about deleting your Liked Anime?'
            },
            'eraseNotLikes' : {
                url : 'eraseNotLikes',
                msg : 'Are you certain about deleting your Not Liked Anime?'
            },
            'deleteUser' : {
                url : 'deleteUser',
                msg : 'Please confirm you would like to delete your account. This is not reversible'
            }
        }
        const button = e.target.id
        const url = buttons[button].url

        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const res = await fetch(url, options)
            const data = await res.json()

            if(res.status != 200){
                //replace with alert later
                console.log('request error', res.status, res.statusText)
                return
            }
            //replace with alert later
            console.log('success!', data)
        }catch(err){
            console.log('error deleting', err) //replace with alert later
        }

    }

    if(userData){
        return <section className='profile'>
            <h1>{userData.email}</h1>
            <section className='profileBody'>
                <section className='profileLikeCon'>
                    <h4>You like {numLikes} anime!</h4>
                    <label htmlFor='profileLikes'>AniList IDs of Liked Anime:</label>
                    <textarea id='profileLikes' readOnly value={likes}></textarea>
                    <Button id='eraseLikes' onClick={handleErase} variant='danger'>Reset Liked Anime</Button>
                </section>
                <section className='profileNotLikeCon'>
                    <h4>You dislike {numNotLikes} anime!</h4>
                    <label htmlFor='profileNotLikes'>AniList IDs of DisLiked Anime</label>
                    <textarea id='profileNotLikes' readOnly value={notLikes}></textarea>
                    <Button id='eraseNotLikes' onClick={handleErase} variant='danger'>Reset Not Liked Anime</Button>
                </section>
                <Button id='deleteUser' onClick={handleErase} variant='danger'>Delete Account</Button>
            </section>
        </section>
    }
    return <Spinner role='status' variant='info' className='animeSpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
}

export default Profile