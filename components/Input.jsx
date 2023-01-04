
import React from 'react'
import {AiOutlinePicture} from 'react-icons/ai'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { arrayUnion,doc,serverTimestamp, Timestamp,updateDoc } from 'firebase/firestore'
import { db,storage } from '../firebase'
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'



function Input() {

const [text, setText] = React.useState("")
const [img, setImg] = React.useState(null)
const {currentUser} = useContext(AuthContext)
const {data} = useContext(ChatContext)

async function handleSend(event) {
    event.preventDefault()

  if(img) {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img)
    uploadTask.on(
      (error) => {
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
              id: uuid(),
              text,
              senderId:currentUser.uid,
              date:Timestamp.now(),
              img: downloadURL
            })
          })
        
        });
      }
    );
  } else {
    await updateDoc(doc(db,"chats",data.chatId),{
      messages:arrayUnion({
        id: uuid(),
        text,
        senderId:currentUser.uid,
        date:Timestamp.now()
      })
    })
    setText('')
  }
  await updateDoc(doc(db,"userChats",currentUser.uid), {
    [data.chatId + ".lastMessage"]: {
        text,
    },
    [data.chatId + '.date']: serverTimestamp()
  })
  await updateDoc(doc(db,"userChats",data.user.uid), {
    [data.chatId + ".lastMessage"]: {
        text,
    },
    [data.chatId + '.date']: serverTimestamp()
  })
  setText('')
  setImg(null)
}
  return (
    <form  className='w-full h-[10%] rounded-br-xl bg-white flex justify-between items-center'>
        <input value={text} onChange={event => setText(event.target.value)} type='text' placeholder='type something...' className='ml-5 md:text-2xl outline-none w-[80%] h-full' />
        <input onChange={event => setImg(event.target.files[0])} type='file' id='img' className='hidden'/>
        <label htmlFor='img'>
            <AiOutlinePicture size={40} className='opacity-50 mr-5' />
        </label>
        <button onClick={handleSend} className='bg-gray-400 text-white px-2 rounded mr-5'>send</button>
    </form>
  )
}

export default Input


