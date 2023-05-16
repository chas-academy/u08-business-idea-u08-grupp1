import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './components/Footer/Footer'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      <h1>u08 - grupp 1</h1>
      <Footer></Footer>
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
