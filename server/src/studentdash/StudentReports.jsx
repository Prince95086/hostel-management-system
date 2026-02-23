import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Routes, Route } from "react-router-dom";
import {
  FaUserCircle,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaChartLine,
  FaExclamationTriangle,
  FaTasks,
  FaBars,
  FaUtensils,
  FaCoffee,
  FaSearch,
  FaRupeeSign,
  FaReceipt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaSpinner,
  FaLock,
  FaSignOutAlt,
  FaBell,
  FaExclamationCircle,
  FaPhone,
  FaIdCard
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ==================== REPORTS COMPONENT ====================
function ReportsPage() {
  const [studentId, setStudentId] = useState("");
  const [reports, setReports] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [debug, setDebug] = useState(""); // For debugging
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  // Check if already logged in from sign-in page
  useEffect(() => {
    const checkStoredLogin = async () => {
      setDebug("Checking login...");
      
      // Check all possible storage locations
      const storedStudent = localStorage.getItem("studentInfo") || sessionStorage.getItem("studentInfo");
      const storedId = localStorage.getItem("studentId") || sessionStorage.getItem("studentId");
      const storedPhone = localStorage.getItem("studentPhone") || sessionStorage.getItem("studentPhone");
      const storedRollNo = localStorage.getItem("studentRollNo") || sessionStorage.getItem("studentRollNo");
      
      console.log("ReportsPage - Checking login:", { storedStudent, storedId, storedPhone, storedRollNo });
      setDebug(`Found: ${storedStudent ? 'studentInfo' : 'no studentInfo'}, ${storedPhone ? 'phone' : ''}, ${storedRollNo ? 'rollNo' : ''}`);

      if (storedStudent) {
        try {
          const studentData = JSON.parse(storedStudent);
          setStudentInfo(studentData);
          setDebug(`Student: ${studentData.name}`);
          
          // Try to fetch reports by phone number first
          if (storedPhone) {
            setDebug(`Fetching by phone: ${storedPhone}`);
            await fetchReportsByPhone(storedPhone);
          }
          // Then try by roll number
          else if (storedRollNo || studentData.rollNo) {
            const rollToUse = storedRollNo || studentData.rollNo;
            setDebug(`Fetching by roll: ${rollToUse}`);
            await fetchReportsByRollNo(rollToUse);
          }
          // Finally try by student ID
          else if (storedId || studentData._id) {
            const idToUse = storedId || studentData._id;
            setDebug(`Fetching by ID: ${idToUse}`);
            await fetchReportsById(idToUse);
          }
          else {
            setLoggedIn(true);
            setLoading(false);
            setDebug("No identifier found, but logged in");
          }
        } catch (e) {
          console.error("Error parsing student info:", e);
          setDebug(`Error parsing: ${e.message}`);
          setLoggedIn(false);
          setLoading(false);
        }
      } else {
        setDebug("No student info found");
        setLoggedIn(false);
        setLoading(false);
      }
    };

    checkStoredLogin();
  }, []);

  // Fetch reports by phone number
  const fetchReportsByPhone = async (phone) => {
    setLoading(true);
    setError("");
    
    try {
      console.log("Fetching reports by phone:", phone);
      setDebug(`Calling API: ${API_BASE_URL}/student-reports/phone/${phone}`);
      
      const res = await axios.get(
        `${API_BASE_URL}/student-reports/phone/${phone}`
      );

      console.log("API Response:", res.data);
      setDebug(`Response received: ${JSON.stringify(res.data).substring(0, 100)}...`);

      // Handle different response formats
      if (res.data) {
        let reportsData = [];
        
        // Check if response has data in various possible formats
        if (res.data.success && res.data.data) {
          reportsData = res.data.data;
        } else if (Array.isArray(res.data)) {
          reportsData = res.data;
        } else if (res.data.reports) {
          reportsData = res.data.reports;
        } else if (res.data.studentReports) {
          reportsData = res.data.studentReports;
        } else {
          // If it's a single object, wrap in array
          reportsData = [res.data].filter(item => item && item._id);
        }
        
        if (reportsData.length > 0) {
          processReportsData(reportsData, `Phone: ${phone}`);
        } else {
          setReports([]);
          setLoggedIn(true);
          setLoading(false);
          setDebug("No reports in response");
        }
      } else {
        setReports([]);
        setLoggedIn(true);
        setLoading(false);
        setDebug("Empty response");
      }
    } catch (err) {
      console.error("Error fetching reports by phone:", err);
      setDebug(`Error: ${err.message}`);
      setError(err.response?.data?.message || "Failed to fetch reports");
      setReports([]);
      setLoggedIn(true);
      setLoading(false);
    }
  };

  // Fetch reports by roll number
  const fetchReportsByRollNo = async (rollNo) => {
    setLoading(true);
    setError("");
    
    try {
      console.log("Fetching reports by roll no:", rollNo);
      setDebug(`Calling API: ${API_BASE_URL}/student-reports/rollno/${rollNo}`);
      
      const res = await axios.get(
        `${API_BASE_URL}/student-reports/rollno/${rollNo}`
      );

      console.log("API Response:", res.data);
      setDebug(`Response received: ${JSON.stringify(res.data).substring(0, 100)}...`);

      if (res.data) {
        let reportsData = [];
        
        if (res.data.success && res.data.data) {
          reportsData = res.data.data;
        } else if (Array.isArray(res.data)) {
          reportsData = res.data;
        } else if (res.data.reports) {
          reportsData = res.data.reports;
        } else {
          reportsData = [res.data].filter(item => item && item._id);
        }
        
        if (reportsData.length > 0) {
          processReportsData(reportsData, `Roll: ${rollNo}`);
        } else {
          setReports([]);
          setLoggedIn(true);
          setLoading(false);
          setDebug("No reports in response");
        }
      } else {
        setReports([]);
        setLoggedIn(true);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching reports by roll no:", err);
      setDebug(`Error: ${err.message}`);
      setError(err.response?.data?.message || "Failed to fetch reports");
      setReports([]);
      setLoggedIn(true);
      setLoading(false);
    }
  };

  // Fetch reports by student ID
  const fetchReportsById = async (id) => {
    setLoading(true);
    setError("");
    
    try {
      console.log("Fetching reports by ID:", id);
      setDebug(`Calling API: ${API_BASE_URL}/student-reports/${id}`);
      
      const res = await axios.get(
        `${API_BASE_URL}/student-reports/${id}`
      );

      console.log("API Response:", res.data);
      setDebug(`Response received: ${JSON.stringify(res.data).substring(0, 100)}...`);

      if (res.data) {
        let reportsData = [];
        
        if (res.data.success && res.data.data) {
          reportsData = res.data.data;
        } else if (Array.isArray(res.data)) {
          reportsData = res.data;
        } else if (res.data.reports) {
          reportsData = res.data.reports;
        } else {
          reportsData = [res.data].filter(item => item && item._id);
        }
        
        if (reportsData.length > 0) {
          processReportsData(reportsData, id);
        } else {
          setReports([]);
          setLoggedIn(true);
          setLoading(false);
        }
      } else {
        setReports([]);
        setLoggedIn(true);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching reports by ID:", err);
      setDebug(`Error: ${err.message}`);
      setError(err.response?.data?.message || "Failed to fetch reports");
      setReports([]);
      setLoggedIn(true);
      setLoading(false);
    }
  };

  // Process reports data
  const processReportsData = (data, displayId) => {
    const formattedReports = data.map((r) => ({
      _id: r._id || r.id,
      name: r.studentName || r.name || r.userName || "Unknown",
      id: r.studentId || r.id || r.rollNo || r.rollNumber || "N/A",
      issueType: r.issueType || r.issue || r.type || "General",
      severity: r.severity || r.priority || "medium",
      date: r.date || r.createdAt || r.createdDate,
      description: r.description || r.message || r.details || "No description",
      actionTaken: r.actionTaken || r.action || r.resolution || "No action specified",
    }));

    setReports(formattedReports);
    setStudentId(displayId);
    setLoggedIn(true);
    
    // Calculate statistics
    const high = formattedReports.filter(r => r.severity?.toLowerCase() === 'high').length;
    const medium = formattedReports.filter(r => r.severity?.toLowerCase() === 'medium').length;
    const low = formattedReports.filter(r => r.severity?.toLowerCase() === 'low').length;
    
    setStats({
      total: formattedReports.length,
      high,
      medium,
      low
    });
    
    setLoading(false);
    setDebug(`Processed ${formattedReports.length} reports`);
    
    if (formattedReports.length > 0) {
      console.log(`Found ${formattedReports.length} reports`);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Reports</h1>
          <p className="text-sm text-gray-600 mt-1">
            {studentInfo ? `Welcome, ${studentInfo.name}` : "View your disciplinary and academic reports"}
          </p>
          {/* Debug Info - Remove in production */}
          {debug && (
            <p className="text-xs text-gray-500 mt-1 bg-gray-100 p-2 rounded">
              Debug: {debug}
            </p>
          )}
        </div>
        {loggedIn && reports.length > 0 && (
          <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
            <FaChartLine />
            <span className="font-semibold">{stats.total} Total Reports</span>
          </div>
        )}
      </div>

      {loading ? (
        /* Loading State */
        <div className="bg-white rounded-xl shadow-lg p-12 max-w-4xl mx-auto w-full text-center">
          <FaSpinner className="animate-spin text-4xl text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your reports...</p>
        </div>
      ) : !loggedIn ? (
        /* Not Logged In */
        <div className="bg-white rounded-xl shadow-lg p-12 max-w-4xl mx-auto w-full text-center">
          <FaExclamationCircle className="text-5xl text-purple-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Not Logged In</h2>
          <p className="text-gray-600 text-lg mb-6">Please sign in to view your reports.</p>
          <button
            onClick={() => window.location.href = "/signin-options"}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      ) : (
        /* 📋 REPORT TABLE */
        <div className="space-y-6">
          {/* Student Info Banner */}
          {studentInfo && (
            <div className="bg-purple-50 rounded-xl shadow-lg p-6 border border-purple-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-purple-600 text-3xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-800">{studentInfo.name}</h2>
                    <p className="text-purple-600">Roll No: {studentInfo.rollNo || studentInfo.rollNumber} • Room: {studentInfo.roomNo}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                    {studentInfo.hostel || studentInfo.hostelName || "Hostel"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">
                  My Reports {studentId && `(${studentId})`}
                </h2>
                <p className="text-gray-600 mt-1">
                  {reports.length} report{reports.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">High: {stats.high}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Medium: {stats.medium}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Low: {stats.low}</span>
                  </div>
                </div>
              </div>
            </div>

            {reports.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">S.No</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Student ID</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Issue Type</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Severity</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={report._id || index} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4 font-medium">{report.name}</td>
                        <td className="py-3 px-4 font-mono">{report.id}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <FaExclamationTriangle className="text-orange-500" />
                            <span>{report.issueType}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(report.severity)}`}>
                            {report.severity?.charAt(0).toUpperCase() + report.severity?.slice(1) || "Unknown"}
                          </span>
                        </td>
                        <td className="py-3 px-4">{formatDate(report.date)}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              alert(
                                `Report Details:\n\n` +
                                `Student Name: ${report.name}\n` +
                                `Student ID: ${report.id}\n` +
                                `Issue Type: ${report.issueType}\n` +
                                `Severity: ${report.severity}\n` +
                                `Date: ${formatDate(report.date)}\n` +
                                `Description: ${report.description || "No description"}\n` +
                                `Action Taken: ${report.actionTaken || "No action specified"}`
                              );
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FaExclamationCircle className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No Reports Found</h3>
                <p className="text-gray-500">No reports found for your account.</p>
              </div>
            )}

            {/* Summary Stats */}
            {reports.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">High Severity</p>
                  <p className="text-2xl font-bold text-red-600">{stats.high}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Medium Severity</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Low Severity</p>
                  <p className="text-2xl font-bold text-green-600">{stats.low}</p>
                </div>
              </div>
            )}
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center space-x-2">
              <FaExclamationTriangle />
              <span>Important Information</span>
            </h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• Reports are maintained by the hostel administration</li>
              <li>• You can contact the warden for clarification on any report</li>
              <li>• Serious reports may affect your hostel privileges</li>
              <li>• Keep your credentials confidential to protect your data</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MAIN LAYOUT COMPONENT ====================
export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentId, setStudentId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------- RESPONSIVE ---------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- CHECK IF ALREADY LOGGED IN ---------- */
  useEffect(() => {
    const savedStudent = localStorage.getItem("studentInfo") || sessionStorage.getItem("studentInfo");
    const savedId = localStorage.getItem("studentId") || sessionStorage.getItem("studentId");
    const savedPhone = localStorage.getItem("studentPhone") || sessionStorage.getItem("studentPhone");
    const savedRollNo = localStorage.getItem("studentRollNo") || sessionStorage.getItem("studentRollNo");
    
    console.log("StudentLayout - Checking login:", { savedStudent, savedId, savedPhone, savedRollNo });
    
    if (savedStudent && savedId) {
      try {
        const studentData = JSON.parse(savedStudent);
        setStudentInfo(studentData);
        setStudentId(savedId);
        setIsLoggedIn(true);
      } catch (e) {
        console.log("Error parsing student info:", e);
      }
    }
  }, []);

  /* ---------- SIDEBAR MENU ---------- */
  const menuItems = [
    { label: "My Account", icon: <FaUserCircle />, path: "/my-account" },
    { label: "Pay Fee", icon: <FaRupeeSign />, path: "/pay-fee" },
    { label: "Mess Fee", icon: <FaUtensils />, path: "/mess-fee" },
    { label: "Canteen Fee", icon: <FaCoffee />, path: "/canteen-fee" },
    { label: "Reports", icon: <FaChartLine />, path: "/admin/reports" },
    { label: "Function", icon: <FaClipboardList />, path: "/functions" },
    { label: "Pending Complain", icon: <FaExclamationTriangle />, path: "/admin/pending-complaint" },
    { label: "Setting", icon: <FaCog />, path: "/student-setting" },
  ];

  const handleMenuClick = (label, path) => {
    setActiveMenu(label);
    navigate(path);
    if (isMobile) setSidebarOpen(false);
  };

  /* ---------- LOGOUT FUNCTION ---------- */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentInfo(null);
    setStudentId("");
    
    // Clear all storage
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("studentId");
    localStorage.removeItem("token");
    localStorage.removeItem("reportStudentId");
    localStorage.removeItem("reportStudentData");
    localStorage.removeItem("studentPhone");
    localStorage.removeItem("studentRollNo");
    
    sessionStorage.removeItem("studentInfo");
    sessionStorage.removeItem("studentId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("studentPhone");
    sessionStorage.removeItem("studentRollNo");
    
    setDropdownOpen(false);
    navigate("/");
  };

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

  // Set active menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => item.path === currentPath);
    if (currentMenuItem) {
      setActiveMenu(currentMenuItem.label);
    }
  }, [location.pathname]);

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

        {/* Student Info in Sidebar if logged in */}
        {isLoggedIn && studentInfo && (
          <div className="p-4 border-t border-orange-500">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-2xl" />
              <div>
                <p className="font-semibold truncate">{studentInfo.name || "Student"}</p>
                <p className="text-sm opacity-90">ID: {studentId}</p>
              </div>
            </div>
          </div>
        )}
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
                  {isLoggedIn && studentInfo && (
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 truncate">{studentInfo.name || "Student"}</p>
                      <p className="text-sm text-gray-500 truncate">ID: {studentId}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors border-b border-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/my-account");
                    }}
                  >
                    <span className="flex items-center space-x-2">
                      <FaUserCircle />
                      <span>Profile</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors border-b border-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/student-setting");
                    }}
                  >
                    <span className="flex items-center space-x-2">
                      <FaCog />
                      <span>Settings</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-gray-100"
                    onClick={handleLogout}
                  >
                    <span className="flex items-center space-x-2">
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---------- PAGE CONTENT ---------- */}
        <section className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-auto">
          {/* Check current route and render appropriate content */}
          {location.pathname === "/admin/reports" ? (
            <ReportsPage />
          ) : (
            <Outlet />
          )}
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

// Export both components
export { ReportsPage };