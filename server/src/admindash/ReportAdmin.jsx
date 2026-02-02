import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  FaFileAlt,
  FaEye,
  FaTrash,
  FaEdit,
  FaFilter,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import pulogo from "../assets/puimages/pulogo.jpeg";

export default function ReportAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("worker"); // "worker" or "student"
  const [filterType, setFilterType] = useState("all"); // "all", "worker", "student"
  const [reports, setReports] = useState([]); // Array to store all reports
  const [editingIndex, setEditingIndex] = useState(null); // For editing existing reports
  const [reportData, setReportData] = useState({
    name: "",
    id: "",
    date: new Date().toISOString().split("T")[0],
    issueType: "",
    description: "",
    severity: "medium",
    actionTaken: "",
  });

  const navigate = useNavigate();

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
    { label: "Write Report", icon: <FaFileAlt />, path: null, action: () => setShowReportModal(true) },
  ];

  const issueTypes = {
    worker: ["Late Arrival", "Absent", "Misconduct", "Poor Performance", "Equipment Damage", "Other"],
    student: ["Discipline", "Property Damage", "Late Night Entry", "Violation of Rules", "Health Issue", "Other"]
  };

  // Filter reports based on filterType
  const filteredReports = reports.filter(report => {
    if (filterType === "all") return true;
    return report.type === filterType;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportTypeChange = (type) => {
    setReportType(type);
    setReportData({
      name: "",
      id: "",
      date: new Date().toISOString().split("T")[0],
      issueType: "",
      description: "",
      severity: "medium",
      actionTaken: "",
    });
    setEditingIndex(null);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    
    const newReport = {
      id: Date.now(), // Unique ID for each report
      type: reportType,
      ...reportData,
      createdAt: new Date().toISOString(),
    };

    if (editingIndex !== null) {
      // Update existing report
      const updatedReports = [...reports];
      updatedReports[editingIndex] = newReport;
      setReports(updatedReports);
      alert(`Report updated successfully for ${reportType === "worker" ? "Worker" : "Student"} ${reportData.name}`);
    } else {
      // Add new report
      setReports(prev => [newReport, ...prev]);
      alert(`Report submitted successfully for ${reportType === "worker" ? "Worker" : "Student"} ${reportData.name}`);
    }

    // Reset form and close modal
    setReportData({
      name: "",
      id: "",
      date: new Date().toISOString().split("T")[0],
      issueType: "",
      description: "",
      severity: "medium",
      actionTaken: "",
    });
    setEditingIndex(null);
    setShowReportModal(false);
  };

  const handleEditReport = (index) => {
    const reportToEdit = filteredReports[index];
    const originalIndex = reports.findIndex(r => r.id === reportToEdit.id);
    
    setReportType(reportToEdit.type);
    setReportData({
      name: reportToEdit.name,
      id: reportToEdit.id,
      date: reportToEdit.date,
      issueType: reportToEdit.issueType,
      description: reportToEdit.description,
      severity: reportToEdit.severity,
      actionTaken: reportToEdit.actionTaken,
    });
    setEditingIndex(originalIndex);
    setShowReportModal(true);
  };

  const handleDeleteReport = (index) => {
    const reportToDelete = filteredReports[index];
    const originalIndex = reports.findIndex(r => r.id === reportToDelete.id);
    
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter((_, i) => i !== originalIndex);
      setReports(updatedReports);
      alert("Report deleted successfully");
    }
  };

  const handleViewReport = (index) => {
    const report = filteredReports[index];
    alert(
      `Report Details:\n\n` +
      `Type: ${report.type === "worker" ? "Worker" : "Student"}\n` +
      `Name: ${report.name}\n` +
      `ID: ${report.id}\n` +
      `Date: ${report.date}\n` +
      `Issue Type: ${report.issueType}\n` +
      `Severity: ${report.severity}\n` +
      `Description: ${report.description}\n` +
      `Action Taken: ${report.actionTaken || "Not specified"}\n` +
      `Created: ${new Date(report.createdAt).toLocaleString()}`
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Load sample data on first render (optional)
  useEffect(() => {
    // You can add some sample data for testing
    const sampleReports = [
      {
        id: 1,
        type: "worker",
        name: "John Doe",
        id: "WRK001",
        date: "2024-01-15",
        issueType: "Late Arrival",
        description: "Worker arrived 2 hours late without prior notice.",
        severity: "medium",
        actionTaken: "Given verbal warning",
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        type: "student",
        name: "Alice Smith",
        id: "STU2024001",
        date: "2024-01-14",
        issueType: "Property Damage",
        description: "Student damaged hostel furniture in room 204.",
        severity: "high",
        actionTaken: "Fine imposed and parents informed",
        createdAt: "2024-01-14T15:45:00Z"
      },
      {
        id: 3,
        type: "worker",
        name: "Robert Johnson",
        id: "WRK002",
        date: "2024-01-16",
        issueType: "Poor Performance",
        description: "Consistently failing to complete assigned cleaning tasks.",
        severity: "medium",
        actionTaken: "Given written warning and performance review scheduled",
        createdAt: "2024-01-16T09:15:00Z"
      },
      {
        id: 4,
        type: "student",
        name: "Michael Brown",
        id: "STU2024002",
        date: "2024-01-17",
        issueType: "Late Night Entry",
        description: "Returned to hostel after curfew multiple times this week.",
        severity: "low",
        actionTaken: "Warning issued",
        createdAt: "2024-01-17T22:30:00Z"
      }
    ];
    
    // Uncomment the line below to load sample data automatically
    // setReports(sampleReports);
  }, []);

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
                if (item.action) {
                  item.action();
                } else if (item.path) {
                  navigate(item.path);
                  if (isMobile) setSidebarOpen(false);
                }
              }}
              className="w-full flex items-center gap-3
              px-3 py-3 mb-1
              text-lg font-semibold
              rounded-lg
              hover:bg-green-700
              transition-all text-left"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ================= REPORT MODAL (FULL WIDTH) ================= */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl shadow-2xl w-[95vw] max-w-[1400px] max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {editingIndex !== null ? "Edit Report" : "Write Report"}
                </h2>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setEditingIndex(null);
                    setReportData({
                      name: "",
                      id: "",
                      date: new Date().toISOString().split("T")[0],
                      issueType: "",
                      description: "",
                      severity: "medium",
                      actionTaken: "",
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  &times;
                </button>
              </div>

              {/* Report Type Selection */}
              <div className="flex gap-6 mb-8">
                <button
                  type="button"
                  onClick={() => handleReportTypeChange("worker")}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-colors ${
                    reportType === "worker"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Worker Report
                </button>
                <button
                  type="button"
                  onClick={() => handleReportTypeChange("student")}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-colors ${
                    reportType === "student"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Student Report
                </button>
              </div>

              <form onSubmit={handleSubmitReport}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      {reportType === "worker" ? "Worker Name" : "Student Name"} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reportData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder={`Enter ${reportType === "worker" ? "worker" : "student"} name`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      {reportType === "worker" ? "Worker ID" : "Student ID"} *
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={reportData.id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder={`Enter ${reportType === "worker" ? "worker" : "student"} ID`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={reportData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Issue Type *
                    </label>
                    <select
                      name="issueType"
                      value={reportData.issueType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select issue type</option>
                      {issueTypes[reportType].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <div className="flex gap-3">
                    {["low", "medium", "high"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setReportData(prev => ({ ...prev, severity: level }))}
                        className={`flex-1 py-3 rounded-lg font-medium capitalize text-lg transition-all ${
                          reportData.severity === level
                            ? level === "low"
                              ? "bg-green-500 text-white shadow-lg"
                              : level === "medium"
                              ? "bg-yellow-500 text-white shadow-lg"
                              : "bg-red-500 text-white shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={reportData.description}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    required
                    placeholder={`Describe the issue with ${reportType === "worker" ? "the worker" : "the student"} in detail...`}
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Action Taken / Recommended Action
                  </label>
                  <textarea
                    name="actionTaken"
                    value={reportData.actionTaken}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter the action taken or recommended action. Be specific about any disciplinary measures, warnings, fines, or other actions..."
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReportModal(false);
                      setEditingIndex(null);
                      setReportData({
                        name: "",
                        id: "",
                        date: new Date().toISOString().split("T")[0],
                        issueType: "",
                        description: "",
                        severity: "medium",
                        actionTaken: "",
                      });
                    }}
                    className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
                  >
                    {editingIndex !== null ? "Update Report" : "Submit Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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

        {/* ---------- PAGE CONTENT (REPORTS TABLE) ---------- */}
        <section className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Report Management</h2>
                <p className="text-gray-600 text-lg">Manage worker and student reports</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-lg">
                  <span className="text-gray-500">Showing:</span>
                  <span className="font-bold text-2xl ml-2">
                    {filterType === "all" ? "All" : filterType === "worker" ? "Worker" : "Student"} Reports
                    <span className="text-lg text-gray-500 ml-2">({filteredReports.length})</span>
                  </span>
                </div>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-3 text-lg"
                >
                  <FaFileAlt className="text-xl" />
                  Create New Report
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setFilterType("all")}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 ${
                  filterType === "all"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaFilter />
                All Reports
                <span className="ml-2 px-2 py-1 text-sm bg-white/30 rounded">
                  {reports.length}
                </span>
              </button>
              <button
                onClick={() => setFilterType("worker")}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 ${
                  filterType === "worker"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaUsers />
                Worker Reports
                <span className="ml-2 px-2 py-1 text-sm bg-white/30 rounded">
                  {reports.filter(r => r.type === "worker").length}
                </span>
              </button>
              <button
                onClick={() => setFilterType("student")}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 ${
                  filterType === "student"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FaUsers />
                Student Reports
                <span className="ml-2 px-2 py-1 text-sm bg-white/30 rounded">
                  {reports.filter(r => r.type === "student").length}
                </span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Reports</p>
                    <p className="text-3xl font-bold text-gray-800">{reports.length}</p>
                  </div>
                  <FaFileAlt className="text-3xl text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 p-5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Worker Reports</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {reports.filter(r => r.type === "worker").length}
                    </p>
                  </div>
                  <FaUsers className="text-3xl text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Student Reports</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {reports.filter(r => r.type === "student").length}
                    </p>
                  </div>
                  <FaUsers className="text-3xl text-purple-500" />
                </div>
              </div>
              <div className="bg-red-50 p-5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">High Severity</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {reports.filter(r => r.severity === "high").length}
                    </p>
                  </div>
                  <FaExclamationTriangle className="text-3xl text-red-500" />
                </div>
              </div>
            </div>

            {filteredReports.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">S.No</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">Type</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">Name</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">ID</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">Date</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">Issue Type</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">Severity</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700 text-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report, index) => (
                      <tr key={report.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-lg">{index + 1}</td>
                        <td className="py-4 px-6">
                          <span className={`px-4 py-2 rounded-full text-base font-medium ${
                            report.type === "worker" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {report.type === "worker" ? "Worker" : "Student"}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-medium text-lg">{report.name}</td>
                        <td className="py-4 px-6 text-lg">{report.id}</td>
                        <td className="py-4 px-6 text-lg">{report.date}</td>
                        <td className="py-4 px-6 text-lg">{report.issueType}</td>
                        <td className="py-4 px-6">
                          <span className={`px-4 py-2 rounded-full text-base font-medium ${getSeverityColor(report.severity)}`}>
                            {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleViewReport(index)}
                              className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FaEye className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleEditReport(index)}
                              className="p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit Report"
                            >
                              <FaEdit className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleDeleteReport(index)}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Report"
                            >
                              <FaTrash className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                {filterType === "all" ? (
                  <>
                    <FaFileAlt className="text-8xl text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-3">No Reports Yet</h3>
                    <p className="text-gray-500 text-lg mb-8">Create your first report by clicking the button below.</p>
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-3 mx-auto text-lg"
                    >
                      <FaFileAlt className="text-xl" />
                      Create First Report
                    </button>
                  </>
                ) : (
                  <>
                    <FaFilter className="text-8xl text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                      No {filterType === "worker" ? "Worker" : "Student"} Reports Found
                    </h3>
                    <p className="text-gray-500 text-lg mb-8">
                      {filterType === "worker" 
                        ? "No worker reports have been created yet." 
                        : "No student reports have been created yet."}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setFilterType("all")}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center gap-2 text-lg"
                      >
                        View All Reports
                      </button>
                      <button
                        onClick={() => setShowReportModal(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-3 text-lg"
                      >
                        <FaFileAlt className="text-xl" />
                        Create {filterType === "worker" ? "Worker" : "Student"} Report
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}