import {useLoaderData, useFetcher} from 'react-router-dom'

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
        return {isError: true, data: err}
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
    //replace with throw error afterwards
    console.log(err)
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
      console.log(err)
    }
}

export default function AnimePage() {
    const animeLoader = useLoaderData()
    if(animeLoader.isError) return <h1>Error fetching anime</h1>

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
        <p className='animeDesc'>{anime.description}</p>
        <Tags tags={anime.tags.slice(0,5)} />

  </section>
    )
}