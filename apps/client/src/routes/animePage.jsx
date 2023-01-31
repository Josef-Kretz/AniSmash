import {useLoaderData, useFetcher, json} from 'react-router-dom'

import Genres from '../components/Genres'
import Tags from '../components/Tags'
import ControlledCarousel from '../components/ControlledCarousel'

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

export async function loader({params})
{
    try{
      const anime = await fetchAnime(params.animeId)
      const idMal = anime.data.Media.idMal
      const trailer = await fetchTrailer(idMal)

      return {anime: anime, trailer: trailer}
    }catch(err)
    {
      throw json({msg:err},{statusText:'Error retrieving anime page'})
    }
}

export default function AnimePage() {
    const animeLoader = useLoaderData()
    if(animeLoader.isError) throw json({msg:'API error'},{statusText:'Error retrieving anime page'})

    const anime = animeLoader.anime.data.Media
    const trailer = animeLoader.trailer

    return (
        <section>
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

  </section>
    )
}