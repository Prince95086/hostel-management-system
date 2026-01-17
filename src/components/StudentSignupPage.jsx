import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaBook,
  FaDoorClosed,
  FaIdCard,
  FaCamera,
  FaSignature,
  FaUserGraduate,
  FaBuilding,
  FaUpload,
  FaCheck,
  FaLock,
  FaIdBadge,
  FaVenus,
  FaMars
} from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const StudentSignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    dept: "",
    branch: "",
    category: "",
    hostel: "", // New hostel field
    block: "",
    roomNo: "",
    rollNo: "",
    photo: null,
    signature: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({ photo: "", signature: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      if (name === "roomNo" && value.length > 3) return;
      if (name === "rollNo" && value.length > 4) return;
      if ((name === "roomNo" || name === "rollNo") && !/^\d*$/.test(value)) return;

      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = (step) => {
    let newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter valid 10-digit number";
    }
    
    if (step === 2) {
      if (!formData.year.trim()) newErrors.year = "Year is required";
      if (!formData.dept.trim()) newErrors.dept = "Department is required";
      if (!formData.branch.trim()) newErrors.branch = "Branch is required";
      if (!formData.category.trim()) newErrors.category = "Category is required";
    }
    
    if (step === 3) {
      if (!formData.hostel.trim()) newErrors.hostel = "Hostel is required";
      if (!formData.block.trim()) newErrors.block = "Block is required";
      if (!formData.roomNo.trim()) newErrors.roomNo = "Room No is required";
      else if (!/^[0-9]{1,3}$/.test(formData.roomNo)) newErrors.roomNo = "Max 3 digits";
      if (!formData.rollNo.trim()) newErrors.rollNo = "Roll No is required";
      else if (!/^[0-9]{1,4}$/.test(formData.rollNo)) newErrors.rollNo = "Max 4 digits";
    }
    
    if (step === 4) {
      if (!formData.photo) newErrors.photo = "Photo required";
      if (!formData.signature) newErrors.signature = "Signature required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("🎉 Registration Successful! Welcome to Panjab University Hostel");
      setIsSubmitting(false);
    }
  };

  // Generate academic years from 2020 to 2050
  const generateAcademicYears = () => {
    const years = [];
    for (let year = 2024; year <= 2050; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };

  const academicYears = generateAcademicYears();

  // Hostel options
  const boysHostels = Array.from({ length: 8 }, (_, i) => `BH${i + 1}`);
  const girlsHostels = Array.from({ length: 10 }, (_, i) => `GH${i + 1}`);

  const steps = [
    { number: 1, title: "Personal Info", icon: FaUser },
    { number: 2, title: "Academic Info", icon: FaUniversity },
    { number: 3, title: "Hostel Details", icon: FaBuilding },
    { number: 4, title: "Documents", icon: FaIdBadge }
  ];

  const inputClass = "w-full border-2 border-gray-200 p-4 rounded-2xl pl-14 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white shadow-sm text-gray-700 font-medium";
  const iconStyle = "absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide";

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUser className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
              <p className="text-gray-600 mt-2">Tell us about yourself</p>
            </div>

            <div className="grid gap-6">
              <div className="relative">
                <label className={labelClass}> <br />Full Name</label>
                <FaUser className={iconStyle} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.name}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br />Email Address</label>
                <FaEnvelope className={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.email}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}><br />Phone Number</label>
                <FaPhone className={iconStyle} />
                <input
                  type="text"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.phone}
                </p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUniversity className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Academic Information</h3>
              <p className="text-gray-600 mt-2">Your educational background</p>
            </div>

            <div className="grid gap-6">
              <div className="relative">
                <label className={labelClass}><br />Academic Year</label>
                <FaUniversity className={iconStyle} />
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.year}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br /> Department</label>
                <FaBook className={iconStyle} />
                <input
                  type="text"
                  name="dept"
                  placeholder="Enter your department"
                  value={formData.dept}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.dept && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.dept}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br /> Branch</label>
                <FaBook className={iconStyle} />
                <input
                  type="text"
                  name="branch"
                  placeholder="e.g., B.Tech Computer Science"
                  value={formData.branch}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.branch && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.branch}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br /> Category</label>
                <FaUserGraduate className={iconStyle} />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Category</option>
                  <option value="GEN">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.category}
                </p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaBuilding className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Hostel Details</h3>
              <p className="text-gray-600 mt-2">Your accommodation information</p>
            </div>

            <div className="grid gap-6">
              {/* Hostel Selection */}
              <div className="relative">
                <label className={labelClass}> <br /> Select Hostel</label>
                <FaBuilding className={iconStyle} />
                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Your Hostel</option>
                  
                  {/* Boys Hostels */}
                  <optgroup label="Boys Hostels">
                    {boysHostels.map((hostel) => (
                      <option key={hostel} value={hostel}>
                        {hostel} - Boys Hostel
                      </option>
                    ))}
                  </optgroup>
                  
                  {/* Girls Hostels */}
                  <optgroup label="Girls Hostels">
                    {girlsHostels.map((hostel) => (
                      <option key={hostel} value={hostel}>
                        {hostel} - Girls Hostel
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.hostel && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.hostel}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br /> Hostel Block</label>
                <FaBuilding className={iconStyle} />
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Hostel Block</option>
                  <option value="1">Block 1</option>
                  <option value="2">Block 2</option>
                  <option value="3">Block 3</option>
                  <option value="4">Block 4</option>
                  <option value="5">Block 5</option>
                  <option value="6">Block 6</option>
                  <option value="7">Block 7</option>
                </select>
                {errors.block && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.block}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br /> Room Number</label>
                <FaDoorClosed className={iconStyle} />
                <input
                  type="text"
                  name="roomNo"
                  placeholder="3-digit room number"
                  value={formData.roomNo}
                  onChange={handleChange}
                  className={inputClass}
                  maxLength={3}
                />
                {errors.roomNo && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.roomNo}
                </p>}
              </div>

              <div className="relative">
                <label className={labelClass}> <br /> Hostel Roll No</label>
                <FaIdCard className={iconStyle} />
                <input
                  type="text"
                  name="rollNo"
                  placeholder="4-digit roll number"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className={inputClass}
                  maxLength={4}
                />
                {errors.rollNo && <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠</span> {errors.rollNo}
                </p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaIdBadge className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Documents Upload</h3>
              <p className="text-gray-600 mt-2">Upload required documents</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border-2 border-dashed border-blue-200">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCamera className="text-white text-lg" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">Photograph</h4>
                  <p className="text-gray-600 text-sm">Passport size photo</p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  {preview.photo ? (
                    <div className="w-40 h-40 border-4 border-blue-300 rounded-2xl bg-white shadow-lg overflow-hidden">
                      <img 
                        src={preview.photo} 
                        alt="Applicant" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 border-4 border-dashed border-blue-300 rounded-2xl bg-blue-50 flex flex-col items-center justify-center text-blue-400">
                      <FaCamera className="text-2xl mb-2" />
                      <span className="text-sm font-medium">Upload Photo</span>
                    </div>
                  )}
                  
                  <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <FaUpload />
                    Choose Photo
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.photo && <p className="text-red-500 text-sm mt-3 text-center flex items-center justify-center gap-2">
                  <span>⚠</span> {errors.photo}
                </p>}
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl border-2 border-dashed border-green-200">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaSignature className="text-white text-lg" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">Signature</h4>
                  <p className="text-gray-600 text-sm">Your digital signature</p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  {preview.signature ? (
                    <div className="w-64 h-24 border-4 border-green-300 rounded-2xl bg-white shadow-lg overflow-hidden">
                      <img 
                        src={preview.signature} 
                        alt="Signature" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-64 h-24 border-4 border-dashed border-green-300 rounded-2xl bg-green-50 flex flex-col items-center justify-center text-green-400">
                      <FaSignature className="text-xl mb-2" />
                      <span className="text-sm font-medium">Upload Signature</span>
                    </div>
                  )}
                  
                  <label className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <FaUpload />
                    Choose Signature
                    <input
                      type="file"
                      name="signature"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.signature && <p className="text-red-500 text-sm mt-3 text-center flex items-center justify-center gap-2">
                  <span>⚠</span> {errors.signature}
                </p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl shadow-2xl mb-6">
            <GiGraduateCap className="text-white text-4xl" />
          </div>
          <h1 className="text-5xl font-bold bg-purple-500 bg-clip-text text-transparent mb-4">
            Student Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join Panjab University Hostel - Complete your registration in simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className={`flex flex-col items-center ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 ${
                    currentStep > step.number 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : currentStep === step.number
                      ? 'bg-blue-500 text-white shadow-lg scale-110'
                      : 'bg-gray-200'
                  }`}>
                    {currentStep > step.number ? (
                      <FaCheck className="text-sm" />
                    ) : (
                      <step.icon className="text-lg" />
                    )}
                  </div>
                  <span className="text-xs font-semibold">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 rounded-full ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-500 text-white hover:bg-gray-600 shadow-lg hover:shadow-xl cursor-pointer'
                  }`}
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
                  >
                    Next Step
                    <FaCheck />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-12 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:from-green-600 hover:to-teal-700 text-white cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaLock />
                        Complete Registration
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🔒 Your information is secure and protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignupPage;