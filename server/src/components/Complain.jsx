import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserPlus,
  FaUniversity,
  FaShieldAlt,
  FaArrowRight,
  FaIdCard,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentSignIn = () => {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate based on login method
    if (loginMethod === "email") {
      if (!email.trim()) {
        toast.error("Email is required", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    } else {
      if (!phone.trim()) {
        toast.error("Phone number is required", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      // Basic phone validation
      if (phone.trim().length < 10) {
        toast.error("Please enter a valid phone number", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    if (!password.trim()) {
      toast.error("Password is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/signin",
        {
          [loginMethod]: loginMethod === "email" ? email.trim() : phone.trim(),
          password: password.trim(),
          loginMethod: loginMethod
        }
      );

      // Save token
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("student", JSON.stringify(res.data.student));

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate after delay
      setTimeout(() => {
        navigate("/complain-signin");
      }, 1500);

    } catch (error) {
      const errorMessage = error?.response?.data?.message ||
        (loginMethod === "email" ? "Invalid email or password" : "Invalid phone number or password");
      setErrorMsg(errorMessage);
      
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format phone number as user types
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    
    // Format with spaces
    if (value.length > 6) {
      value = `${value.slice(0, 5)} ${value.slice(5, 10)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 5)} ${value.slice(5)}`;
    }
    
    setPhone(value);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="max-w-md w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-6">
            <FaUniversity className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-indigo-600 mb-3">
            Student Portal
          </h1>
          <p className="text-gray-600">
            Sign in to access your hostel information
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          
          {/* Login Method Toggle */}
          <div className="mb-6">
            <div className="flex border-2 border-gray-200 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-3 font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  loginMethod === "email"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaEnvelope />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 py-3 font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  loginMethod === "phone"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaPhone />
                Phone
              </button>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">

            {/* Email/Phone Input */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                {loginMethod === "email" ? "Email Address" : "Phone Number"}
              </label>
              <div className="relative mt-2">
                {loginMethod === "email" ? (
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                ) : (
                  <FaPhone className="absolute left-4 top-4 text-gray-400" />
                )}
                {loginMethod === "email" ? (
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="student@panjabuniversity.ac.in"
                    className="w-full border-2 border-gray-200 rounded-2xl pl-12 py-4 focus:border-blue-500 outline-none transition-all duration-300"
                  />
                ) : (
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="98XXX XXXXX"
                    className="w-full border-2 border-gray-200 rounded-2xl pl-12 py-4 focus:border-blue-500 outline-none transition-all duration-300"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {loginMethod === "email" 
                  ? "Use your registered university email" 
                  : "Enter your 10-digit phone number"}
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <FaLock className="absolute left-4 top-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-12 py-4 focus:border-blue-500 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                />
                Remember this device
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="text-red-600 text-sm font-medium">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In Complain
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Alternative Login Options */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                // Handle roll number login (if implemented)
                toast.info("Roll number login coming soon!", {
                  position: "top-right",
                  autoClose: 3000,
                });
              }}
              className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold flex justify-center gap-2 items-center hover:bg-gray-50 transition-all duration-300"
            >
              <FaIdCard />
              Sign in with Roll Number
            </button>
          </div>

          {/* Signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              New to Panjab University Hostels?
            </p>
            <Link
              to="/emailverify"
              className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold flex justify-center gap-2 items-center hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <FaUserPlus /> Create Student Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <FaShieldAlt className="inline text-green-500 mr-2" />
          Secure & Encrypted • {loginMethod === "email" ? "Email" : "Phone"} Login
        </div>

        {/* Quick Demo Info */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p className="mb-1">Email: student@example.com</p>
          <p>Phone: 9876543210 (use any password)</p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;