import {useLoaderData, useOutletContext, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export async function loader(){
    try{
        const res = await fetch('/getProfile')
        const data = await res.json()
        
        if(res.status != 200) throw new Response('',{status:res.status, statusText: res.statusText})

        return {data: data, isError: false}
    }catch(err){
        return {data: [err], isError: true}
    }
}

const eraseAPI = async (e, triggerAlerts, clearBox, navigate) => {
    const buttons = {
        'eraseLikes' : {
            url : 'eraseLikes',
            msg : 'Are you certain about deleting your Liked Anime?',
            listBox: 'likes'
        },
        'eraseNotLikes' : {
            url : 'eraseNotLikes',
            msg : 'Are you certain about deleting your Not Liked Anime?',
            listBox: 'notLikes'
        },
        'deleteUser' : {
            url : 'deleteUser',
            msg : 'Please confirm you would like to delete your account. This is not reversible',
            listBox: ''
        }
    }
    const button = e.target.id
    const url = buttons[button].url
    const msg = buttons[button].msg
    const listBox = buttons[button].listBox

    if(window.confirm(msg)===false) return

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
            throw new Error(`Error updating profile: ${res.status}:\n ${res.statusText}`)
        }
        if(listBox) clearBox(listBox)

        triggerAlerts({variant: 'success', msgs: [data]})
        if(button == 'deleteUser') navigate('/')
    }catch(err){
        triggerAlerts({variant: 'warning', msgs: ['Error:', err]})
    }

}

const Profile = () => {
    const {data, isError} = useLoaderData()
    const {triggerAlerts} = useOutletContext()
    const navigate = useNavigate()
    const [quote, setQuote] = useState()
    const [userData, setUserData] = useState({likes: [], notLikes: []})

    useEffect(()=>{
        if(isError) triggerAlerts({variant: 'warning', msgs: data})
        else setUserData(data)


        const randomQuote = async () => {
            try{
                const res = await fetch('https://animechan.vercel.app/api/random')
                const data = await res.json()
        
                setQuote(data)
            }catch(err){
                //don't need to disrupt app if no quote
                triggerAlerts({variant: 'warning', msgs: ["Couldn't load a quote:", err]})
            }
        }
        randomQuote()
    },[])   

    const likes = userData.likes.join('\n')
    const numLikes = userData.likes.length
    const notLikes = userData.notLikes.join('\n')
    const numNotLikes = userData.notLikes.length

    const clearBox = (listBox) => {
        let boxes = userData
        if(listBox){
            boxes[listBox] = []
            setUserData(boxes)
        }
    }

    const handleErase = (e) => eraseAPI(e, triggerAlerts, clearBox, navigate)

     

    if(userData){
        return <section className='profile'>
            <h1>{userData.email}</h1>
            {
                quote ? 
                <section className='animeQuote'>
                    <p>{quote.quote}</p>
                    <span>-{quote.character}<br />[{quote.anime}]</span>
                </section>
                : <></>
            }
            <section className='profileBody'>
                <section className='profileLikeCon'>
                    <h4>You like {numLikes} anime!</h4>
                    <label htmlFor='profileLikes'>AniList IDs of Liked Anime:</label>
                    <textarea id='profileLikes' readOnly value={likes} placeholder="Looks like you don't like any Anime!"></textarea>
                    <Button id='eraseLikes' onClick={handleErase} variant='warning'>Reset Liked Anime</Button>
                </section>
                <section className='profileNotLikeCon'>
                    <h4>You dislike {numNotLikes} anime!</h4>
                    <label htmlFor='profileNotLikes'>AniList IDs of DisLiked Anime</label>
                    <textarea id='profileNotLikes' readOnly value={notLikes} placeholder="Looks like you don't hate enough Anime!"></textarea>
                    <Button id='eraseNotLikes' onClick={handleErase} variant='warning'>Reset Not Liked Anime</Button>
                </section>
            </section>
            <Button id='deleteUser' onClick={handleErase} variant='danger'>Delete Account</Button>
        </section>
    }
    return <Spinner role='status' variant='info' className='animeSpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
}

export default Profile