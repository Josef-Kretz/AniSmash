//npm modules
import { createBrowserRouter } from 'react-router-dom';
//react components
import Root from '../routes/root'
import ErrorPage from '../error-page'
import HomePage from '../HomePage'
import Anime, {loader as vidsLoader} from '../Anime'
import AnimePage, {loader as animeLoader} from './animePage'
import Library, {loader as libraryLoader} from '../Library'
import Profile, {loader as profileLoader} from '../Profile'
import SearchPage from '../SearchPage'
import Auth from '../components/Auth';

const router = createBrowserRouter([
    {
      path:"/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [{
        errorElement: <ErrorPage />,
        children:[
          {
            index: true,
            element: <HomePage />
          },
          {
            path: "anime",
            element: <Auth><Anime /></Auth>,
            loader: vidsLoader
          },
          {
            path: "library",
            element: <Auth><Library /></Auth>,
            loader: libraryLoader
          },
          {
            path:"library/:animeId",
            element: <AnimePage />,
            loader: animeLoader
          },
          {
            path:'profile',
            element: <Auth><Profile /></Auth>,
            loader: profileLoader
          },
          {
            path:'search',
            element: <SearchPage />
          }
        ]
    }]
    }
  ])

  export default router