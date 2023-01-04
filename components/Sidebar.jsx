import React from 'react'
import User from './User'
import SideChats from './SideChats'
import {AiOutlineLogout} from 'react-icons/ai'
import { signOut } from 'firebase/auth'
import { auth,db } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { collection, query, where,getDocs,doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { current } from '@reduxjs/toolkit'
import { ChatContext } from '../context/ChatContext'
import { useReducer } from 'react'



function Sidebar() {
  const {dispatch} = useReducer(ChatContext)
  const router = useRouter()
  const {currentUser} = useContext(AuthContext)
  currentUser === null && router.push('/login')
  
  const [username, setUsername] = React.useState('')
  const [user, setUser] = React.useState(null)
  async function handleSearch() {
    const usersRef = collection(db, 'users' )
    const q = query(usersRef, where("displayName", "==", username));
    if (username !== currentUser.displayName) {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }
    username === '' && setUser(null)
  }
  function handleKey(event) {
    handleSearch()
    
    
  }

  async function handleSelect() {
    
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    
    try {
    
      const res = await getDoc(doc(db,'chats',combinedId))
      if (!res.exists()) {
        await setDoc(doc(db,'chats',combinedId),{messages: []})
        await updateDoc(doc(db,'userChats',currentUser.uid), {
          [combinedId+'.userinfo']: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+'.date']:serverTimestamp()
        })
        await updateDoc(doc(db,'userChats',user.uid), {
          [combinedId+'.userinfo']: {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+'.date']:serverTimestamp()
        })
      }
    } catch(error) {
      console.log(error)
    }
    setUsername('')
    setUser(null)
  }
  return (
    <div className='w-full h-full'>
        <div className='w-full h-[10%] bg-zinc-900 rounded-tl-xl'>
          <div className='flex flex-col' >
              <User />
          </div>
        </div>
        <div className='w-full h-[90%] bg-zinc-800 rounded-bl-xl'>
          <input onKeyDown={handleKey} onChange={(event) => setUsername(event.target.value)} type='text' placeholder='search' className='border-b border-zinc-500 p-4 w-full bg-transparent outline-none text-white'/>
          { user && 
          <div onClick={handleSelect} className='flex items-center justify-center gap-3 p-4'>
            <div className='rounded-full w-12 h-12 bg-white'>
                <img src={user.photoURL} className=' object-cover rounded-full w-full h-full' />
            </div>
            <div className='text-white'>
              <p>{user.displayName}</p>
            </div>
          </div>}
          <div className='p-3 overflow-auto w-full max-h-[80%] flex flex-start'>
            <SideChats />
          </div>
        </div>
        <div className='relative bottom-11 ml-2'>
          <button onClick={() => signOut(auth)} className=' w-9 h-9 bg-red-300 rounded-xl text-black flex items-center justify-center'><AiOutlineLogout className='w-5 h-5'/></button>
        </div>
    </div>
  )
}

export default Sidebar