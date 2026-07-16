# 🏠 Hostel Management System

A full-stack **MERN Stack (MongoDB, Express.js, React.js, Node.js)** web application designed to simplify and automate hostel operations. The system provides a centralized platform for managing students, hostel workers, mess and canteen fees, complaints, attendance, payments, and administrative tasks through an intuitive dashboard.

---

# ✨ Features

### 👨‍🎓 Student Management
- Student registration and profile management
- View and update student details
- Student dashboard with reports

### 🔐 Authentication & Security
- Separate login for Students, Workers, and Admins
- JWT-based authentication
- Forgot Password with OTP verification via email
- Secure password encryption using Bcrypt

### 💰 Fee Management
- Mess fee management
- Canteen fee management
- Payment history and tracking

### 💳 Payment Module
- Student payment records
- Payment status management
- Fee tracking dashboard

### 📝 Complaint Management
- Raise hostel complaints
- Track complaint status
- Complaint management for administrators

### 👷 Worker Management
- Worker registration
- Worker login
- Attendance management
- Worker reports

### 📊 Reports & Analytics
- Student reports
- Worker reports
- Administrative dashboard
- Data visualization and statistics

### ⚙️ Admin Panel
- Student management
- Worker management
- Hostel functions/events management
- Complete administrative control

### 📂 File Management
- Upload student profile photos
- Upload supporting documents
- Backend file storage using Multer

---

# 🛠️ Tech Stack

## Frontend

- React.js 19
- Vite
- Tailwind CSS
- Flowbite React
- React Router DOM
- Axios
- Recharts
- React Icons
- SweetAlert2
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Multer
- Nodemailer
- Express Validator
- Rate Limiter Flexible

---

# 📂 Project Structure

```text
hostel-management-system/
│
├── src/                          # Student Portal (React + Vite)
│   ├── Student.jsx
│   ├── Dashboard.jsx
│   ├── MessFeeRecord.jsx
│   ├── CanteenFeeRecord.jsx
│   ├── ViewStudent.jsx
│   └── Studentdatashow.jsx
│
├── server/                       # Admin / Worker Portal (React + Vite)
│   └── src/
│
├── serverbackend/                # Express.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

> **Note:** The project contains two React frontends:
> - **Student Portal**
> - **Admin / Worker Portal**
>
> Both applications communicate with a common Express backend.

---

# 🚀 Getting Started

## Prerequisites

- Node.js (v18 or above)
- MongoDB (Local or Atlas)
- npm

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Prince95086/hostel-management-system.git
cd hostel-management-system
```

---

## 2️⃣ Backend Setup

```bash
cd serverbackend
npm install
```

Create a **.env** file inside **serverbackend**.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Start the backend server.

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## 3️⃣ Student Frontend Setup

```bash
cd ..
npm install
npm run dev
```

---

## 4️⃣ Admin / Worker Frontend Setup

```bash
cd server
npm install
npm run dev
```

---

# 🌐 Default URLs

| Service | URL |
|----------|-----|
| Backend API | http://localhost:5000 |
| Student Portal | http://localhost:5173 |
| Admin Portal | http://localhost:5174 *(or next available port)* |

---

# 🔌 API Overview

All backend APIs are prefixed with **`/api`**.

| Endpoint | Description |
|-----------|-------------|
| `/api/students` | Student Management |
| `/api/auth` | Authentication |
| `/api/student` | Student Authentication |
| `/api/workers/signin` | Worker Authentication |
| `/api/auth/forgot-password` | Password Recovery |
| `/api/complaints` | Complaint Management |
| `/api/studentcomplaints` | Student Complaints |
| `/api/admin` | Admin Operations |
| `/api/mess-fees` | Mess Fee Management |
| `/api/canteen-fees` | Canteen Fee Management |
| `/api/payments` | Payment Management |
| `/api/workers` | Worker Management |
| `/api/attendance` | Attendance Management |
| `/api/functions` | Hostel Functions |
| `/api/student-reports` | Student Reports |
| `/api/worker-reports` | Worker Reports |

---

# 🚀 Future Enhancements

- Online Payment Gateway Integration
- Email & SMS Notifications
- QR Code Attendance
- Hostel Room Allocation System
- Mobile Responsive Dashboard
- Real-time Notifications

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is developed for educational and learning purposes.

---

# 👨‍💻 Author

## Prince Kumar

**Information Technology Student**  
**Full Stack MERN Developer**

### 💻 Skills

- React.js
- Node.js
- Express.js
- MongoDB
- JavaScript
- Tailwind CSS
- REST APIs
- Git & GitHub

---

# 🌐 Connect With Me

- 💻 GitHub: https://github.com/Prince95086
- 💼 LinkedIn: https://www.linkedin.com/in/prince-kumar-273b7441a/

---

⭐ **If you found this project helpful, please consider giving it a Star on GitHub!**
