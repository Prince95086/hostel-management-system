import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUtensils,
  FaCoffee,
  FaClipboardList,
  FaChartLine,
  FaExclamationTriangle,
  FaTasks,
  FaCog,
  FaBars,
  FaUserCircle,
  FaBuilding,
  FaUserTie,
  FaBed,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaExclamationCircle
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() { // Changed from dashboard() to Dashboard()
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 245,
    totalHostels: 1,
    totalWorkers: 18,
    totalRooms: 120,
    messFeeCollected: 857500,
    messFeePending: 122500,
    attendanceRate: 94,
    pendingComplaints: 8
  });

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

  /* ---------- SIDEBAR MENU ---------- */
  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin-dashbord" },
    { label: "Students", icon: <FaUsers />, path: "/admin-student" },
    { label: "Student Mess Fee", icon: <FaUtensils />, path: "/messfee-record" },
    { label: "Student Canteen Fee", icon: <FaCoffee />, path: "/admin/canteen-fee" },
    { label: "Attendance of Worker", icon: <FaClipboardList />, path: "/admin/attendance" },
    { label: "Total Attendance", icon: <FaChartLine />, path: "/admin/total-attendance" },
    { label: "Report Student", icon: <FaExclamationTriangle />, path: "/admin/report-student" },
    { label: "Function", icon: <FaTasks />, path: "/admin/function" },
    { label: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  /* ---------- STATISTICS DATA ---------- */
  const statisticsCards = [
    {
      title: "Total Students",
      value: dashboardData.totalStudents,
      icon: <FaUsers className="text-2xl text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12 this month"
    },
    {
      title: "Total Hostels",
      value: dashboardData.totalHostels,
      icon: <FaBuilding className="text-2xl text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "1 Building"
    },
    {
      title: "Total Workers",
      value: dashboardData.totalWorkers,
      icon: <FaUserTie className="text-2xl text-purple-600" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "4 on leave"
    },
    {
      title: "Total Rooms",
      value: dashboardData.totalRooms,
      icon: <FaBed className="text-2xl text-orange-600" />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "15 vacant"
    },
    {
      title: "Mess Fee Collected",
      value: `₹${(dashboardData.messFeeCollected / 1000).toFixed(0)}K`,
      icon: <FaMoneyBillWave className="text-2xl text-teal-600" />,
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      change: "85% collected"
    },
    {
      title: "Mess Fee Pending",
      value: `₹${(dashboardData.messFeePending / 1000).toFixed(0)}K`,
      icon: <FaMoneyBillWave className="text-2xl text-red-600" />,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      change: "15% pending"
    },
    {
      title: "Attendance Rate",
      value: `${dashboardData.attendanceRate}%`,
      icon: <FaCalendarCheck className="text-2xl text-indigo-600" />,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      change: "+2% from last month"
    },
    {
      title: "Pending Complaints",
      value: dashboardData.pendingComplaints,
      icon: <FaExclamationCircle className="text-2xl text-yellow-600" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      change: "3 resolved today"
    }
  ];

  /* ---------- CHART DATA ---------- */
  const monthlyFeeData = [
    { month: 'Jan', collected: 420000, pending: 80000 },
    { month: 'Feb', collected: 450000, pending: 50000 },
    { month: 'Mar', collected: 480000, pending: 20000 },
    { month: 'Apr', collected: 460000, pending: 40000 },
    { month: 'May', collected: 490000, pending: 10000 },
    { month: 'Jun', collected: 520000, pending: 0 },
  ];

  const roomOccupancyData = [
    { name: 'Occupied', value: 105, color: '#10B981' },
    { name: 'Vacant', value: 15, color: '#EF4444' },
  ];

  const recentActivities = [
    { id: 1, activity: 'New student registered - Rahul Sharma', time: '10 mins ago', type: 'student' },
    { id: 2, activity: 'Mess fee paid - Amit Kumar', time: '25 mins ago', type: 'payment' },
    { id: 3, activity: 'Complaint resolved - Room 204', time: '1 hour ago', type: 'complaint' },
    { id: 4, activity: 'Worker checked in - Rajesh Kumar', time: '2 hours ago', type: 'worker' },
    { id: 5, activity: 'Monthly report generated', time: '3 hours ago', type: 'report' },
  ];

  /* ---------- RENDER DASHBOARD CONTENT ---------- */
  const renderDashboardContent = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Admin!</h1>
          <p className="text-blue-100">Here's what's happening with your hostel today.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-semibold">Today's Date:</span> {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-semibold">Hostel:</span> Teja Singh Boys Hostel 6
            </div>
          </div>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statisticsCards.map((card, index) => (
            <div key={index} className={`${card.bgColor} rounded-xl shadow p-5 hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.textColor} mt-1`}>{card.value}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow">
                  {card.icon}
                </div>
              </div>
              <p className="text-sm text-gray-500">{card.change}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fee Collection Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Fee Collection</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyFeeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="collected" name="Collected" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Room Occupancy Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Room Occupancy Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roomOccupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roomOccupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Rooms']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <span className="font-semibold">Total Rooms:</span> 120 | 
                <span className="text-green-600 font-semibold ml-2">Occupied: 105</span> | 
                <span className="text-red-600 font-semibold ml-2">Vacant: 15</span>
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  activity.type === 'student' ? 'bg-blue-100' :
                  activity.type === 'payment' ? 'bg-green-100' :
                  activity.type === 'complaint' ? 'bg-yellow-100' :
                  activity.type === 'worker' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  {activity.type === 'student' && <FaUsers className="text-blue-600" />}
                  {activity.type === 'payment' && <FaMoneyBillWave className="text-green-600" />}
                  {activity.type === 'complaint' && <FaExclamationCircle className="text-yellow-600" />}
                  {activity.type === 'worker' && <FaUserTie className="text-purple-600" />}
                  {activity.type === 'report' && <FaChartLine className="text-gray-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.activity}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow p-6 text-white">
            <h4 className="text-lg font-bold mb-3">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors">
                Add New Student
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors">
                Generate Report
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors">
                Check Attendance
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow p-6 text-white">
            <h4 className="text-lg font-bold mb-3">Fee Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Collection:</span>
                <span className="font-bold">₹8,57,500</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Amount:</span>
                <span className="font-bold">₹1,22,500</span>
              </div>
              <div className="flex justify-between">
                <span>Collection Rate:</span>
                <span className="font-bold">87.5%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow p-6 text-white">
            <h4 className="text-lg font-bold mb-3">Upcoming Events</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Hostel Committee Meeting - Tomorrow</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Monthly Cleaning - This Saturday</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>Fee Deadline - 5th of next month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30
        w-60 bg-green-600 text-white
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-3">
          <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
            Admin Panel
          </h2>

          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3
              px-3 py-3 mb-1
              text-lg font-semibold
              rounded-lg
              hover:bg-green-700
              transition-all text-left
              ${location.pathname === item.path ? 'bg-green-800' : ''}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col">
        {/* ---------- HEADER ---------- */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaBars className="text-2xl text-gray-700" />
              </button>
            )}

            <img src={pulogo} alt="PU Logo" className="w-12 h-12" />

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Teja Singh Boys Hostel 6
            </h1>
          </div>

          {/* ---------- PROFILE ---------- */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              <FaUserCircle size={34} />
              <IoChevronDown
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white shadow rounded w-44 z-50">
                <button className="w-full px-4 py-3 text-left hover:bg-green-50">
                  Profile
                </button>
                <button className="w-full px-4 py-3 text-left hover:bg-green-50">
                  Settings
                </button>
                <button className="w-full px-4 py-3 text-left hover:bg-green-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ---------- PAGE CONTENT ---------- */}
        <section className="flex-1 p-6 overflow-auto">
          {/* Show dashboard content when on dashboard route */}
          {location.pathname === "/admin-dashbord" ? renderDashboardContent() : <Outlet />}
        </section>
      </main>
    </div>
  );
}