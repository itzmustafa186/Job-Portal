
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
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import Browse from './components/Browse'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Contact from './components/Contact'
import { Suspense } from 'react'




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
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/description/:id",
      element: <JobDescription />
    },
    // Admin Side
    {
      path: "/admin/companies",
      element: <ProtectedRoute><AdminCompanies /></ProtectedRoute>
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
    },
    {
      path: "/admin/companies/:id",
      element: <ProtectedRoute>< CompanySetup /></ProtectedRoute>
    },
    {
      path: "/admin/jobs",
      element: <ProtectedRoute> < AdminJobs /></ProtectedRoute>
    },
    {
      path: "/admin/jobs/post",
      element: <ProtectedRoute>< PostJob /></ProtectedRoute>
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <ProtectedRoute>< Applicants /></ProtectedRoute>
    },
  ])

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={appRouter} />
</Suspense>
    </>
  )
}

export default App
