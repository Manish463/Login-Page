import React from 'react'
import { useContext } from 'react'
import { userdataContext } from '../context/context'

function Home() {
  const userData = useContext(userdataContext)

  return (
    <div className="box-border flex flex-col p-3 px-8 justify-center rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white">
      <h2 className='text-xl font-bold'>{userData ? `Welcome ${userData.username}` : "Welcome to the page" }</h2>
    </div>
  )
}

export default Home
