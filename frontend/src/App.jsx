
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import AdminCompanies from './components/admin/AdminCompanies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'



function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/jobs",
      element: <Jobs />
    },
    {
      path: "/description/:id",
      element: <JobDescription />
    },
    // Admin Side
    {
      path: "/admin/companies",
      element: <AdminCompanies />
    },
    {
      path: "/admin/companies/create",
      element: <CreateCompany />
    },
    {
      path: "/admin/companies/:id",
      element: < CompanySetup />
    },
  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
