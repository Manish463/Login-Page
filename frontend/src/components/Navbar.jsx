import React from 'react'
import { NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className='flex justify-between items-center fixed top-0 text-white h-15 px-10 w-full'>
                <div className="logo text-3xl font-bold">Logo</div>
                <div className='flex gap-8 item-center text-semibold'>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/">Home</NavLink>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/contact">Contact</NavLink>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/about">About</NavLink>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/signup">Sign Up</NavLink>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/login">Log In</NavLink>
                </div>
            </nav>
        </>
    )
}

export default Navbar
