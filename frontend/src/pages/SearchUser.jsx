import React from "react";
import { useState } from "react";
import axios from "axios";
import { useMyContext } from "../context/ContextProvider";
import { useEffect } from "react";
import SearchedUserProfile from "../components/SearchedUserProfile";
import { useNavigate } from "react-router-dom";

const SearchUser = () => {
  const [word, setWord] = useState("");
  const { url, user } = useMyContext();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  //  console.log(url)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        if (!word.trim()) {
          setUserList([]);
          return;
        }
        try {
          const response = await axios.post(
            `http://localhost:3000/dashboard/search`,
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
    }, 500); // Delay for 500ms

    return () => clearTimeout(delayDebounce);
  }, [word, url]);
  
  const handleProfile = (u) =>{
    const userId = u._id;
    if(user._id  === userId)
    {
      navigate("/profile")
    }
    else{
      navigate("/userprofile", {state: {
        userId : userId
      }})

    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center">
        <div className="w-full max-w-md p-4">
          <form className="w-full border-2 rounded-md overflow-hidden flex">
            <input
              name="word"
              id="word"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
              }}
              placeholder="Search User"
              className="w-full px-4 py-2 outline-none"
            />
          </form>
        </div>
      </div>
      <div>
        {userList.length ? (
          <div>
            {userList.map((u, i) => (
              <SearchedUserProfile
                key={i}
                username={u.username}
                fullname={u.firstname + " " + u.lastname}
                handleClick={() =>handleProfile(u)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">No data</div>
        )}
        {userList.length === 5 && (
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                navigate("/searchResult", {
                  state: {
                    word: word
                  },
                });
              }}
              type="button"
              className="bg-blue-700 rounded text-white px-2.5 py-1"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
