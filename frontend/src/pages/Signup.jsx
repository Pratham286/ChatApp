import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    // if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const formData = {
          username: form.username,
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
        };
        const response = await axios.post(
          `http://localhost:3000/auth/signup`,
          formData
        );

        // console.log(response.data);
        if (response.status === 201) {
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data)
          alert(error.response.data.Message);
        }
        console.log("Error: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join thousands of users and start connecting today
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.username 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400 focus:bg-white"
                  }`}
                  placeholder="Choose a unique username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstname 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.firstname}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastname 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.lastname}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="abc@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.confirmPassword 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;