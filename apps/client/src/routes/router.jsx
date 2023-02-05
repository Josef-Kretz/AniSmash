//npm modules
import { createBrowserRouter } from 'react-router-dom';
//react components
import Root from '../routes/root'
import ErrorPage from '../error-page'
import Anime from '../Anime'
import AnimePage, {loader as animeLoader} from './animePage'
import Library, {loader as libraryLoader} from '../Library'
import Profile, {loader as profileLoader} from '../Profile'
import SearchPage from '../SearchPage'

const router = createBrowserRouter([
    {
      path:"/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "anime",
          element: <Anime />,
          errorElement: <ErrorPage />
        },
        {
          path: "library",
          element: <Library />,
          errorElement: <ErrorPage />,
          loader: libraryLoader
        },
        {
          path:"library/:animeId",
          element: <AnimePage />,
          errorElement: <ErrorPage />,
          loader: animeLoader
        },
        {
          path:'profile',
          element: <Profile />,
          errorElement: <ErrorPage />,
          loader: profileLoader
        },
        {
          path:'search',
          element: <SearchPage />,
          errorElement: <ErrorPage />
        }
      ]
    }
  ])

  export default router