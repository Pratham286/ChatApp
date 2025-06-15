import React from 'react'

const ChatBar = ({chatName, chatLastmsg, handleClick}) => {
  return (
    <div onClick={handleClick} className="m-2 border">
      <h3>{chatName}</h3>
      <h2>{chatLastmsg}</h2>
    </div>
  )
}

export default ChatBar
