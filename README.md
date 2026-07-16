# 🏠 Hostel Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for digitizing and managing day-to-day hostel operations — student registration, fee tracking, complaints, worker attendance, and admin reporting — all from one dashboard.

## ✨ Features


Student Management — registration, profile view/edit, and student-side dashboard with reports
Authentication — separate sign-in flows for students, workers, and admins, with forgot-password/OTP email recovery
Fee Management — mess fee and canteen fee record tracking per student
Payments — dedicated payment tracking module
Complaints — students can raise complaints and track resolution status
Worker Management — worker records, sign-in, and attendance tracking
Reports — student and worker report generation
Admin Panel — admin settings, superadmin auth, and full oversight of students/workers/functions
File Uploads — profile photos and documents served via the backend /uploads route

## 🛠️ Tech Stack

Frontend


React 19 + Vite
Tailwind CSS + Flowbite React
React Router DOM
Axios for API calls
Recharts (dashboards/charts), React Hot Toast / SweetAlert2 (notifications), React Icons


Backend


Node.js + Express
MongoDB with Mongoose
JWT-based authentication
Bcrypt for password hashing
Multer for file uploads
Nodemailer for email/OTP
express-validator for request validation
rate-limiter-flexible for basic abuse protection

## 📂 Project Structure

```text
hostel-management-system/
├── src/                          # Primary React frontend (Vite)
│   ├── Student.jsx
│   ├── Dashboard.jsx
│   ├── MessFeeRecord.jsx
│   ├── CanteenFeeRecord.jsx
│   ├── ViewStudent.jsx
│   └── Studentdatashow.jsx
│
├── server/                       # Secondary React frontend (Admin/Worker Portal)
│   └── src/
│
├── serverbackend/                # Express.js Backend
│   ├── controllers/
│   ├── models/                   # Student, Worker, Payment, MessFee, CanteenFee, etc.
│   ├── routes/                   # REST API Endpoints
│   ├── middleware/
│   ├── utils/
│   ├── uploads/                  # Uploaded photos and documents
│   └── server.js                 # Application Entry Point
│
└── README.md
```

Note: This repo currently has two React frontends (/ and /server) alongside one backend (/serverbackend). You may want to clarify/rename these folders — e.g. frontend-student and frontend-admin — for easier onboarding.

## 🚀 Getting Started

Prerequisites


Node.js v18+
MongoDB (local instance or Atlas connection string)
npm

### 1. Clone the repository
git clone https://github.com/Prince95086/hostel-management-system.git
cd hostel-management-system

### 2. Backend setup
cd serverbackend
npm install

### Create a .env file in serverbackend/ with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_for_nodemailer
EMAIL_PASS=your_email_app_password

### Run the backend:
npm run dev      # nodemon (development)
# or
npm start        # node (production)

### 3. Frontend setup (root app) 
cd ..
npm install
npm run dev

### 4. Second frontend (server/), if used
cd server
npm install
npm run dev

By default the backend runs on http://localhost:5000 and each Vite frontend on http://localhost:5173 (Vite will auto-increment the port if one is taken).

## 🔌 API Overview
All routes are prefixed with /api. Key route groups from serverbackend/server.js:

 Route                                 Purpose       
/api/students                        Student CRUD
/api/auth, /api/student,             Authentication
/api/workers/signin                  (admin/student/worker)
/api/auth/forgot-password            Password recovery via OTP
/api/complaints,                     Complaint management
/api/studentcomplaints
/api/admin                           Admin operations
/api/mess-fees (via messFeeRoutes)   Mess fee records
/api/canteen-fees                    Canteen fee records
/api/workers                         Worker CRUD
/api/attendance                      Worker attendance
/api/payments                        Payment records
/api/functions                       Hostel "functions"/events
/api/worker-reports,                 Reporting
/api/student-reports

## 👨‍💻 Author

**Prince Kumar**

Information Technology Student | Full Stack Web Developer | MERN Stack | MongoDB | Express.js | React.js | Node.js

---

### 🌐 Connect with Me

- GitHub: https://github.com/Prince95086
- LinkedIn: https://www.linkedin.com/in/prince-kumar-273b7441a/



