//checked
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchedUserProfile from '../components/SearchedUserProfile';
import axios from 'axios';
import { Search, Users, ArrowLeft, UserSearch } from 'lucide-react';
import { useMyContext } from '../context/ContextProvider';

const SearchResult = () => {
  const location = useLocation();
  const { word } = location.state || {};
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {url} = useMyContext();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!word?.trim()) {
        setUserList([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post(
          `${url}/dashboard/searchall`,
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
  }, [word]);

  const handleProfile = (u) => {
    const userId = u._id;
    navigate("/userprofile", {
      state: {
        userId: userId
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </button>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mr-4">
              <UserSearch className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Search Results
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Results for "{word}"
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading search results...</p>
            </div>
          ) : !word?.trim() ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Search Term
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                No search term was provided. Please go back and try searching again.
              </p>
              <button
                onClick={handleBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-xl"
              >
                Back to Search
              </button>
            </div>
          ) : userList.length > 0 ? (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Found {userList.length} Result{userList.length !== 1 ? 's' : ''}
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
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex justify-center">
                  <button
                    onClick={handleBack}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center group"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Search Again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Results Found
              </h3>
              <button
                onClick={handleBack}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-xl"
              >
                Try Another Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;