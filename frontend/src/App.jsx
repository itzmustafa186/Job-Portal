
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'


function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
     {
      path:"/login",
      element:<Login/>
    },
     {
      path:"/signup",
      element:<Signup/>
    }
  ])

  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
