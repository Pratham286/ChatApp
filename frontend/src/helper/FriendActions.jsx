import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FriendActions = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [otherUser, setOtherUser] = useState();
  const { user, setUser, friendState, setFriendState } = useMyContext();
  //   const [areTheyFriend, setAreTheyFriend] = useState(false);
  //   const [isReqSent, setIsReqSent] = useState(false);
  //   const [isReqRec, setIsReqRec] = useState(false);
  // const {friendState, setFriendState}
  const [trigger, setTrigger] = useState(false);

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
        setAreTheyFriend(false);
        setIsReqSent(false);
        setIsReqRec(false);

        const isFriend = user.friends?.some(
          (friend) => friend._id === otherUser._id
        );
        setAreTheyFriend(isFriend);

        for (let i = 0; i < user.friendrequest.length; i++) {
          if (otherUser._id === user.friendrequest[i]._id) {
            setIsReqSent(true);
            break;
          }
        }

        const reqReceived = otherUser.friendrequest?.includes(user._id);
        setIsReqRec(reqReceived);
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
  return (
    handleAccept, handleCancel, handleDecline, handleRequest, handleUnfriend
  );
};

export default FriendActions;
