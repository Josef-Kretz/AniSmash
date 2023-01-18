//npm modules
import { createBrowserRouter } from 'react-router-dom';
//react components
import Root from '../routes/root'
import ErrorPage from '../error-page'
import Anime from '../Anime'

const router = createBrowserRouter([
    {
      path:"/page",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "anime",
          element: <Anime />
        }
      ]
    }
  ])

  export default router