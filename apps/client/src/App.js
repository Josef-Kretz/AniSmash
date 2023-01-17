import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import AnimeViewer from './components/AnimeViewer'
import Header from './components/Header'
import Footer from './components/Footer'

//pages
// anime viewer, library viewer, home page, profile page

function App() {
  //get an array of anime and pass to AnimeViewer
  const [loggedIn, setLoggedIn] = useState(false)
  const [anime, setAnime] = useState([])

  return <>
    <Header title='AniSmash' loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    <AnimeViewer anime={anime} setLoggedIn={setLoggedIn} />
    <Footer />
  </>
}

export default App;
