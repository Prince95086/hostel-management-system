import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";

export const studentSignIn = async (req, res) => {
  try {
    let { email, phone, rollNo, password, loginMethod } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    password = password.trim();

    let student;

    // 🔍 Find student based on login method
    if (loginMethod === "email") {
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      email = email.trim().toLowerCase();
      student = await Student.findOne({ email }).select("+password");

    } else if (loginMethod === "phone") {
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
      }

      phone = phone.replace(/\s/g, "");
      student = await Student.findOne({ phone }).select("+password");

    } else if (loginMethod === "rollNo") {
      if (!rollNo) {
        return res.status(400).json({ message: "Roll Number is required" });
      }

      rollNo = rollNo.trim().toUpperCase();
      student = await Student.findOne({ rollNo }).select("+password");

    } else {
      return res.status(400).json({ message: "Invalid login method" });
    }

    // ❌ Student not found
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 Password check
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🎟 JWT Token
    const token = jwt.sign(
      { id: student._id, rollNo: student.rollNo, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ❌ Remove sensitive fields
    const studentObj = student.toObject();
    delete studentObj.password;
    delete studentObj.resetOtp;
    delete studentObj.resetOtpExpire;

    res.json({
      message: "Login successful",
      token,
      student: studentObj,
    });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
