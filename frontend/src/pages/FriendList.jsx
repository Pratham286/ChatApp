//checked
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import FriendBox from '../components/friendbox';

import { Users, UserCheck, ArrowLeft } from 'lucide-react';
// import FriendBox from '../components/friendbox';
import FriendBox from '../components/FriendBox';
import { useMyContext } from '../context/ContextProvider';
// import friendbox from '../components/FriendBox';

const FriendList = () => {
    const location = useLocation();
    const { userId } = location.state || {}

    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const {url} =useMyContext();

    useEffect(() => {
        const getUser = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${url}/dashboard/getuser/${userId}`,
                    { withCredentials: true }
                );
                setUserDetails(response.data.userDetails);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (userId) {
            getUser();
        } else {
            setIsLoading(false);
        }
    }, [userId]);

    const handleUser = (userId) => {
        navigate("/userprofile", {
            state: {
                userId
            }
        })
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back
                    </button>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-6">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Friend List
                        </h1>
                    </div>
                </div>

                {/* Friends Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                            <p className="text-gray-600">Loading friends...</p>
                        </div>
                    ) : !userDetails ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                User Not Found
                            </h3>
                            <p className="text-gray-600 text-center max-w-md mb-6">
                                We couldn't find the user you're looking for. They may have been removed or the link is invalid.
                            </p>
                            <button
                                onClick={handleGoBack}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    ) : userDetails.friends && userDetails.friends.length > 0 ? (
                        <div>
                            <div className="p-6 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center">
                                    <UserCheck className="h-5 w-5 text-green-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {userDetails.friends.length} Friend{userDetails.friends.length !== 1 ? 's' : ''}
                                    </h3>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {userDetails.friends.map((fr, i) => (
                                    <div key={fr._id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <FriendBox 
                                            username={fr.username} 
                                            fullname={fr.firstname + " " + fr.lastname} 
                                            handleClick={() => handleUser(fr._id)} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No Friends
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FriendList
