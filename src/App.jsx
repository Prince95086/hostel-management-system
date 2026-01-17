import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContents from "./AppContents";
import SignInChoice from "./components/SignInChoice"; // 👈 import the new file
import SignInPage from "./components/StudentSignIn";
import EmailVerificationPage from "./components/EmailVerificationPage";
import StudentSignupPage from "./components/StudentSignupPage";
import AdminButtons from "./components/AdminButtons";
import AdminOptions from "./components/AdminOptions";
import SuperAdminSignIn from "./components/SuperAdminSignIn";
import AdminDashboard from "./components/AdminDashboard";
import AdminSignIn from "./components/AdminSignIn";
//import ComplainSignIn from "./components/Complain";
import ForgotPassword from "./components/ForgotPassword";
import StudentSignIn from "./components/StudentSignIn";
import Complain from "./components/Complain";
import ComplainSignIn from "./components/ComplainSignIn";
import AboutHostelManagement from "./components/AboutHostelManagement";
import ApplicationProcess from "./components/Admissions/ApplicationProcess";
import Requirements from "./components/Admissions/Requirements";
import FeesStructure from "./components/Admissions/FeesStructure";
import ImportantDates from "./components/Admissions/ImportantDates";
import HostelAccommodation from "./components/studentfacilities/HostelAccommodation";
import LibraryServices from "./components/studentfacilities/LibraryServices";
import SportsFacilities from "./components/studentfacilities/SportsFacilities";
import Cafeteria from "./components/studentfacilities/Cafeteria";
import MedicalServices from "./components/studentfacilities/MedicalServices";
import StudentPortal from "./components/StudentPortal";



function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<AppContents />} />
         <Route path="/signin" element={<SignInChoice />} /> {/* 👈 new route */}
         <Route path="/signinasstudent" element={<StudentSignIn/>} />
         <Route path="/emailverify" element={<EmailVerificationPage/>} />
         <Route path="/studentsignup" element={<StudentSignupPage/>} />
         <Route path="/signinasadmin" element={<AdminButtons/>} />
         <Route path="/admin-options" element={<AdminOptions />} />
         <Route path="/superadmin-signin" element={<SuperAdminSignIn/>} />
         <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/admin-signin" element={<AdminSignIn/>} />
         <Route path="/student-signin-complain" element={<Complain/>} />
         <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="complain-signin" element={<ComplainSignIn/>} />
        <Route path="/about" element={<AboutHostelManagement/>} />
        <Route path="/admission/process" element={<ApplicationProcess/>} />
        <Route path="/admission/requirements" element={<Requirements/>} />
        <Route path="/admission/fees" element={<FeesStructure/>} />
        <Route path="/admission/dates" element={<ImportantDates/>} />
        <Route path="/facilities/hostel" element={<HostelAccommodation/>} />
        <Route path="/facilities/library" element={<LibraryServices/>} />
        <Route path="/facilities/sports" element={<SportsFacilities/>} />
        <Route path="/facilities/cafeteria" element={<Cafeteria/>} />
        <Route path="/facilities/medical" element={<MedicalServices/>} />
        <Route path="/student-portal" element={<StudentPortal/>} />
        
        
       
        
         
      </Routes>
    </Router>
  );
}

export default App;
