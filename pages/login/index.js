import React from 'react'
import Link from 'next/link'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

function Login() {
  const {currentUser} = useContext(AuthContext)
  const router = useRouter()
  const [error,setError] = React.useState(false)
  async function handleSubmit(event) {
    event.preventDefault()
    const email= event.target[0].value
    const password= event.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    }catch(err) {
      setError(true)
    }
  }


  return (
    <div className='w-full h-screen relative z-10 bg-zinc-800 flex justify-center items-center'>
    {error && (
    <motion.div animate={{y:215, opacity:1}} initial={{y:300, opacity:0}} transition={{duration:0.3}} className='flex items-center justify-center font-bold text-white w-[250px] rounded-xl h-10 bg-red-500 absolute -z-10 top-10'>
      <p>Wrong email or password</p>
    </motion.div>
    )}
    <div className=' bg-white rounded-xl p-9 '>
        <div className='flex flex-col w-full h-full items-center justify-center text-center'>
            <p className='text-2xl pb-2 font-bold'>Your Personal Chat</p>
            <p className='text-sm'>Login</p>
            <form onSubmit={handleSubmit} className='py-4 flex flex-col items-center justify-center text-center'>
                <input type='text' placeholder='email'className='border-b outline-none p-2 text-center' />
                <input type='password' placeholder='password' className='border-b outline-none p-2 text-center'/>
                <button className='bg-green-800 text-white w-1/2 py-1 rounded-xl hover:scale-105 mt-5'>Sign in</button>
            </form>
            <p className='mt-5'>or create account via<Link href="/register" className='text-green-700'> registration</Link></p>
        </div>
    </div>
</div>
  )
}

export default Login