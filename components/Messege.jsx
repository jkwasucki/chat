import React, {useContext, useRef, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Messege({msg,key}) {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const ref = useRef()
  
 
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  
  return (
    <div ref={ref} className={currentUser.uid === msg.senderId ? 'flex justify-end' : 'flex'}>
      <div id={key} className={currentUser.uid !== msg.senderId ? 'flex flex-row-reverse items-start gap-5' : 'flex flex-row items-start gap-5'}>
        <div className='flex flex-col items-end gap-2'>
          <div className={msg.text ? 'bg-blue-200 p-3 rounded-xl rounded-tr-sm flex justify-end' : 'hidden'}>
            <p>{msg.text}</p>
          </div>
          {msg.img && <div className='w-[500px] h-[500px]'>
           <img src={msg.img} className='w-full h-full object-cover'/>
          </div>}
        </div>
        <div className='w-12 h-12'>
          <img src={msg.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} className='w-full h-full object-cover rounded-full border bg-white'  />
        </div>
      </div>
    </div>







    // <div className={currentUser.uid === msg.senderId ? 'flex justify-end' : 'flex'}>
    //   <div id={key} className='p-2 rounded-xl bg-blue-100 flex flex-row items-end gap-3'>
    //     <div className='flex flex-row items-center'>
    //       <p>{msg.text}</p>
    //       <div className='w-10 h-10 mx-2'>
    //         <img src={msg.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} className='object-cover w-full h-full rounded-full' />
    //       </div>
    //     </div>
    //   </div>
    //   <div className={msg.img ? 'w-[500px] h-[500px]' : 'hidden'}>
    //     <img src={msg.img} className='w-full h-full object-cover'/>
    //   </div>
    // </div>
  )
}

export default Messege