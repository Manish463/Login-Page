import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import emailsvg from '../assets/email.svg'
import show from '../assets/show.svg'
import hide from '../assets/hide.svg'
import { useNavigate } from 'react-router-dom'

const Login = ({sendResponse}) => {
  const navigate = useNavigate()
  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const pwdRef1 = useRef(null)
  const imgRef1 = useRef(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    let response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if(response.status === 400) {
      let res = await response.text()
      if(res == "Invalid email!")
        setError('email', {message: res})
      setError('password', {message: "Invalid password!"})
      if(res == "Invalid password!")
        setError('password', {message: res})
    } else {
      let res = await response.json()
      sendResponse(res)
      navigate("/")
    }
  }

  const shiftlabel = (word) => {
    word.current.classList.add('-translate-y-4', 'text-sm', 'text-gray-300')
  }

  const toggalpwd = (pwdRef, imgRef) => {
    if (pwdRef.current.type === 'password') {
      pwdRef.current.type = 'text'
      imgRef.current.src = show
    } else {
      pwdRef.current.type = 'password'
      imgRef.current.src = hide
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="box-border fram flex flex-col min-h-[400px] w-[330px] p-3 px-8 justify-evenly rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white">

        <div className='flex flex-col gap-3 items-center'>
          <h1 className='text-4xl font-semibold'>Log In</h1>
          <p className='text-sm'>Don't have a Account? <Link to='/signup' className='text-sm text-cyan-300'>SignUp</Link> </p>
        </div>

        <div className='flex flex-col gap-5 w-full'>

          <div className='flex flex-col m-0'>
            <label htmlFor="email" className='absolute' ref={inputRef1}>Email</label>
            <input id='email' type="email" {...register("email", { required: { value: true, message: "Fill this area first" } })} className='w-full border-b-2 outline-0' onClick={() => shiftlabel(inputRef1)} />
            <img src={emailsvg} className='w-5 invert self-end absolute' />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col m-0'>
            <label htmlFor="pwd" className='absolute' ref={inputRef2}>Password</label>
            <input id='pwd' type="password" {...register("password", { required: { value: true, message: "Fill this area first" } })} className='w-full border-b-2 outline-0' onClick={() => shiftlabel(inputRef2)} ref={(e) => { register("password").ref(e); pwdRef1.current = e; }} />
            <img src={hide} className='w-5 invert self-end absolute' onClick={() => toggalpwd(pwdRef1, imgRef1)} ref={imgRef1} />
            {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
          </div>

        </div>

        <input type="submit" value="Log In" className='w-full p-2 rounded-lg text-lg text-white bg-blue-500' />
      </form>
    </>
  )
}

export default Login
