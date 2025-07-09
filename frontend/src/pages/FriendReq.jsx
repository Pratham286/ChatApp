//checked
import React from 'react';
import { useMyContext } from '../context/ContextProvider';
// import FriendBox from '../components/friendbox';
import FriendBox from '../components/FriendBox'
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  ArrowLeft, 
  Heart, 
  Users,
  Mail
} from 'lucide-react';

const FriendReq = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();

  const handleUser = (userId) => {
    navigate("/userprofile", {
      state: {
        userId
      }
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const friendRequests = user.friendrequestrecieved || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm text-gray-500">
                {friendRequests.length} pending
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Friend Requests
            </h1>
          </div>
        </div>

        {/* Friend Requests Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {friendRequests.length > 0 ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-3" />
                  Pending Requests ({friendRequests.length})
                </h3>
              </div>

              {/* Friend Requests List */}
              <div className="divide-y divide-gray-200">
                {friendRequests.map((fr, i) => (
                  <div key={fr._id} className="p-3 hover:bg-gray-50 transition-colors">
                    <FriendBox 
                      username={fr.username} 
                      fullname={fr.firstname + " " + fr.lastname} 
                      handleClick={() => handleUser(fr._id)}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Friend Requests
              </h3>
              <button
                onClick={() => navigate('/searchuser')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-xl flex items-center mx-auto group"
              >
                <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Find Friends
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendReq;
