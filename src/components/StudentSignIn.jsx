import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUserPlus, FaUniversity, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Email:", email);
    console.log("Password:", password);
    alert(`Signed in successfully with Email: ${email}`);
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-bounce"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-500">
            <FaUniversity className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to access your hostel portal
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
          {/* Email & Password Form */}
          <form onSubmit={handleSignIn} className="space-y-8">
            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  placeholder="student@panjabuniversity.ac.in"
                  className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  rememberMe 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300 group-hover:border-blue-400'
                }`}>
                  {rememberMe && (
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="hidden"
                />
                <span className="text-sm text-gray-700 font-medium">Remember this device</span>
              </label>
            </div>

            {/* Sign In Button */}


 






   <Link to="/student-portal">
            <button
           
           
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-blue-500 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer ${
                isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
              
            </button>
            </Link>
          </form>

          {/* Sign Up Section */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-600 mb-6 text-lg">
                New to Panjab University Hostels?
              </p>
             <Link
      to="/emailverify"
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 active:bg-gradient-to-r active:from-green-600 active:to-green-300 active:shadow-inner transition-all duration-200 flex items-center justify-center space-x-3"
    >
      <FaUserPlus className="text-sm" />
      <span>Create Student Account</span>
    </Link>
            </div>
          </div>
        </div>

        {/* Security & Support Footer */}
        <div className="text-center mt-8 space-y-4">
          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <FaShieldAlt className="text-green-500 text-lg" />
            <div className="text-left">
              <div className="font-semibold text-gray-800">Secure & Encrypted</div>
              <div className="text-gray-500">Your data is protected with 256-bit encryption</div>
            </div>
          </div>

          {/* Support Link */}
          <p className="text-gray-500 text-sm">
            Need help?{' '}
            <a href="/contact-support" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 underline">
              Contact Support Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;