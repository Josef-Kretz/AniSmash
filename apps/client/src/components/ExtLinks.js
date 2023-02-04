import {siteIcons} from './Icons'

const ExtLinks = ({links}) => {
    if(!links) return <></>

    const oneLink = Object.keys(siteIcons)
    const streams = links.filter( link => oneLink.includes(link.site))

    return <section className='streamCon'>
        <ul aria-label='Streaming Sites:'>
            {streams.map(link => {
                const imgLink = siteIcons[link.site]
                return <li key={link.url}>
                    <a href={link.url}>
                        <img className='streamIcon' alt={`Click to go to streaming site ${link.site}`} src={imgLink} />
                    </a>
                </li>
            })}
        </ul>
    </section>
}

export default ExtLinks