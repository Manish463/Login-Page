import { set, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import person from '../assets/person.svg'
import emailsvg from '../assets/email.svg'
import show from '../assets/show.svg'
import hide from '../assets/hide.svg'
import { useNavigate } from 'react-router-dom'

function Signup({sendResponse}) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPwdShow1, setIsPwdShow1] = useState(false)
  const [isIconShow1, setIsIconShow1] = useState(hide)
  const [isPwdShow2, setIsPwdShow2] = useState(false)
  const [isIconShow2, setIsIconShow2] = useState(hide)
  const [focusState, setFocusState] = useState({first: false, second: false, third: false, fourth: false})

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    if(data.password != data['confirm password']) {
      alert(errors['confirm password'].message)
      return
    }
    let response = await fetch('https://login-page-server-side.vercel.app/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if(response.status === 400) {
      setError('email', {message: 'Email already exists!'})
    } else {
      let { result, token } = await response.json()
      localStorage.setItem('token', token)
      sendResponse(result)
      navigate("/")
    }
    setIsSubmitting(false)
  }

  const toggal = (turn) => {
    if(turn == "first") {
      setIsPwdShow1(!isPwdShow1)
      isPwdShow1 ? setIsIconShow1(hide) : setIsIconShow1(show)
    } else {
      setIsPwdShow2(!isPwdShow2)
      isPwdShow2 ? setIsIconShow2(hide) : setIsIconShow2(show)
    }
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="box-border fram flex flex-col min-h-[25em] w-[18em] md:w-[20em] m-3 p-3 px-8 justify-evenly rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white">

        <div className='flex flex-col gap-3 items-center'>
          <h1 className='text-4xl font-semibold'>Sign Up</h1>
          <p className='text-sm'>Already have a Account? <Link to='/login' className='text-sm text-cyan-300'>Log in</Link> </p>
        </div>

        <div className='flex flex-col gap-5 w-full py-4'>
          <div className='flex flex-col m-0'>
            <label htmlFor="username" className={`absolute  ${ focusState.first ? "-translate-y-4 text-sm text-gray-300" : "translate-y-0 text-md text-white"}`} >Full Name</label>
            <input id='username' type="text" {...register("username", {required: {value: true, message: "Fill this area first"}})} className='w-full border-b-2 outline-0' onFocus={()=>setFocusState({...focusState, first: true})} onBlur={(e)=>setFocusState({...focusState, first: e.target.value !== ""})}/>
            <img src={person} className='w-5 invert self-end absolute' />
            {errors.username && <span className='text-red-500 text-xs'>{errors.username.message}</span>}
          </div>
          <div className='flex flex-col m-0'>
            <label htmlFor="email" className={`absolute  ${focusState.second ? "-translate-y-4 text-sm text-gray-300" : "translate-y-0 text-md text-white"}`} >Email</label>
            <input id='email' type="email" {...register("email", {required: {value: true, message: "Fill this area first"}})}  className='w-full border-b-2 outline-0' onFocus={()=>setFocusState({...focusState, second: true})} onBlur={(e)=>setFocusState({...focusState, second: e.target.value !== ""})}/>
            <img src={emailsvg} className='w-5 invert self-end absolute' />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col m-0'>
            <label htmlFor="pwd" className={`absolute  ${focusState.third ? "-translate-y-4 text-sm text-gray-300" : "translate-y-0 text-md text-white"}`} >Password</label>
            <input id='pwd' type={isPwdShow1 ? "text" : "password"} {...register("password", {required: {value: true, message: "Fill this area first"}, minLength: {value: 8, message: "The password should contains at least 8 charactors"}})}  className='w-full border-b-2 outline-0' onFocus={()=>setFocusState({...focusState, third: true})} onBlur={(e)=>setFocusState({...focusState, third: e.target.value !== ""})} />
            <img src={isIconShow1} className='w-5 invert self-end absolute' onClick={() => toggal("first")} />
            {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
          </div>
          <div className='flex flex-col m-0'>
            <label htmlFor="new-pwd" className={`absolute  ${focusState.fourth ? "-translate-y-4 text-sm text-gray-300" : "translate-y-0 text-md text-white"}`} >Confirm Password</label>
            <input id='new-pwd' type={isPwdShow2 ? "text" : "password"} {...register("confirm password", {required: {value: true, message: "Fill this area first"}, validate : (value) => value === watch("password") || "Your password and confirm password must be the same."})} className='w-full border-b-2 outline-0' onFocus={()=>setFocusState({...focusState, fourth: true})} onBlur={(e)=>setFocusState({...focusState, fourth: e.target.value !== ""})} />
            <img src={isIconShow2} className='w-5 invert self-end absolute' onClick={() => toggal("second")} />
            {errors['confirm password'] && <span className='text-red-500 text-xs'>{errors['confirm password'].message}</span>}
          </div>
        </div>

        <input type="submit" value={isSubmitting ? "Submitting": "Sign Up"} disabled={isSubmitting} className='w-full p-2 rounded-lg text-lg text-white bg-blue-500' />
      </form>
  )
}

export default Signup
