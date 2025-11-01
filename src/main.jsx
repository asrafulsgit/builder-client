
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './routes/index.js'
import AuthContext from './controllers/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <AuthContext>
    <RouterProvider router={routes}/>
  </AuthContext>
  </>,
)
