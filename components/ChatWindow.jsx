import React, {useContext, useEffect} from 'react'
import Messege from './Messege'
import ChatTop from './ChatTop'
import Input from './Input'

import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import {doc, onSnapshot} from 'firebase/firestore'
import {db } from '../firebase'




function ChatWindow() {

const [messages, setMessages] = React.useState([])
const {currentUser} = useContext(AuthContext)
const { data } = useContext(ChatContext)
useEffect(()=> {
  const unSub = onSnapshot(doc(db,'chats', data.chatId), (doc) => {
    doc.exists() && setMessages(doc.data().messages)
  })
  return () => {
    unSub()
  }
},[data.chatId])

console.log(messages)

  return (
    <div className='w-full h-full'>
        <div className='w-full h-[10%] bg-zinc-700 rounded-tr-xl flex justify-end p-5 text-2xl text-white'>
          <ChatTop />
        </div>
        <div className=' h-[80%] bg-zinc-600 flex flex-col gap-2 p-2 overflow-scroll'>
          {messages.map((m) => {
             return (
             <Messege msg={m} key={m.id} />
             )
          })}
        </div>
        <Input />
    </div>
  )
}

export default ChatWindow