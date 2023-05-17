import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GymCards from './components/GymCards/GymCards'
import Navbar from './components/Navbar/Navbar'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      < Navbar />
      <h1>u08 - grupp 1</h1>
      < GymCards />
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
