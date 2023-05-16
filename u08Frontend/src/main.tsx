import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GymCards from './components/GymCards/GymCards'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      < GymCards />
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
