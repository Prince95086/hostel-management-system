import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaClipboardList,
  FaCog,
  FaChartLine,
  FaExclamationTriangle,
  FaBars,
  FaUtensils,
  FaCoffee,
  FaRupeeSign,
  FaPhone,
  FaBuilding,
  FaBed,
  FaIdCard,
  FaHome,
  FaEnvelope,
  FaGraduationCap,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";

export default function MyAccount() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState("My Account");

  const navigate = useNavigate();
  const location = useLocation();

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  /* ---------- RESPONSIVE ---------- */
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setSidebarOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  /* ---------- FETCH STUDENT DATA (Only on initial load) ---------- */
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Check if we already have data in localStorage
        const savedStudent = localStorage.getItem("student");
        if (savedStudent && !initialLoadComplete) {
          setStudentData(JSON.parse(savedStudent));
          setLoading(false);
          setInitialLoadComplete(true);
          return;
        }

        setLoading(true);

        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          navigate("/signin-options");
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/myaccount/my-account",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log("Student API DATA →", data);

        setStudentData(data);
        localStorage.setItem("student", JSON.stringify(data));
        setInitialLoadComplete(true);
      } catch (err) {
        console.error(err);
        navigate("/signin-options");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [navigate, initialLoadComplete]);

  /* ---------- SIDEBAR MENU ---------- */
  const menuItems = [
    { label: "My Account", icon: <FaUserCircle />, path: "/my-account" },
    { label: "Pay Fee", icon: <FaRupeeSign />, path: "/pay-fee" }, // Fixed path
    { label: "Mess Fee", icon: <FaUtensils />, path: "/mess-fee" },
    { label: "Canteen Fee", icon: <FaCoffee />, path: "/canteen-fee" },
    { label: "Reports", icon: <FaChartLine />, path: "/reports" }, // Removed /admin prefix
    { label: "Function", icon: <FaClipboardList />, path: "#" }, // Changed to #
    { label: "Pending Complain", icon: <FaExclamationTriangle />, path: "/pending-complaint" }, // Removed /admin prefix
    { label: "Setting", icon: <FaCog />, path: "/student-setting" },
  ];

  const handleMenuClick = (label, path) => {
    setActiveMenu(label);
    
    // Special handling for Function button
    if (label === "Function") {
      if (isMobile) setSidebarOpen(false);
      return;
    }
    
    navigate(path);
    if (isMobile) setSidebarOpen(false);
  };

  // Set active menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => item.path === currentPath);
    if (currentMenuItem) {
      setActiveMenu(currentMenuItem.label);
    }
  }, [location.pathname]);

  // Auto-close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('aside');
        const menuButton = document.querySelector('.menu-button');
        
        if (sidebar && !sidebar.contains(event.target) && 
            menuButton && !menuButton.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, isMobile]);

  /* ---------- HANDLE LOGOUT ---------- */
  const handleLogout = () => {
    // Clear all student-related data
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/signin-options");
  };

  // Show loading state only on initial load
  if (loading && !initialLoadComplete) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student information...</p>
        </div>
      </div>
    );
  }

  // Format data for display
  const displayData = {
    name: studentData?.name ?? "N/A",
    email: studentData?.email ?? "N/A",
    phone: studentData?.phone ?? "N/A",
    rollNo: studentData?.rollNo ?? "N/A",
    year: studentData?.year ?? "N/A",
    department: studentData?.dept ?? "N/A",   // backend field
    branch: studentData?.branch ?? "N/A",
    category: studentData?.category ?? "N/A",
    hostel: studentData?.hostel ?? "N/A",
    block: studentData?.block ?? "N/A",
    roomNo: studentData?.roomNo ?? "N/A",
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-orange-400 text-white flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5">
          <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
            Student Panel
          </h2>

          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-200
                    ${activeMenu === item.label ? 'bg-orange-600' : 'hover:bg-orange-500'}
                  `}
                  onClick={() => handleMenuClick(item.label, item.path)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ---------- HEADER ---------- */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="menu-button p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaBars className="text-xl text-gray-700" />
                </button>
              )}
              
              <img
                src={pulogo}
                alt="University Logo"
                className="w-10 h-10 lg:w-14 lg:h-14 object-contain"
              />
              
              <h1 className="text-xl lg:text-3xl font-bold text-gray-800 tracking-wide">
                Teja Singh Boys Hostel 6
              </h1>
            </div>

            {/* ---------- PROFILE ---------- */}
            <div className="relative">
              <div
                className="flex items-center space-x-1 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="text-gray-700 w-8 h-8 lg:w-10 lg:h-10 hover:text-orange-600 transition-colors" />
                <IoChevronDown className={`text-gray-600 w-4 h-4 lg:w-5 lg:h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 w-48 py-2 z-50">
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors border-b border-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/my-account");
                    }}
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors border-b border-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/student-setting"); // Fixed path
                    }}
                  >
                    Settings
                  </button>

                  <button
                    type="button"
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---------- MY ACCOUNT PAGE CONTENT ---------- */}
        <section className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
              <p className="text-gray-600 mt-2">Student Information</p>
            </div>

            {/* Student Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <FaUserCircle className="text-orange-500 text-7xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{displayData.name}</h2>
                <p className="text-gray-600 mt-1">Student ID: {displayData.rollNo}</p>
                <p className="text-gray-500 text-sm mt-1">Panjab University, Chandigarh</p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Name */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold text-gray-800">{displayData.name}</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800">{displayData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaPhone className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-800">{displayData.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Roll No */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaIdCard className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Roll No</p>
                      <p className="font-semibold text-gray-800">{displayData.rollNo}</p>
                    </div>
                  </div>
                </div>

                {/* Hostel */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaHome className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hostel</p>
                      <p className="font-semibold text-gray-800">{displayData.hostel}</p>
                    </div>
                  </div>
                </div>

                {/* Block */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaBuilding className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Block</p>
                      <p className="font-semibold text-gray-800">Block {displayData.block}</p>
                    </div>
                  </div>
                </div>

                {/* Room No */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaBed className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Room No</p>
                      <p className="font-semibold text-gray-800">Room {displayData.roomNo}</p>
                    </div>
                  </div>
                </div>

                {/* Department */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-semibold text-gray-800">{displayData.department}</p>
                    </div>
                  </div>
                </div>

                {/* Branch */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Branch/Course</p>
                      <p className="font-semibold text-gray-800">{displayData.branch}</p>
                    </div>
                  </div>
                </div>

                {/* Year */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaCalendarAlt className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-semibold text-gray-800">{displayData.year}</p>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaTag className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold text-gray-800">{displayData.category}</p>
                    </div>
                  </div>
                </div>

                {/* University */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2 lg:col-span-3">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaGraduationCap className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-semibold text-gray-800">Panjab University, Chandigarh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional information section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Account Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-semibold text-gray-800">
                      {new Date().toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mess Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                      Registered
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Library Access</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Student Portal • Version 1.0 • {displayData.rollNo}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/student-setting")} // Fixed path
                  className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-2"
                >
                  <FaCog />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <FaUserCircle />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Close dropdown when clicking outside */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
}