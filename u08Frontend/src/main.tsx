import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Body from './components/Body/Body'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      < Navbar />
      < Body />
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
