//npm modules
import { createBrowserRouter } from 'react-router-dom';
//react components
import Root from '../routes/root'
import ErrorPage from '../error-page'
import Anime from '../Anime'
import AnimePage, {loader as animeLoader} from './animePage'

const router = createBrowserRouter([
    {
      path:"/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "anime",
          element: <Anime />
        },
        {
          path:"library/:animeId",
          element: <AnimePage />,
          loader: animeLoader
        }
      ]
    }
  ])

  export default router