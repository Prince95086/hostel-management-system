import React, { useState } from "react";
import { FaEnvelope, FaCheck, FaLock, FaArrowLeft, FaKey, FaShieldAlt, FaRegSmileWink } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep = (step) => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (!formData.otp.trim()) {
        newErrors.otp = "OTP is required";
      } else if (!/^\d{6}$/.test(formData.otp)) {
        newErrors.otp = "OTP must be 6 digits";
      }
    }

    if (step === 3) {
      if (!formData.newPassword) {
        newErrors.newPassword = "Password is required";
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
        newErrors.newPassword = "Include uppercase, lowercase & numbers";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (validateStep(1)) {
      setIsSubmitting(true);
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsOtpSent(true);
      setCountdown(60);
      setIsSubmitting(false);
      setCurrentStep(2);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleVerifyOtp = async () => {
    if (validateStep(2)) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setCurrentStep(3);
    }
  };

  const handleResetPassword = async () => {
    if (validateStep(3)) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setCurrentStep(4);
    }
  };

  const resendOtp = async () => {
    if (countdown === 0) {
      setCountdown(60);
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const steps = [
    { number: 1, title: "Enter Email", icon: FaEnvelope },
    { number: 2, title: "Verify OTP", icon: FaCheck },
    { number: 3, title: "New Password", icon: FaLock }
  ];

  const inputClass = "w-full border-2 border-gray-200 p-4 rounded-2xl pl-14 pr-12 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white shadow-sm text-gray-700 font-medium";
  const iconStyle = "absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide";

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaKey className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Reset Your Password</h3>
              <p className="text-gray-600 mt-2">
                Enter your email address and we'll send you a verification code
              </p>
            </div>

            <div className="relative">
  <label className={labelClass}>Email Address</label>
  <div className="relative">
    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="email"
      name="email"
      placeholder="your.email@example.com"
      value={formData.email}
      onChange={handleChange}
      className={`${inputClass} pl-10`} // Add left padding for icon space
    />
  </div>
  {errors.email && (
    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
      <span>⚠</span> {errors.email}
    </p>
  )}
</div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Code...
                </>
              ) : (
                <>
                  <FaCheck />
                  Send Verification Code
                </>
              )}
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Enter Verification Code</h3>
              <p className="text-gray-600 mt-2">
                We sent a 6-digit code to <span className="font-semibold">{formData.email}</span>
              </p>
            </div>

            <div className="relative">
              <label className={labelClass}>6-Digit Code</label>
               <FaCheck className="w-5 h-5  relative top-10 left-80 text-green-500" />
              
              <input
                type="text"
                name="otp"
                 placeholder="Enter 6-digit code"
                value={formData.otp}
                onChange={handleChange}
                maxLength={6}
                className={inputClass}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.otp}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={resendOtp}
                disabled={countdown > 0 || isSubmitting}
                className={`text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 ${
                  countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <FaCheck />
                  Verify Code
                </>
              )}
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaLock className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Create New Password</h3>
              <p className="text-gray-600 mt-2">
                Enter your new password and confirm it
              </p>
            </div>

            <div className="space-y-4">
  <div className="relative">
    <label className={labelClass}>New Password</label>
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="password"
        name="newPassword"
        placeholder="Enter new password"
        value={formData.newPassword}
        onChange={handleChange}
        className={`${inputClass} pl-10`} // Add left padding
      />
    </div>
    {errors.newPassword && (
      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
        <span>⚠</span> {errors.newPassword}
      </p>
    )}
  </div>

  <div className="relative">
    <label className={labelClass}>Confirm Password</label>
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className={`${inputClass} pl-10`} // Add left padding
      />
    </div>
    {errors.confirmPassword && (
      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
        <span>⚠</span> {errors.confirmPassword}
      </p>
    )}
  </div>
</div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Password Requirements:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Include at least one number</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FaLock />
                  Reset Password
                </>
              )}
            </button>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaRegSmileWink className="text-white text-3xl" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-800">Password Reset Successful!</h3>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 text-green-700">
                <FaCheck className="text-xl" />
                <span className="font-semibold">Password updated successfully</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <a
                href="/student-signin-complain"
                className="block w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Sign In Now
              </a>
              
              <a
                href="/"
                className="block w-full py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              >
                Back to Home
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100 py-8 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-3xl shadow-2xl mb-4">
            <GiGraduateCap className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">
            Panjab University Hostel Portal
          </p>
        </div>

        {/* Progress Steps - Only show for steps 1-3 */}
        {currentStep < 4 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/20">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className={`flex flex-col items-center ${currentStep >= step.number ? 'text-orange-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                      currentStep > step.number 
                        ? 'bg-green-500 text-white shadow-md' 
                        : currentStep === step.number
                        ? 'bg-orange-500 text-white shadow-md scale-110'
                        : 'bg-gray-200'
                    }`}>
                      {currentStep > step.number ? (
                        <FaCheck className="text-xs" />
                      ) : (
                        <step.icon className="text-sm" />
                      )}
                    </div>
                    <span className="text-xs font-semibold">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 rounded-full ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            {/* Back Button - Only show for steps 2-3 */}
            {currentStep > 1 && currentStep < 4 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200 cursor-pointer"
              >
                <FaArrowLeft />
                <span className="font-medium">Back</span>
              </button>
            )}

            {renderStep()}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            🔒 Secure password reset process
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;