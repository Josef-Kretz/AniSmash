import Badge from "react-bootstrap/Badge";

const Genres = ({genres}) => {
    if(genres.length){
        return <section className='genreCon'>
            {genres.map(gen => {
                const key = gen
                return <Badge pill bg='info' key={key} >{gen}</Badge>
            })}
        </section>
    }
  }

  export default Genres