import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {useState, useEffect} from 'react'
import {json} from 'react-router-dom'

import Genres from './Genres'
import Tags from './Tags'
import ControlledCarousel from './ControlledCarousel'
import ExtLinks from './ExtLinks'
import SmashButton from './SmashButton'
import PassButton from './PassButton'

const fetchAnime = async (animeId) =>{
    const query = `{
      Media(id:${animeId})
      {
          id
              idMal
              title
              {
                english
                romaji
              }
              trailer {
                  id
                  site
                  thumbnail
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                averageScore
                description
                bannerImage
                genres
                tags {
                  id
                  category
                  description
                }
                externalLinks{
                  site
                  url
                }
      }
  }`
  
  const url = `https://graphql.anilist.co`
        const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              query: query
          })
        }
        try{
          const res = await fetch(url, options)
          const data = await res.json()
          data.isError = false  
  
          return data
        }catch(err){
          throw json({msg:err},{statusText:'Error retrieving anime page: Anime API error'})
        }
  
  }

  const fetchTrailer = async (idMal) => {
    try{
      let res = await fetch(`https://api.jikan.moe/v4/anime/${idMal}/videos`)
      let data = await res.json()
  
      if(!data.data.promo.length || res.status!==200){
          return
      }
      const trailers = data.data.promo.map(trail => trail.trailer.embed_url)
      return trailers.slice()
  }catch(err){
    //don't need to interrupt app if trailer API error
    return
  }
  }

const LibraryModal = ({show, setShow, animeId}) => {
    const [anime, setAnime] = useState()
    const [trailer, setTrailer] = useState([])

    const closeModal = () => setShow(false)
    //changes color of logo svg to blue
    const colorFilter = 'invert(29%) sepia(94%) saturate(3267%) hue-rotate(210deg) brightness(102%) contrast(98%)'

    useEffect( () => {
        const getAnime = async () => {
            const info = await fetchAnime(animeId)
            const idMal = info.data.Media.idMal
            const trail = await fetchTrailer(idMal)

            if(info) setAnime(info.data.Media)
            if(trail) setTrailer(trail)
        }

        if(show===true) getAnime()

    }, [show])

    if(anime) return <Modal className='libraryModal' show={show} fullscreen={true}>
        <Modal.Header style={{height:'50px'}}>
          <Button onClick={closeModal}>&#11160;</Button>
          <Modal.Title><img className='navLogo' src={require('../assets/modalLogo.svg').default} style={{filter: colorFilter}} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <section className='animeCoverBanner'>
                {anime.bannerImage ? <img className='animeBanner' src={anime.bannerImage} alt='banner image of the anime' /> : <></>}
                <h1>{anime.title.english ? anime.title.english : anime.title.romaji}</h1>
                <Genres genres={anime.genres} />
            </section>
            {
            trailer.length ? 
            <ControlledCarousel trailer={trailer} />
            :
            <img className='animeCover' src={anime.coverImage.extraLarge || ''} />
            }
            <section className='smashPassCon'>
              <SmashButton incrementVid={false} animeId={anime.id} />
              <PassButton incrementVid={false} animeId={anime.id} />
            </section>
            <p className='animeDesc'>{anime.description ? anime.description.replace(/(<[^>]+>)/g, '') : ''}</p>
            <Tags tags={anime.tags.slice(0,5)} />
            <ExtLinks links={anime.externalLinks} />
        </Modal.Body> 
    </Modal>

    return <Modal className='libraryModal' show={show} fullscreen={true}>
      <Modal.Header style={{height:'50px'}}>
          <Button onClick={closeModal}>&#11160;</Button>
          <Modal.Title>AniSmash</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner role='status' variant='info' className='librarySpinner' style={{height:'150px', width:'150px'}} animation='border'><span className='visually-hidden' >Loading...</span></Spinner>
        </Modal.Body>
    </Modal>
}

export default LibraryModal