import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FriendBox from '../components/friendbox';

const FriendList = () => {
    const location = useLocation();
    const { userId } = location.state || {}

    const [userDetails, setUserDetails] = useState();
    const navigate = useNavigate();

    useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/getuser/${userId}`,
          { withCredentials: true }
        );
        // console.log(response.data.userDetails);
        setUserDetails(response.data.userDetails);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getUser();
    }
  }, []);
  const handleUser = (userId) => {
    navigate("/userprofile", {state: {
        userId
    }})
  }
  return (
    <div className='min-h-screen'>
        <div>
            {userDetails && userDetails.friends.map((fr, i) => (
                <FriendBox key={fr._id} username={fr.username} fullname={fr.firstname + " " + fr.lastname} handleClick={() => handleUser(fr._id)} />
            ))}
        </div>
    </div>
  )
}

export default FriendList
