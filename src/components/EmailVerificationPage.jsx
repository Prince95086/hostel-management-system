import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaShieldAlt, FaCheckCircle, FaArrowRight, FaUniversity, FaLock } from "react-icons/fa";

const EmailVerificationPage = () => {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: Send verification code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(randomCode);
      setCodeSent(true);
      setError("");
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify entered code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate verification delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (inputCode === verificationCode) {
        setVerified(true);
        setError("");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code functionality
  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(newCode);
      setError("");
      alert(`New verification code sent! Demo Code: ${newCode}`);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full blur-xl opacity-20 animate-bounce"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-500">
            <FaUniversity className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-lg">
            Secure access to Panjab University Hostel Portal
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              !verified 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-green-500 text-white border-green-500'
            } transition-all duration-300`}>
              {verified ? <FaCheckCircle /> : 1}
            </div>
            <div className={`w-16 h-1 mx-2 ${
              codeSent ? 'bg-blue-600' : 'bg-gray-300'
            } transition-all duration-300`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              verified 
                ? 'bg-green-500 text-white border-green-500' 
                : codeSent 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-gray-100 text-gray-400 border-gray-300'
            } transition-all duration-300`}>
              {verified ? <FaCheckCircle /> : 2}
            </div>
          </div>
        </div>

        {/* Main Verification Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Security Badge */}
          <div className="flex items-center justify-center mb-6">
            <FaLock className="text-green-500 text-lg mr-2" />
            <span className="text-green-600 font-semibold text-sm">Secure Verification</span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Step 1: Enter Email */}
          {!codeSent && !verified && (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your university email"
                  className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-green-500 to-purple-600 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg disabled:cursor-not-allowed cursor-pointer"
              
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Code...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Send Verification Code
                    <FaArrowRight className="ml-2" />
                  </div>
                )}
              </button>
            </form>
          )}

          {/* Step 2: Enter Verification Code */}
          {codeSent && !verified && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-2">
                  We sent a 6-digit code to:
                </p>
                <p className="text-blue-600 font-semibold break-all">{email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Demo Code: <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{verificationCode}</span>
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaShieldAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  inputMode="numeric"
                  className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 text-center text-xl font-mono tracking-widest"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading || inputCode.length !== 6}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Verify Code
                      <FaCheckCircle className="ml-2" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  
                  className="w-full text-blue-600 hover:text-blue-700 py-2 rounded-2xl transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Didn't receive code? Resend
                </button>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setCodeSent(false);
                    setError("");
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  ← Use different email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Verified Success */}
          {verified && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Email Verified!
                </h3>
                <p className="text-gray-600">
                  Your email has been successfully verified. You can now proceed to create your account.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  to="/studentsignup"
                  className="block w-full bg-green-500 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold"
                >
                  <div className="flex items-center justify-center">
                    Continue to Sign Up
                    <FaArrowRight className="ml-2" />
                  </div>
                </Link>

                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm mb-3">
                    Already have an account?
                  </p>
                  <Link
                    to="/signinasstudent"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Sign in instead
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <a href="mailto:support@puhostels.edu" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;