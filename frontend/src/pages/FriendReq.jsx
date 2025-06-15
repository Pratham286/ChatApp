import React from 'react'
import { useMyContext } from '../context/ContextProvider'
import FriendBox from '../components/friendbox';
import { useNavigate } from 'react-router-dom';

const FriendReq = () => {
    const {user} = useMyContext();
    
    // const handleClick()
    const navigate = useNavigate();
    // console.log(user.friendrequestrecieved.length)

    const handleUser = (userId) => {
    navigate("/userprofile", {state: {
        userId
    }})
  }
  return (
    <div className='min-h-screen'>
      {user.friendrequestrecieved.map((fr, i) => (
        <FriendBox username={fr.username} fullname={fr.firstname + " " + fr.lastname} key={fr._id} handleClick={() => handleUser(fr._id)}/>
      ))}
    </div>
  )
}

export default FriendReq
