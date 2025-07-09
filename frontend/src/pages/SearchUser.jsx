//checked
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useMyContext } from "../context/ContextProvider";
import { useEffect } from "react";
import SearchedUserProfile from "../components/SearchedUserProfile";
import { useNavigate } from "react-router-dom";
import { Search, Users, ArrowRight, UserSearch } from "lucide-react";

const SearchUser = () => {
  const [word, setWord] = useState("");
  const { url, user } = useMyContext();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // const {url} =use
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        if (!word.trim()) {
          setUserList([]);
          setIsLoading(false);
          return;
        }
        
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${url}/dashboard/search`,
            { word },
            { withCredentials: true }
          );
          setUserList(response.data.userDetails);
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }, 500); // Delay for 500ms

    return () => clearTimeout(delayDebounce);
  }, [word, url]);
  
  const handleProfile = (u) => {
    const userId = u._id;
    if (user._id === userId) {
      navigate("/profile");
    } else {
      navigate("/userprofile", {
        state: {
          userId: userId
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover People
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Find new friends and connections. 
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              name="word"
              id="word"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
              }}
              placeholder="Search for users by name or username..."
              className="w-full pl-12 pr-4 py-4 t  ext-lg border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Searching for users...</p>
            </div>
          ) : word.trim() === "" ? ( <></>
          ) : userList.length > 0 ? (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-md font-semibold text-gray-900">
                  Search Results ({userList.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {userList.map((u, i) => (
                  <div key={i} className="hover:bg-gray-50 transition-colors duration-200">
                    <SearchedUserProfile
                      username={u.username}
                      fullname={u.firstname + " " + u.lastname}
                      handleClick={() => handleProfile(u)}
                    />
                  </div>
                ))}
              </div>
              {userList.length === 5 && (
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        navigate("/searchResult", {
                          state: {
                            word: word
                          },
                        });
                      }}
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-md font-semibold transition-all duration-200 shadow-md hover:shadow-xl flex items-center group"
                    >
                      Show More Results
                      <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Results Found!
              </h3>
              <button
                onClick={() => setWord("")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;