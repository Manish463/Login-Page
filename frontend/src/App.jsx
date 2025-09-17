import { useEffect, useState } from 'react'
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
    setuserData(data)
  }

  const fetchData = async () => {
    let jwt = localStorage.getItem('token');
    let response = await fetch('https://login-page-server-side.vercel.app/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token: jwt }), // wrap in object
    });

    if (response.status === 200) {
      let data = await response.json();
      setuserData(data);
    } else {
      setuserData(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <userdataContext.Provider value={userData} >
        <div className="container w-full flex justify-center items-center h-screen m-0 p-0 box-border bg-black text-white bg-[url('images/background2.jpg')] bg-cover bg-center bg-no-repeat">
          <RouterProvider router={router} />
        </div>
      </userdataContext.Provider>
    </>
  )
}

export default App