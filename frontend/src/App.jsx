import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import Signup from './components/Signup'
import Login from './components/Login'
import './App.css'

function App() {
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
      element: <><Navbar /><Signup /></>
    },
    {
      path: '/login',
      element: <><Navbar /><Login /></>
    }
  ])

  return (
    <>
      <div className="container flex justify-center items-center h-screen m-0 p-0 box-border bg-[url('./images/background.jpg')] bg-cover bg-center text-white">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App