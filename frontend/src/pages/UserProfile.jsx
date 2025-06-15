import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/ContextProvider";

const UserProfile = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [otherUser, setOtherUser] = useState();
  const { user, setUser, friendState, setFriendState } = useMyContext();
  // const [areTheyFriend, setAreTheyFriend] = useState(false);
  // const [isReqSent, setIsReqSent] = useState(false);
  // const [isReqRec, setIsReqRec] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const navigate = useNavigate();
  // Fetch other user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/getuser/${userId}`,
          { withCredentials: true }
        );
        console.log(response.data.userDetails);
        setOtherUser(response.data.userDetails);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId, trigger]);

  useEffect(() => {
    const handle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/verify`,
          {
            withCredentials: true,
          }
        );
        if (response.data.authenticated === true) {
          setUser(response.data.userDetails);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    handle();
  }, [trigger, setUser]);

  useEffect(() => {
    if (user && otherUser) {
      if (user._id === otherUser._id) {
        setFriendState({
          areTheyFriend: true,
          isReqSent: false,
          isReqRec: false,
        });
      } else {
        setFriendState({
          areTheyFriend: false,
          isReqSent: false,
          isReqRec: false,
        });

        const isFriend = user.friends?.some(
          (friend) => friend._id === otherUser._id
        );
        setFriendState((prev) => ({
          ...prev,
          areTheyFriend: isFriend,
        }));
        
        for (let i = 0; i < user.friendrequest.length; i++) {
          if (otherUser._id === user.friendrequest[i]._id) {
            // setIsReqSent(true);
            setFriendState((prev) => ({
              ...prev,
              isReqSent: true,
            }));
            break;
          }
        }
        // for(let i=0; i<other.friendrequest.length; i++)
        //   {
        //     if(otherUser._id === user.friendrequest[i]._id)
        //       {
        //         setIsReqSent(true);
        //         break;
        //       }
        //     }
        
        const reqReceived = otherUser.friendrequest?.includes(user._id);
        setFriendState((prev) => ({
          ...prev,
          isReqRec: reqReceived,
        }));
        // setIsReqRec(reqReceived);
      }
    }
  }, [user, otherUser]);

  const handleRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/sendfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/cancelfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/acceptfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfriend = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/unfriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/dashboard/declinefriendreq/${otherUser._id}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowFriends = () => {
    if (userId === user._id || friendState.areTheyFriend) {
      navigate("/friends", {
        state: {
          userId,
        },
      });
    } else {
      alert("The user is not your friend");
    }
  };

  return (
    <div className="min-h-screen">
      {otherUser ? (
        <div className="border">
          <h3>{otherUser.username}</h3>
          <h2>{otherUser.firstname + " " + otherUser.lastname}</h2>
          <h2>{otherUser.friends.length}</h2>
        </div>
      ) : (
        <div>Loading</div>
      )}
      <div>
        {friendState.areTheyFriend ? (
          <div>
            <h3>Friend</h3>
            {/* <button></button> */}
            <button
              onClick={handleShowFriends}
              type="button"
              className="bg-blue-700 rounded text-white px-2.5 py-1"
            >
              Show Friends
            </button>
            <div>
              <button
                onClick={handleUnfriend}
                type="button"
                className="bg-blue-700 rounded text-white px-2.5 py-1"
              >
                Unfriend
              </button>
            </div>
          </div>
        ) : (
          <div>
            No friends
            <div>
              {friendState.isReqRec ? (
                <div>
                  <button
                    onClick={handleAccept}
                    type="button"
                    className="bg-blue-700 rounded text-white px-2.5 py-1 mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDecline}
                    type="button"
                    className="bg-red-700 rounded text-white px-2.5 py-1"
                  >
                    Decline
                  </button>
                </div>
              ) : (
                <div>
                  {friendState.isReqSent ? (
                    <div>
                      <button
                        onClick={handleCancel}
                        type="button"
                        className="bg-gray-700 rounded text-white px-2.5 py-1"
                      >
                        Cancel Request
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={handleRequest}
                        type="button"
                        className="bg-blue-700 rounded text-white px-2.5 py-1"
                      >
                        Send Request
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
