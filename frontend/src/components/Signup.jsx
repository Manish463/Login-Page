import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import person from '../assets/person.svg'
import emailsvg from '../assets/email.svg'
import show from '../assets/show.svg'
import hide from '../assets/hide.svg'
import { useNavigate } from 'react-router-dom'

function Signup({sendResponse}) {
  const navigate = useNavigate()
  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)
  const inputRef4 = useRef(null)
  const pwdRef1 = useRef(null)
  const pwdRef2 = useRef(null)
  const imgRef1 = useRef(null)
  const imgRef2 = useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if(data.password != data['confirm password']) {
      alert(errors['confirm password'].message)
      return
    }
    let response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if(response.status === 400) {
      setError('email', {message: 'Email already exists!'})
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
      <form onSubmit={handleSubmit(onSubmit)} className="box-border fram flex flex-col min-h-[430px] w-[330px] p-3 px-8 justify-evenly rounded-xl items-center border border-gray-400 backdrop-blur-sm bg-black/30 shadow-md shadow-gray-600 text-white">

        <div className='flex flex-col gap-3 items-center'>
          <h1 className='text-4xl font-semibold'>Sign Up</h1>
          <p className='text-sm'>Already have a Account? <Link to='/login' className='text-sm text-cyan-300'>Log in</Link> </p>
        </div>

        <div className='flex flex-col gap-5 w-full py-4'>
          <div className='flex flex-col m-0'>
            <label htmlFor="username" className='absolute' ref={inputRef1}>Full Name</label>
            <input id='username' type="text" {...register("username", {required: {value: true, message: "Fill this area first"}})} className='w-full border-b-2 outline-0' onClick={() => shiftlabel(inputRef1)}/>
            <img src={person} className='w-5 invert self-end absolute' />
            {errors.username && <span className='text-red-500 text-xs'>{errors.username.message}</span>}
          </div>
          <div className='flex flex-col m-0'>
            <label htmlFor="email" className='absolute' ref={inputRef2}>Email</label>
            <input id='email' type="email" {...register("email", {required: {value: true, message: "Fill this area first"}})}  className='w-full border-b-2 outline-0' onClick={() => shiftlabel(inputRef2)}/>
            <img src={emailsvg} className='w-5 invert self-end absolute' />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col m-0'>
            <label htmlFor="pwd" className='absolute' ref={inputRef3}>Password</label>
            <input id='pwd' type="password" {...register("password", {required: {value: true, message: "Fill this area first"}, minLength: {value: 8, message: "The password should contains at least 8 charactors"}})}  className='w-full border-b-2 outline-0' onClick={() => shiftlabel(inputRef3)} ref={(e) => {register("password").ref(e); pwdRef1.current = e}} />
            <img src={hide} className='w-5 invert self-end absolute' onClick={() => toggalpwd(pwdRef1, imgRef1)} ref={imgRef1} />
            {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
          </div>
          <div className='flex flex-col m-0'>
            <label htmlFor="new-pwd" className='absolute' ref={inputRef4}>Confirm Password</label>
            <input id='new-pwd' type="password" {...register("confirm password", {required: {value: true, message: "Fill this area first"}, validate : (value) => value === watch("password") || "Your password and confirm password must be the same."})} className='w-full border-b-2 outline-0' onClick={() => shiftlabel(inputRef4)} ref={(e) => {register("confirm password").ref(e); pwdRef2.current = e}} />
            <img src={hide} className='w-5 invert self-end absolute' onClick={() => toggalpwd(pwdRef2, imgRef2)} ref={imgRef2} />
            {errors['confirm password'] && <span className='text-red-500 text-xs'>{errors['confirm password'].message}</span>}
          </div>
        </div>

        <input type="submit" value="Sign Up" className='w-full p-2 rounded-lg text-lg text-white bg-blue-500' />
      </form>
  )
}

export default Signup
