import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import emailsvg from '../assets/email.svg'
import show from '../assets/show.svg'
import hide from '../assets/hide.svg'
import { useNavigate } from 'react-router-dom'

const Login = ({sendResponse}) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPwdShow, setIsPwdShow] = useState(false)
  const [isIconShow, setIsIconShow] = useState(hide)
  const [focusState, setFocusState] = useState({first: false, second: false})

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const response = await fetch('https://login-page-server-side.vercel.app/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if(response.status === 401) {
      let res = await response.text()
      setError('email', {message: res})
    } else {
      let { result, token } = await response.json()
      localStorage.setItem('token', token)
      sendResponse(result)
      navigate("/")
    }
    setIsSubmitting(false)
  }

  const toggalpwd = () => {
    setIsPwdShow(!isPwdShow)
    isPwdShow ? setIsIconShow(hide) : setIsIconShow(show)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="box-border fram flex flex-col min-h-[23em] w-[18em] md:w-[20em] m-3 p-3 px-8 justify-evenly rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white">

        <div className='flex flex-col gap-3 items-center'>
          <h1 className='text-4xl font-semibold'>Log In</h1>
          <p className='text-sm'>Don't have a Account? <Link to='/signup' className='text-sm text-cyan-300'>SignUp</Link> </p>
        </div>

        <div className='flex flex-col gap-5 w-full'>

          <div className='flex flex-col m-0'>
            <label htmlFor="email" className={`absolute  ${focusState.first ? "-translate-y-4 text-sm text-gray-300" : "translate-y-0 text-md text-white"}`}>Email</label>
            <input id='email' type="email" {...register("email", { required: { value: true, message: "Fill this area first" } })} className='w-full border-b-2 outline-0' onFocus={()=>setFocusState({...focusState, first: true})} onBlur={(e)=>setFocusState({...focusState, first: e.target.value !== ""})}/>
            <img src={emailsvg} className='w-5 invert self-end absolute' />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col m-0'>
            <label htmlFor="pwd" className={`absolute  ${focusState.second ? "-translate-y-4 text-sm text-gray-300" : "translate-y-0 text-md text-white"}`}>Password</label>
            <input id='pwd' type={isPwdShow ? "text" : "password"} {...register("password", { required: { value: true, message: "Fill this area first" } })} className='w-full border-b-2 outline-0' onFocus={()=>setFocusState({...focusState, second: true})} onBlur={(e)=>setFocusState({...focusState, second: e.target.value !== ""})} />
            <img src={isIconShow} className='w-5 invert self-end absolute' onClick={() => toggalpwd()} />
            {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
          </div>

        </div>

        <input type="submit" value={isSubmitting ? "Submitting" : "Log In"} className='w-full p-2 rounded-lg text-lg text-white bg-blue-500' />
      </form>
    </>
  )
}

export default Login
