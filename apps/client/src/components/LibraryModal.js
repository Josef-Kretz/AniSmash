import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react'
import {json} from 'react-router-dom'

import Genres from './Genres'
import Tags from './Tags'
import ControlledCarousel from './ControlledCarousel'

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
  
      if(!data.data.promo.length){
          return []
      }
      const trailers = data.data.promo.map(trail => trail.trailer.embed_url)
      return trailers.slice()
  }catch(err){
    throw json({msg:err},{statusText:'Error retrieving anime page: Trailer API error'})
  }
  }

const LibraryModal = ({show, setShow, animeId}) => {
    const [anime, setAnime] = useState()
    const [trailer, setTrailer] = useState()

    const closeModal = () => setShow(false)

    useEffect( () => {
        const getAnime = async () => {
            const info = await fetchAnime(animeId)
            const idMal = info.data.Media.idMal
            const trail = await fetchTrailer(idMal)

            if(info) setAnime(info.data.Media)
            if(trail) setTrailer(trail)

            
            console.log(info.data.Media)
        }

        if(show===true) getAnime()

    }, [show])

    if(anime) return <Modal className='libraryModal' show={show} fullscreen={true}>
        <Modal.Header><Button onClick={closeModal}>&#11160;</Button></Modal.Header>
        <Modal.Body>
            <section className='animeCoverBanner'>
                <img className='animeBanner' src={anime.bannerImage || ''} />
                <h1>{anime.title.english ? anime.title.english : anime.title.romaji}</h1>
                <Genres genres={anime.genres} />
            </section>
            {
            trailer.length ? 
            <ControlledCarousel trailer={trailer} />
            :
            <img className='animeCover' src={anime.coverImage.extraLarge || ''} />
            }
            <p className='animeDesc'>{anime.description.replace(/(<[^>]+>)/g, '')}</p>
            <Tags tags={anime.tags.slice(0,5)} />
        </Modal.Body> 
    </Modal>
}

export default LibraryModal