//checked
import React from "react";
import {
  MessageCircle,
  Users,
  UserPlus,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Check,
  Edit3,
  Trash2,
  Group,
  Heart,
  Star,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/ContextProvider";
import { features } from "../data/Features.jsx";
const Home = () => {
  const navigate = useNavigate();
  const { isLogin } = useMyContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect. Chat.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Collaborate.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of messaging with real-time conversations,
              group chats, and powerful editing features. Stay connected with
              the people who matter most.
            </p>

            {!isLogin ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition-colors border-2 border-gray-200 hover:border-gray-300"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>

          {/* Hero Visual */}
          {/* <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-3 font-semibold text-gray-900">
                      Chat with Alice
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-600 text-white p-3 rounded-lg rounded-br-sm max-w-xs">
                      Hey! How's your day going? 😊
                    </div>
                    <div className="bg-gray-200 text-gray-900 p-3 rounded-lg rounded-bl-sm max-w-xs ml-auto">
                      Great! Just finished the project we discussed.
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-3 font-semibold text-gray-900">
                      Team Group
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      <span className="ml-2 text-sm text-gray-600">John</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                      <span className="ml-2 text-sm text-gray-600">Sarah</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                      <span className="ml-2 text-sm text-gray-600">Mike</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Edit3 className="h-4 w-4 mr-2 text-orange-500" />
                      Edit message
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                      Delete message
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserPlus className="h-4 w-4 mr-2 text-blue-500" />
                      Add friend
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div> 
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for seamless communication
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover powerful features designed to enhance your messaging
              experience and keep you connected with friends, family, and
              colleagues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps and begin connecting with
              your friends today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create Account
              </h3>
              <p className="text-gray-600">
                Sign up with your email and create your profile in seconds. It's
                completely free to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Add Friends
              </h3>
              <p className="text-gray-600">
                Find and connect with friends using their username or email.
                Send friend requests and build your network.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Start Chatting
              </h3>
              <p className="text-gray-600">
                Begin real-time conversations, create groups, and enjoy seamless
                messaging with all the features you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLogin && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to start connecting?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already enjoying seamless
              communication. Your conversations are waiting.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
            >
              Join ChatApp Today
              <Heart className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>
      )}

      {/* Device Compatibility */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Available on all your devices
          </h3>
          <div className="flex justify-center items-center space-x-12">
            <div className="flex flex-col items-center">
              <Monitor className="h-12 w-12 text-gray-600 mb-2" />
              <span className="text-sm text-gray-600">Desktop</span>
            </div>
            <div className="flex flex-col items-center">
              <Tablet className="h-12 w-12 text-gray-600 mb-2" />
              <span className="text-sm text-gray-600">Tablet</span>
            </div>
            <div className="flex flex-col items-center">
              <Smartphone className="h-12 w-12 text-gray-600 mb-2" />
              <span className="text-sm text-gray-600">Mobile</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
