import React from 'react'
import { useContext } from 'react'
import { userdataContext } from '../context/context'

const Profile = () => {
    const userData = useContext(userdataContext)

    return (
        <div className="box-border flex flex-col p-3 px-8 justify-center rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white">
            <div>
                <p>Hello, <i>{userData.username}</i></p>
                <br />
                <p>Here your email id and password, </p>
                <p>Email: <i>{userData.email}</i></p>
                <p>Password: <i>{userData.password}</i></p>
            </div>
        </div>
    )
}

export default Profile
