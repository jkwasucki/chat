import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { storage, auth } from '../firebase'
import { ref, uploadBytes, getAuth,uploadBytesResumable, updateProfile, getDownloadURL } from "firebase/storage";
import { updateCurrentUser } from 'firebase/auth';
import { current } from '@reduxjs/toolkit';

export default function User() {
  const {currentUser} = useContext(AuthContext)
   function handleSubmit(event) {
    const file = event.target.files[0]
    try {
      const storageRef = ref(storage, auth.currentUser.displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            displayName:auth.currentUser.displayName, photoURL: downloadURL
          })
        });
      }
    } catch (error) {
      console.log('somethiung wrong')
    }
  }
  return (
    <div>
        <div className='flex text-white items-center  justify-center p-5'>
            <form className='h-10 w-10 md:mr-5 bg-white rounded-full'>
                <input onChange={handleSubmit} type='file' id='avatar1' className='hidden' />
                <label htmlFor='avatar1'>
                  <img  src={currentUser && currentUser.photoURL} className=' w-full h-full rounded-full object-cover' />
                </label>
            </form>
            <p className='md:flex hidden'>{currentUser && currentUser.displayName}</p>
        </div>
    </div>
  )
}
