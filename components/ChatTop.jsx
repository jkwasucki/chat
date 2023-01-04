import React from 'react'
import { ChatContext } from '../context/ChatContext'
import { useContext } from 'react'

function ChatTop() {
  const { data } = useContext(ChatContext)
  return (
    <div>
        <p>{data.user?.displayName}</p>
    </div>
  )
}

export default ChatTop