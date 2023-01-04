import React from 'react'
import {doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useEffect, useState } from 'react'


function SideChats() {
  const [chats,setChats] = React.useState([])
  const { dispatch } = useContext(ChatContext)

  const {currentUser} = useContext(AuthContext)
  React.useEffect(() => {
   const getChats= () =>{ 
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data())
  });
    return () => {
      unsub()
    }
  }
  currentUser.uid && getChats()
},[currentUser.uid])


  function handleSelect(u) {
    dispatch({type:'CHANGE_USER', payload: u })
  }


  return (
    <>
    {Object.entries(chats).map((chat) => (
    <div key={chat[0]} onClick={() => handleSelect(chat[1].userinfo)} className=' text-ellipsis overflow-hidden items-center  flex  mb-3 gap-3 '>
        <div className='rounded-full border bg-white'>
            <img src={chat[1].userinfo.photoURL} className='min-w-[55px] h-[60px] w-[60px] md:w-[50px] md:h-[50px] object-cover rounded-full' />
        </div>
        <div className='flex flex-col'>
          <p className='text-white font-bold'>{chat[1].userinfo.displayName}</p>
          <p className=' md:flex hidden whitespace-nowrap text-ellipsis overflow-hidden text-gray-500'>{chat[1].lastMessage.text}</p> 
        </div>
    </div>
    ))}
    </>
  )
}

export default SideChats