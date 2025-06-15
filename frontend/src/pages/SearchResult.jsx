import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import SearchedUserProfile from '../components/SearchedUserProfile';
import axios from 'axios';

const SearchResult = () => {
    const location = useLocation();
    const {word} = location.state || {};
    const [userList, setUserList] = useState([])
    const navigate = useNavigate();
    // console.log(word);
    useEffect(()=>{
      const fetchUsers = async () => {
        if (!word.trim()) {
          setUserList([]);
          return;
        }
        try {
          const response = await axios.post(
            `http://localhost:3000/dashboard/searchall`,
            { word },
            { withCredentials: true }
          );
          // console.log(response.data.userDetails);
          setUserList(response.data.userDetails);
        } catch (error) {
          console.log("Error:", error);
        }
      };
      fetchUsers();
    }, []);

    const handleProfile = (u) =>{
    const userId = u._id;
    navigate("/userprofile", {state: {
      userId : userId
    }})
  }
  
  return (
    <div className='min-h-screen'>
        <div>
            <h3>Search Result For: {word}</h3>
        </div>
      <div>
            {userList.map((u, i) => (
              <SearchedUserProfile
                key={i}
                username={u.username}
                fullname={u.firstname + " " + u.lastname}
                handleClick={() => handleProfile(u)}
              />
            ))}
          </div>
    </div>
  )
}

export default SearchResult
