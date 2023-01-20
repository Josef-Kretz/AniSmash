import {useLoaderData, useFetcher} from 'react-router-dom'

export async function loader({params})
{
    const query = `{
        Media(id:${params.animeId})
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

export default function AnimePage() {
    const animeLoader = useLoaderData()
    if(animeLoader.isError) return <h1>Error fetching anime</h1>

    const anime = animeLoader.data.Media
    return (
        <section className="animepage">
            <h1>{anime.title.english ? anime.title.english : anime.title.romaji}</h1>
            <img src={anime.coverImage.extraLarge} />
            <p>{anime.description}</p>
        </section>
    )
}