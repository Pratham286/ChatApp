import { Children, createContext, use, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // const url = "http://localhost/3000";
  // const url = "http://localhost:3000";
  const url = "https://chatapp-7xzn.onrender.com";
  // const url = "https://localhost/3000"

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [friendState, setFriendState] = useState({
    areTheyFriend: false,
    isReqSent: false,
    isReqRec: false,
  });

  return (
    <MyContext.Provider value={{ isLogin, setIsLogin, user, setUser, url, friendState, setFriendState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
