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
  FaExclamationCircle
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";
import axios from "axios";

// ==================== REPORTS COMPONENT ====================
function ReportsPage() {
  const [studentId, setStudentId] = useState("");
  const [reports, setReports] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already logged in from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem("reportStudentId");
    const savedReports = localStorage.getItem("reportStudentData");
    
    if (savedId && savedReports) {
      setStudentId(savedId);
      setReports(JSON.parse(savedReports));
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!studentId.trim()) {
      setError("Please enter your Student ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student-reports/${studentId}`
      );

      const data = res.data.map((r) => ({
        _id: r._id,
        name: r.studentName,
        id: r.studentId,
        issueType: r.issueType,
        severity: r.severity,
        date: r.date,
        description: r.description,
        actionTaken: r.actionTaken,
      }));

      setReports(data);
      setLoggedIn(true);
      localStorage.setItem("reportStudentId", studentId);
      localStorage.setItem("reportStudentData", JSON.stringify(data));
    } catch (err) {
      console.log(err);
      setError("No reports found or server error. Please check your Student ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setStudentId("");
    setReports([]);
    setLoggedIn(false);
    localStorage.removeItem("reportStudentId");
    localStorage.removeItem("reportStudentData");
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Reports</h1>
        <div className="text-sm text-gray-600">
          View your disciplinary and academic reports
        </div>
      </div>

      {!loggedIn ? (
        /* 🔐 LOGIN FORM - INCREASED WIDTH */
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationCircle className="text-purple-600 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-purple-700 mb-2">
              Student Login
            </h2>
            <p className="text-gray-600">Enter your Student ID to view your reports</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID *
              </label>
              <div className="relative">
                <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaTimesCircle className="text-red-500" />
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Loading Reports...</span>
                </>
              ) : (
                <>
                  <FaLock />
                  <span>View My Reports</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <p className="text-base text-gray-600">
              <strong>Note:</strong> This section shows your disciplinary reports, complaints, and academic reports. 
              Your data is secure and only accessible with your Student ID.
            </p>
          </div>
        </div>
      ) : (
        /* 📋 REPORT TABLE */
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-700">
                  My Reports (ID: {studentId})
                </h2>
                <p className="text-gray-600 mt-1">
                  {reports.length} report{reports.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">High</span>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Medium</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Low</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
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
                      <tr key={report._id} className="border-t hover:bg-gray-50 transition-colors">
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
                            {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{report.date}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              alert(
                                `Report Details:\n\n` +
                                `Student Name: ${report.name}\n` +
                                `Student ID: ${report.id}\n` +
                                `Issue Type: ${report.issueType}\n` +
                                `Severity: ${report.severity}\n` +
                                `Date: ${report.date}\n` +
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
                <p className="text-gray-500">No disciplinary reports found for your account.</p>
              </div>
            )}

            {/* Summary Stats */}
            {reports.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-800">{reports.length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">High Severity</p>
                  <p className="text-2xl font-bold text-red-600">
                    {reports.filter(r => r.severity === "high").length}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Medium Severity</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {reports.filter(r => r.severity === "medium").length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Low Severity</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reports.filter(r => r.severity === "low").length}
                  </p>
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
              <li>• Keep your Student ID confidential to protect your data</li>
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
  const [activeMenu, setActiveMenu] = useState(""); // Changed from "My Account" to empty string
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
    const savedStudent = localStorage.getItem("studentInfo");
    const savedId = localStorage.getItem("studentId");
    if (savedStudent && savedId) {
      setStudentInfo(JSON.parse(savedStudent));
      setStudentId(savedId);
      setIsLoggedIn(true);
    }
  }, []);

  /* ---------- SIDEBAR MENU ---------- */
  const menuItems = [
    { label: "My Account", icon: <FaUserCircle />, path: "/my-account" },
    { label: "Pay Fee", icon: <FaRupeeSign />, path: "/pay-fee" },
    { label: "Mess Fee", icon: <FaUtensils />, path: "/mess-fee" },
    { label: "Canteen Fee", icon: <FaCoffee />, path: "/canteen-fee" },
    { label: "Reports", icon: <FaChartLine />, path: "/admin/reports" },
    { label: "Function", icon: <FaClipboardList />, path: "/admin/total-complaint" },
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
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("studentId");
    localStorage.removeItem("reportStudentId");
    localStorage.removeItem("reportStudentData");
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