import React, { useState, useEffect } from "react";
import { FaUserCircle, FaUsers, FaClipboardList, FaCog, FaChartLine, FaExclamationTriangle, FaTasks, FaTachometerAlt, FaBars, FaUtensils, FaCoffee, FaSearch, FaRupeeSign, FaReceipt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaMoneyBillWave } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";

export default function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeeTab, setActiveFeeTab] = useState("payment-records");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  // Sample student data with monthly fee structure
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      rollNo: "2023001",
      roomNo: "101",
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
    },
    {
      id: 2,
      name: "Amit Kumar",
      rollNo: "2023002",
      roomNo: "102",
      messFee: {
        monthlyFee: 2500,
        months: {
          "2024-01": { amount: 2500, paid: 2500, status: "paid", paymentDate: "2024-01-16" },
          "2024-02": { amount: 2500, paid: 2500, status: "paid", paymentDate: "2024-02-16" },
          "2024-03": { amount: 2500, paid: 2500, status: "paid", paymentDate: "2024-03-15" },
          "2024-04": { amount: 2500, paid: 0, status: "pending" }
        }
      },
      canteenFee: {
        monthlyFee: 1250,
        months: {
          "2024-01": { amount: 1250, paid: 1250, status: "paid", paymentDate: "2024-01-21" },
          "2024-02": { amount: 1250, paid: 1250, status: "paid", paymentDate: "2024-02-21" },
          "2024-03": { amount: 1250, paid: 1250, status: "paid", paymentDate: "2024-03-20" },
          "2024-04": { amount: 1250, paid: 0, status: "pending" }
        }
      }
    },
    {
      id: 3,
      name: "Vikram Singh",
      rollNo: "2023003",
      roomNo: "103",
      messFee: {
        monthlyFee: 2500,
        months: {
          "2024-01": { amount: 2500, paid: 2500, status: "paid", paymentDate: "2024-01-17" },
          "2024-02": { amount: 2500, paid: 0, status: "pending" },
          "2024-03": { amount: 2500, paid: 0, status: "pending" },
          "2024-04": { amount: 2500, paid: 0, status: "pending" }
        }
      },
      canteenFee: {
        monthlyFee: 1250,
        months: {
          "2024-01": { amount: 1250, paid: 1250, status: "paid", paymentDate: "2024-01-22" },
          "2024-02": { amount: 1250, paid: 0, status: "pending" },
          "2024-03": { amount: 1250, paid: 0, status: "pending" },
          "2024-04": { amount: 1250, paid: 0, status: "pending" }
        }
      }
    }
  ]);

  // Generate months for dropdown (last 6 months and next 2 months)
  const generateMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = -6; i <= 2; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const monthYear = `${year}-${month}`;
      const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      months.push({ value: monthYear, label: monthName });
    }
    
    return months;
  };

  const availableMonths = generateMonths();

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

  // Menu items with icons
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Students", icon: <FaUsers /> },
    { name: "Student Mess Fee", icon: <FaUtensils /> },
    { name: "Student Canteen Fee", icon: <FaCoffee /> },
    { name: "Attendance of Worker", icon: <FaClipboardList /> },
    { name: "Total Attendance of Worker", icon: <FaChartLine /> },
    { name: "Report any Student", icon: <FaExclamationTriangle /> },
    { name: "Function", icon: <FaTasks /> },
    { name: "Settings", icon: <FaCog /> },
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

  // Calculate pending months and total pending amount
  const calculatePendingDetails = (student) => {
    const feeType = activeMenu === "Student Mess Fee" ? "messFee" : "canteenFee";
    const feeData = student[feeType];
    
    let totalPending = 0;
    let pendingMonths = [];
    
    Object.entries(feeData.months).forEach(([month, data]) => {
      if (data.status === "pending") {
        totalPending += data.amount;
        pendingMonths.push({
          month,
          amount: data.amount,
          dueDate: getDueDate(month)
        });
      }
    });
    
    return { totalPending, pendingMonths };
  };

  const getDueDate = (month) => {
    const [year, monthNum] = month.split('-');
    return `${year}-${monthNum}-10`; // Due date is 10th of each month
  };

  const handleFeePayment = () => {
    if (!selectedStudent || !paymentAmount || paymentAmount <= 0) {
      alert("Please select a student and enter valid payment amount");
      return;
    }

    const feeType = activeMenu === "Student Mess Fee" ? "messFee" : "canteenFee";
    const amount = parseInt(paymentAmount);
    const pendingDetails = calculatePendingDetails(selectedStudent);
    
    if (amount > pendingDetails.totalPending) {
      alert(`Payment amount cannot exceed total pending amount of ₹${pendingDetails.totalPending}`);
      return;
    }

    // Update student data - pay from oldest pending month first
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        const updatedMonths = { ...student[feeType].months };
        let remainingAmount = amount;
        
        // Pay from oldest pending months first
        Object.keys(updatedMonths)
          .sort()
          .forEach(month => {
            if (remainingAmount > 0 && updatedMonths[month].status === "pending") {
              const monthPending = updatedMonths[month].amount - updatedMonths[month].paid;
              
              if (remainingAmount >= monthPending) {
                // Full payment for this month
                updatedMonths[month] = {
                  ...updatedMonths[month],
                  paid: updatedMonths[month].amount,
                  status: "paid",
                  paymentDate: paymentDate
                };
                remainingAmount -= monthPending;
              } else {
                // Partial payment for this month
                updatedMonths[month] = {
                  ...updatedMonths[month],
                  paid: updatedMonths[month].paid + remainingAmount,
                  status: "partial"
                };
                remainingAmount = 0;
              }
            }
          });

        return {
          ...student,
          [feeType]: {
            ...student[feeType],
            months: updatedMonths
          }
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setSelectedStudent(updatedStudents.find(s => s.id === selectedStudent.id));
    setPaymentAmount("");
    alert("Payment recorded successfully!");
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roomNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shouldShowSidebar = isMobile ? sidebarOpen : true;

  const getFeeData = (student) => {
    return activeMenu === "Student Mess Fee" ? student.messFee : student.canteenFee;
  };

  // Calculate total statistics
  const calculateTotalStats = (student) => {
    const feeData = getFeeData(student);
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`
        sidebar
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-green-600 text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 ease-in-out
        ${shouldShowSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5">
          <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
            Admin Panel
          </h2>

          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-200
                    ${activeMenu === item.name ? 'bg-green-700' : 'hover:bg-green-700'}
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
                {activeMenu === "Dashboard" 
                  ? "Welcome to your admin dashboard" 
                  : activeMenu === "Student Mess Fee"
                  ? "Manage student mess fee payments and records"
                  : activeMenu === "Student Canteen Fee"
                  ? "Manage student canteen fee payments and records"
                  : `Manage ${activeMenu.toLowerCase()} settings and information`}
              </p>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 p-6">
              {activeMenu === "Dashboard" && (
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-4">
                    Select an option from the sidebar to continue.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-6xl mx-auto">
                    {[
                      { title: "Total Students", value: "245", color: "bg-blue-500", icon: <FaUsers /> },
                      { title: "Workers", value: "18", color: "bg-green-500", icon: <FaClipboardList /> },
                      { title: "Rooms", value: "45", color: "bg-yellow-500", icon: <FaTasks /> },
                      { title: "Pending Reports", value: "7", color: "bg-red-500", icon: <FaExclamationTriangle /> },
                    ].map((stat, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-gray-600 mt-2">{stat.title}</p>
                          </div>
                          <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                            {stat.icon}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee Management Pages */}
              {(activeMenu === "Student Mess Fee" || activeMenu === "Student Canteen Fee") && (
                <div className="max-w-7xl mx-auto">
                  {/* Tab Navigation */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
                        activeFeeTab === "payment-records"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveFeeTab("payment-records")}
                    >
                      <FaReceipt className="inline mr-2" />
                      Payment Records
                    </button>
                    <button
                      className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
                        activeFeeTab === "fee-collection"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveFeeTab("fee-collection")}
                    >
                      <FaRupeeSign className="inline mr-2" />
                      Fee Collection
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students by name, roll number, or room..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Payment Records Tab */}
                  {activeFeeTab === "payment-records" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Student List */}
                      <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Students</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {filteredStudents.map(student => {
                            const stats = calculateTotalStats(student);
                            return (
                              <div
                                key={student.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                  selectedStudent?.id === student.id
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-green-300"
                                }`}
                                onClick={() => setSelectedStudent(student)}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-gray-800">{student.name}</h4>
                                    <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                                    <p className="text-sm text-gray-600">Room: {student.roomNo}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className={`text-sm font-medium ${
                                      stats.totalPending === 0 ? "text-green-600" : "text-red-600"
                                    }`}>
                                      ₹{stats.totalPaid}/₹{stats.totalAmount}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Pending: ₹{stats.totalPending}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Payment History */}
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">
                          {selectedStudent ? `${selectedStudent.name}'s Monthly Payment History` : "Select a student to view payment history"}
                        </h3>
                        
                        {selectedStudent && (
                          <div className="space-y-4">
                            {/* Fee Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div className="text-blue-600 font-semibold">Total Fee</div>
                                <div className="text-2xl font-bold text-gray-800">₹{calculateTotalStats(selectedStudent).totalAmount}</div>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="text-green-600 font-semibold">Paid Amount</div>
                                <div className="text-2xl font-bold text-gray-800">₹{calculateTotalStats(selectedStudent).totalPaid}</div>
                              </div>
                              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <div className="text-red-600 font-semibold">Pending Amount</div>
                                <div className="text-2xl font-bold text-gray-800">₹{calculateTotalStats(selectedStudent).totalPending}</div>
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
                                    {Object.entries(getFeeData(selectedStudent).months)
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
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fee Collection Tab */}
                  {activeFeeTab === "fee-collection" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Student List */}
                      <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Students with Pending Fees</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {filteredStudents
                            .filter(student => calculateTotalStats(student).totalPending > 0)
                            .map(student => {
                              const pendingDetails = calculatePendingDetails(student);
                              return (
                                <div
                                  key={student.id}
                                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    selectedStudent?.id === student.id
                                      ? "border-green-500 bg-green-50"
                                      : "border-gray-200 hover:border-green-300"
                                  }`}
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-gray-800">{student.name}</h4>
                                      <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                                      <p className="text-sm text-gray-600">Room: {student.roomNo}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-medium text-red-600">
                                        Pending: ₹{pendingDetails.totalPending}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {pendingDetails.pendingMonths.length} months due
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* Fee Collection Form */}
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">
                          {selectedStudent ? `Collect Fee from ${selectedStudent.name}` : "Select a student to collect fee"}
                        </h3>
                        
                        {selectedStudent && (
                          <div className="space-y-6">
                            {/* Student Info */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-semibold text-gray-600">Name:</span>
                                  <p className="text-gray-800">{selectedStudent.name}</p>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-600">Roll No:</span>
                                  <p className="text-gray-800">{selectedStudent.rollNo}</p>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-600">Room No:</span>
                                  <p className="text-gray-800">{selectedStudent.roomNo}</p>
                                </div>
                              </div>
                            </div>

                            {/* Pending Months Details */}
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Pending Fee Details</h4>
                              <div className="space-y-2">
                                {calculatePendingDetails(selectedStudent).pendingMonths.map((pending, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <span className="text-yellow-700">
                                      {new Date(pending.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="font-semibold text-yellow-800">₹{pending.amount}</span>
                                  </div>
                                ))}
                                <div className="border-t border-yellow-200 pt-2 mt-2">
                                  <div className="flex justify-between items-center font-semibold">
                                    <span className="text-yellow-800">Total Pending:</span>
                                    <span className="text-red-600">₹{calculatePendingDetails(selectedStudent).totalPending}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Current Month Fee + Pending */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div className="text-blue-600 font-semibold">Current Month Fee</div>
                                <div className="text-2xl font-bold text-gray-800">₹{getFeeData(selectedStudent).monthlyFee}</div>
                                <div className="text-sm text-blue-600 mt-1">
                                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                              </div>
                              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <div className="text-red-600 font-semibold">Total Due (Incl. Previous)</div>
                                <div className="text-2xl font-bold text-gray-800">₹{calculatePendingDetails(selectedStudent).totalPending}</div>
                                <div className="text-sm text-red-600 mt-1">
                                  {calculatePendingDetails(selectedStudent).pendingMonths.length} months pending
                                </div>
                              </div>
                            </div>

                            {/* Payment Form */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                              <h4 className="text-lg font-semibold mb-4">Payment Details</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Amount (₹)
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter amount"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    max={calculatePendingDetails(selectedStudent).totalPending}
                                  />
                                  <p className="text-sm text-gray-500 mt-1">
                                    Maximum: ₹{calculatePendingDetails(selectedStudent).totalPending}
                                  </p>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Date
                                  </label>
                                  <input
                                    type="date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                  />
                                </div>

                                <button
                                  onClick={handleFeePayment}
                                  disabled={!paymentAmount || paymentAmount <= 0 || paymentAmount > calculatePendingDetails(selectedStudent).totalPending}
                                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                  <FaRupeeSign className="inline mr-2" />
                                  Collect Payment of ₹{paymentAmount || 0}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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