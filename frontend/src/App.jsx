import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import './App.css'
import { userdataContext } from './context/context'

function App() {
  const [userData, setuserData] = useState(0)
  const handleResponse = (data) => {
    setuserData({data})
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /></>
    },
    {
      path: '/contact',
      element: <><Navbar /><Contact /></>
    },
    {
      path: '/about',
      element: <><Navbar /><About /></>
    },
    {
      path: '/signup',
      element: <><Navbar /><Signup sendResponse={handleResponse} /></>
    },
    {
      path: '/login',
      element: <><Navbar /><Login sendResponse={handleResponse} /></>
    },
    {
      path: '/profile',
      element: <><Navbar /><Profile /></>
    }
  ])

  return (
    <>
      <userdataContext.Provider value={ userData } >
        <div className="container flex justify-center items-center h-screen m-0 p-0 box-border bg-[url('./images/background.jpg')] bg-cover bg-center text-white">
          <RouterProvider router={router} />
        </div>
      </userdataContext.Provider>
    </>
  )
}

export default App