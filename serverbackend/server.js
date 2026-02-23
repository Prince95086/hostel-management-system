import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import studentRoutes from "./routes/student.routes.js";
import myaccountRoutes from "./routes/myaccount.routes.js";
import authRoutes from "./routes/auth.routes.js";
import signinRoutes from "./routes/signin.routes.js";
import forgotPasswordRoutes from "./routes/forgotPassword.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import stupasswordchange from "./routes/stuchangepass.routes.js";
import messFeeRoutes from "./routes/messFeeRoutes.js";
import canteenFeeRoutes from "./routes/canteenFeeRoutes.js";
import adminsettingRoutes from "./routes/adminsettingRoutes.js";
import workerRoutes from "./routes/worker.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import functionRoutes from "./routes/function.routes.js";
import workerReportRoutes from "./routes/workerReportRoutes.js";
import studentReportRoutes from "./routes/studentReportRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import workerSigninRoute from "./routes/workerSignin.route.js";
import studentComplainRoutes from "./routes/studentComplain.routes.js";

dotenv.config();

const app = express();

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Student Registration API is running...");
});

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/myaccount", myaccountRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", signinRoutes);
app.use("/api/auth/forgot-password", forgotPasswordRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stuchangepass", stupasswordchange);
app.use("/api", messFeeRoutes);
app.use("/api", canteenFeeRoutes);   // /api/canteen-fees
app.use("/api", adminsettingRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/functions", functionRoutes);
app.use("/api/worker-reports", workerReportRoutes);
app.use("/api/student-reports", studentReportRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/workers/signin", workerSigninRoute);
app.use("/api/studentcomplaints", studentComplainRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });
