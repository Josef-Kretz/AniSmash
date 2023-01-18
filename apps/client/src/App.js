//css files
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//npm modules
import {useState, useEffect} from 'react'
import {NavLink, Switch, Route} from 'react-router-dom'
//react components
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
    <Switch>
      <Route path='/' component={AnimeViewer} />
    </Switch>
    <AnimeViewer anime={anime} setLoggedIn={setLoggedIn} />
    <Footer />
  </>
}

export default App;
