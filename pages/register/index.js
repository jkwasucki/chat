import React from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {RxAvatar} from 'react-icons/rx'
import { useRouter } from 'next/router'
import {motion} from 'framer-motion'
import { AuthContext, AuthContextProvider } from '../../context/AuthContext';
import { useContext } from 'react';


function Register() {
const router = useRouter()
const [error, setError] = React.useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
   const displayName = event.target[0].value
   const email = event.target[1].value
   const password = event.target[2].value
   const file = event.target[3].files[0]


  try{
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL:downloadURL
          })
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL:downloadURL
    
          })
          await setDoc(doc(db,"userChats",res.user.uid),{})
         router.push('/')
        });
      }
    );
  } catch(error) {
    setError(true)
  }

  }


  return (
    <div className='w-full h-screen bg-zinc-800 relative z-10 flex justify-center items-center'>
    {error && (
    <motion.div animate={{y:195, opacity:1}} initial={{y:250, opacity:0}} transition={{duration:0.3}} className=' font-bold text-white w-[300px] rounded-xl h-10 bg-red-500 absolute -z-10 top-10'>
      <div className='flex justify-center w-full h-full items-center'>
        <p>Password too short or invalid email</p>
      </div>
    </motion.div>
    )}
    <div className=' bg-white rounded-xl rounded-bl-[9rem] p-9 '>
        <div className='flex flex-col w-full h-full items-center justify-center text-center'>
            <p className='text-2xl pb-2 font-bold'>Your Personal Chat</p>
            <p className='text-sm'>Register</p>
            <form onSubmit={handleSubmit} className='py-4 flex flex-col items-center '>
                <input type='text' placeholder='name' className='border-b p-2 outline-none text-center '/>
                <input type='text' placeholder='email'className='border-b p-2 outline-none text-center' />
                <input type='password' placeholder='password' className='border-b p-2 outline-none text-center'/>
                <input type='file' id='avatar' className='hidden'/>
                <label htmlFor='avatar'>
                  <div className='flex flex-row items-center justify-center pt-3 cursor-pointer pb-5'>
                    <RxAvatar size={30} className='mr-2'/>
                    <p>Your Avatar</p>
                  </div>
                </label>
                <button className='bg-green-800 text-white w-1/2 py-1 rounded-xl hover:scale-105'>Register</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Register