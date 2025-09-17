import { useState, useContext } from 'react'
import { NavLink} from 'react-router-dom'
import { userdataContext } from '../context/context'
import menu from '../assets/menu.svg'
import xmark from '../assets/xmark.svg'

const Navbar = () => {
    const [bar, setBar] = useState(false)
    const userData = useContext(userdataContext)

    return (
        <>
            <nav className='flex justify-between items-center fixed top-0 text-white h-15 px-3 md:px-10 w-full z-10'>
                <div className="logo text-3xl font-bold">Logo</div>
                <div className='hidden md:flex gap-8 item-center text-semibold'>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/">Home</NavLink>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/contact">Contact</NavLink>
                    <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/about">About</NavLink>
                    { !userData && <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/signup">Sign Up</NavLink>}
                    { !userData && <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/login">Log In</NavLink>}
                    { userData ? <NavLink className={(e) => `flex justify-center items-center px-4 py-1 box-border rounded-md border-2 ${e.isActive ? "border-block" : "border-transparent"}`} to="/profile">Profile</NavLink> : ""}
                    {userData ? <button className='px-4 py-1 box-border rounded-md border-2 border-transparent hover:border-block text-red-400 font-bold' onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}>Log Out</button> : "" }
                </div>
                <img src={menu} className='block md:hidden w-10 invert' onClick={() => setBar(true)} />
                { bar && <div className="box-border flex flex-col md:hidden px-10 py-5 fixed top-15 right-10 justify-center rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white z-20">
                    <img src={xmark} className='invert absolute w-5 block md:hidden self-end top-2 right-2' onClick={()=>setBar(false)}/>
                    <NavLink className={(e) => `px-4 py-1 box-border rounded-md ${e.isActive ? "text-blue-300" : "text-white"}`} onClick={()=>setBar(false)} to="/">Home</NavLink>
                    <NavLink className={(e) => `px-4 py-1 box-border rounded-md ${e.isActive ? "text-blue-300" : "text-white"}`} onClick={()=>setBar(false)} to="/contact">Contact</NavLink>
                    <NavLink className={(e) => `px-4 py-1 box-border rounded-md ${e.isActive ? "text-blue-300" : "text-white"}`} onClick={()=>setBar(false)} to="/about">About</NavLink>
                    { !userData && <NavLink className={(e) => `px-4 py-1 box-border rounded-md ${e.isActive ? "text-blue-300" : "text-white"}`} onClick={()=>setBar(false)} to="/signup">Sign Up</NavLink>}
                    { !userData && <NavLink className={(e) => `px-4 py-1 box-border rounded-md ${e.isActive ? "text-blue-300" : "text-white"}`} onClick={()=>setBar(false)} to="/login">Log In</NavLink>}
                    { userData ? <NavLink className={(e) => `px-4 py-1 box-border rounded-md ${e.isActive ? "text-blue-300" : "text-white"}`} onClick={()=>setBar(false)} to="/profile">Profile</NavLink> : ""}
                    {userData ? <button className='mt-2 px-4 py-1 box-border rounded-md border-2 border-transparent text-red-400 font-bold' onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}>Log Out</button> : "" }
                </div>}
            </nav>
        </>
    )
}

export default Navbar