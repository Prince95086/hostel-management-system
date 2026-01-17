import React, { useState, useEffect } from "react";
import { FaUserCircle, FaUsers, FaClipboardList, FaCog, FaChartLine, FaExclamationTriangle, FaTasks, FaTachometerAlt, FaBars, FaUtensils, FaCoffee, FaSearch, FaRupeeSign, FaReceipt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaMoneyBillWave } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";

export default function StudentPortal() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("My Account");
  const [isMobile, setIsMobile] = useState(false);

  // Current student data (logged in student)
  const currentStudent = {
    id: 1,
    name: "Rahul Sharma",
    rollNo: "2023001",
    roomNo: "101",
    contactNumber: "+91 9876543210",
    email: "rahul.sharma@student.edu",
    department: "Computer Science",
    messFee: {
      monthlyFee: 2500,
      months: {
        "2024-01": { amount: 2500, paid: 2500, status: "paid", paymentDate: "2024-01-15" },
        "2024-02": { amount: 2500, paid: 2500, status: "paid", paymentDate: "2024-02-15" },
        "2024-03": { amount: 2500, paid: 0, status: "pending" },
        "2024-04": { amount: 2500, paid: 0, status: "pending" }
      }
    },
    canteenFee: {
      monthlyFee: 1250,
      months: {
        "2024-01": { amount: 1250, paid: 1250, status: "paid", paymentDate: "2024-01-20" },
        "2024-02": { amount: 1250, paid: 1250, status: "paid", paymentDate: "2024-02-20" },
        "2024-03": { amount: 1250, paid: 0, status: "pending" },
        "2024-04": { amount: 1250, paid: 0, status: "pending" }
      }
    }
  };

  // Check screen size on component mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector('.sidebar');
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

  // Updated menu items with new icons
  const menuItems = [
    { name: "My Account", icon: <FaUserCircle /> },
    { name: "Pay Fee", icon: <FaRupeeSign /> },
    { name: "Mess Fee", icon: <FaUtensils /> },
    { name: "Canteen Fee", icon: <FaCoffee /> },
    { name: "Reports", icon: <FaChartLine /> },
    { name: "Total Complain", icon: <FaClipboardList /> },
    { name: "Pending Complain", icon: <FaExclamationTriangle /> },
    { name: "Setting", icon: <FaCog /> },
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const shouldShowSidebar = isMobile ? sidebarOpen : true;

  const getFeeData = () => {
    return activeMenu === "Mess Fee" ? currentStudent.messFee : currentStudent.canteenFee;
  };

  // Calculate total statistics
  const calculateTotalStats = () => {
    const feeData = getFeeData();
    let totalAmount = 0;
    let totalPaid = 0;
    let totalPending = 0;
    
    Object.values(feeData.months).forEach(month => {
      totalAmount += month.amount;
      totalPaid += month.paid;
      totalPending += (month.amount - month.paid);
    });
    
    return { totalAmount, totalPaid, totalPending };
  };

  // Handle payment for fees
  const handleFeePayment = (feeType) => {
    alert(`Redirecting to ${feeType} payment page...`);
    // In a real application, this would redirect to a payment gateway
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`
        sidebar
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-orange-400 text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 ease-in-out
        ${shouldShowSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5">
          <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
            Student Panel
          </h2>

          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-200
                    ${activeMenu === item.name ? 'bg-orange-600' : 'hover:bg-orange-500'}
                  `}
                  onClick={() => handleMenuClick(item.name)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Section */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button 
                  onClick={toggleSidebar}
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

            <div className="relative">
              <div
                className="flex items-center space-x-1 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle className="text-gray-700 w-8 h-8 lg:w-10 lg:h-10 hover:text-green-600 transition-colors" />
                <IoChevronDown className={`text-gray-600 w-4 h-4 lg:w-5 lg:h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 w-48 py-2 z-10">
                  <button className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-100">
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-100">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 cursor-pointer transition-colors">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <section className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
            {/* Content Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {activeMenu}
              </h2>
              <p className="text-gray-600 mt-2">
                {activeMenu === "My Account" 
                  ? "Manage your personal account information" 
                  : activeMenu === "Pay Fee"
                  ? "Make fee payments for various services"
                  : activeMenu === "Mess Fee"
                  ? "View your mess fee payment history and details"
                  : activeMenu === "Canteen Fee"
                  ? "View your canteen fee payment history and details"
                  : activeMenu === "Reports"
                  ? "View various reports and analytics"
                  : activeMenu === "Total Complain"
                  ? "View all submitted complaints"
                  : activeMenu === "Pending Complain"
                  ? "View pending complaints that need attention"
                  : activeMenu === "Setting"
                  ? "Manage your account settings and preferences"
                  : `Manage ${activeMenu.toLowerCase()} settings and information`}
              </p>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 p-6">
              {/* My Account Page */}
              {activeMenu === "My Account" && (
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
                        <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaUserCircle className="text-orange-500 text-6xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{currentStudent.name}</h3>
                        <p className="text-gray-600">Roll No: {currentStudent.rollNo}</p>
                        <p className="text-gray-600">Room No: {currentStudent.roomNo}</p>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-green-600 font-semibold">Active Student</p>
                        </div>
                      </div>
                    </div>

                    {/* Account Details */}
                    <div className="lg:col-span-2">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Full Name</label>
                              <p className="mt-1 text-gray-900">{currentStudent.name}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                              <p className="mt-1 text-gray-900">{currentStudent.rollNo}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Room Number</label>
                              <p className="mt-1 text-gray-900">{currentStudent.roomNo}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                              <p className="mt-1 text-gray-900">{currentStudent.contactNumber}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Email Address</label>
                              <p className="mt-1 text-gray-900">{currentStudent.email}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Department</label>
                              <p className="mt-1 text-gray-900">{currentStudent.department}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="text-blue-600 font-semibold">Mess Fee Status</div>
                          <div className="text-2xl font-bold text-gray-800">₹2,500</div>
                          <div className="text-sm text-blue-600 mt-1">Current Month</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="text-green-600 font-semibold">Canteen Fee</div>
                          <div className="text-2xl font-bold text-gray-800">₹1,250</div>
                          <div className="text-sm text-green-600 mt-1">Current Month</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="text-purple-600 font-semibold">Pending Complaints</div>
                          <div className="text-2xl font-bold text-gray-800">2</div>
                          <div className="text-sm text-purple-600 mt-1">Need Attention</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pay Fee Page */}
              {activeMenu === "Pay Fee" && (
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mess Fee Card */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Mess Fee</h3>
                        <FaUtensils className="text-orange-500 text-2xl" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Fee:</span>
                          <span className="font-semibold">₹2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending Amount:</span>
                          <span className="text-red-600 font-semibold">₹5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="text-orange-600 font-semibold">10th April 2024</span>
                        </div>
                      </div>
                      <button 
                        className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                        onClick={() => handleFeePayment("Mess Fee")}
                      >
                        Pay Mess Fee
                      </button>
                    </div>

                    {/* Canteen Fee Card */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Canteen Fee</h3>
                        <FaCoffee className="text-yellow-600 text-2xl" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Fee:</span>
                          <span className="font-semibold">₹1,250</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending Amount:</span>
                          <span className="text-red-600 font-semibold">₹2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="text-orange-600 font-semibold">10th April 2024</span>
                        </div>
                      </div>
                      <button 
                        className="w-full mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                        onClick={() => handleFeePayment("Canteen Fee")}
                      >
                        Pay Canteen Fee
                      </button>
                    </div>
                  </div>

                  {/* Payment History */}
                  <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Payments</h3>
                    <div className="space-y-3">
                      {[
                        { service: "Mess Fee", amount: "₹2,500", date: "15 Mar 2024", status: "Completed" },
                        { service: "Canteen Fee", amount: "₹1,250", date: "20 Mar 2024", status: "Completed" },
                        { service: "Mess Fee", amount: "₹2,500", date: "15 Feb 2024", status: "Completed" },
                      ].map((payment, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                          <div>
                            <span className="font-semibold text-gray-800">{payment.service}</span>
                            <p className="text-sm text-gray-600">{payment.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-gray-800">{payment.amount}</span>
                            <p className="text-sm text-green-600">{payment.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Fee Management Pages - Only Current Student's Data */}
              {(activeMenu === "Mess Fee" || activeMenu === "Canteen Fee") && (
                <div className="max-w-7xl mx-auto">
                  {/* Student Info Header */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{currentStudent.name}'s {activeMenu} History</h3>
                        <p className="text-gray-600">Roll No: {currentStudent.rollNo} | Room: {currentStudent.roomNo}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Current Status</div>
                        <div className={`text-lg font-semibold ${
                          calculateTotalStats().totalPending === 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {calculateTotalStats().totalPending === 0 ? "All Paid" : "Pending: ₹" + calculateTotalStats().totalPending}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Fee Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-blue-600 font-semibold">Total Fee</div>
                        <div className="text-2xl font-bold text-gray-800">₹{calculateTotalStats().totalAmount}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-green-600 font-semibold">Paid Amount</div>
                        <div className="text-2xl font-bold text-gray-800">₹{calculateTotalStats().totalPaid}</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="text-red-600 font-semibold">Pending Amount</div>
                        <div className="text-2xl font-bold text-gray-800">₹{calculateTotalStats().totalPending}</div>
                      </div>
                    </div>

                    {/* Monthly Payment History Table */}
                    <div className="bg-gray-50 rounded-lg border border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-800">Monthly Payment History</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Month</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Monthly Fee</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Paid Amount</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Pending</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Payment Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {Object.entries(getFeeData().months)
                              .sort(([a], [b]) => b.localeCompare(a)) // Sort by month descending
                              .map(([month, data]) => (
                              <tr key={month}>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  <FaCalendarAlt className="inline mr-2 text-gray-400" />
                                  {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                  ₹{data.amount}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  ₹{data.paid}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-red-600">
                                  ₹{data.amount - data.paid}
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    data.status === "paid" 
                                      ? "bg-green-100 text-green-800"
                                      : data.status === "partial"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {data.status === "paid" ? (
                                      <FaCheckCircle className="mr-1" />
                                    ) : data.status === "partial" ? (
                                      <FaMoneyBillWave className="mr-1" />
                                    ) : (
                                      <FaTimesCircle className="mr-1" />
                                    )}
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {data.paymentDate || "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reports Page */}
              {activeMenu === "Reports" && (
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[
                      { title: "Fee Collection", value: "₹85,250", color: "bg-green-500", description: "Total collected this month" },
                      { title: "Pending Fees", value: "₹24,500", color: "bg-red-500", description: "Yet to be collected" },
                      { title: "Total Students", value: "45", color: "bg-blue-500", description: "Currently enrolled" },
                      { title: "Active Complaints", value: "12", color: "bg-yellow-500", description: "Need resolution" },
                      { title: "Monthly Revenue", value: "₹1,25,000", color: "bg-purple-500", description: "All services" },
                      { title: "Collection Rate", value: "85%", color: "bg-teal-500", description: "This month" },
                    ].map((stat, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-gray-600 mt-1">{stat.title}</p>
                            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
                          </div>
                          <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                            <FaChartLine />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complaints Pages */}
              {(activeMenu === "Total Complain" || activeMenu === "Pending Complain") && (
                <div className="max-w-6xl mx-auto">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {activeMenu === "Total Complain" ? "All Complaints" : "Pending Complaints"}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {[
                          { 
                            id: 1, 
                            title: "Mess Food Quality Issue", 
                            description: "The quality of food in mess has deteriorated in the past week.", 
                            status: activeMenu === "Pending Complain" ? "Pending" : "Resolved",
                            date: "2024-03-25",
                            priority: "High"
                          },
                          { 
                            id: 2, 
                            title: "Water Supply Problem", 
                            description: "No water supply in room 105 since morning.", 
                            status: activeMenu === "Pending Complain" ? "Pending" : "In Progress",
                            date: "2024-03-24",
                            priority: "High"
                          },
                          { 
                            id: 3, 
                            title: "WiFi Connectivity Issue", 
                            description: "Poor WiFi signal in common area.", 
                            status: "Resolved",
                            date: "2024-03-20",
                            priority: "Medium"
                          },
                        ]
                        .filter(complaint => activeMenu === "Total Complain" || complaint.status === "Pending")
                        .map(complaint => (
                          <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-800">{complaint.title}</h4>
                                <p className="text-gray-600 mt-1">{complaint.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-sm text-gray-500">
                                    <FaCalendarAlt className="inline mr-1" />
                                    {complaint.date}
                                  </span>
                                  <span className={`text-sm px-2 py-1 rounded-full ${
                                    complaint.priority === "High" 
                                      ? "bg-red-100 text-red-800"
                                      : complaint.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}>
                                    {complaint.priority} Priority
                                  </span>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                complaint.status === "Resolved" 
                                  ? "bg-green-100 text-green-800"
                                  : complaint.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {complaint.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Page */}
              {activeMenu === "Setting" && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input 
                              type="text" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={currentStudent.name}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                              type="email" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={currentStudent.email}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input 
                              type="tel" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={currentStudent.contactNumber}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                            <input 
                              type="text" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={currentStudent.roomNo}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h4>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" defaultChecked />
                            <span className="ml-2 text-gray-700">Fee payment reminders</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" defaultChecked />
                            <span className="ml-2 text-gray-700">Complaint status updates</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                            <span className="ml-2 text-gray-700">Hostel announcements</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Close dropdown when clicking outside */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
}