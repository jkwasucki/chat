import React from 'react'
import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'

function index() {
  
  return (
    <div className='bg-neutral-400 w-full h-screen flex justify-center items-center '>
        <div className=' lg:w-[70%] lg:h-[90%] w-[90%] h-[90%] flex flex-row shadow-2xl shadow-white rounded-xl'>
            <div className='w-[30%] h-full'>
                <Sidebar/>
            </div>
            <div className='w-[70%] h-full rounded-xl'>
                <ChatWindow />
            </div>
        </div>
    </div>
  )
}

export default index