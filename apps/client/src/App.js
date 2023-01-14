import './App.css';
import {useState} from 'react'
import AnimeViewer from './components/AnimeViewer'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  //get an array of anime and pass to AnimeViewer
  const [anime, setAnime] = useState([])
  return <>
    <Header title='AniSmash' />
    <AnimeViewer anime={anime} />
    <Footer />
  </>
}

export default App;
