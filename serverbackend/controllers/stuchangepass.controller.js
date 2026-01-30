import bcrypt from "bcryptjs";
import Student from "../models/Student.model.js";

/* ======================================================
   CHANGE PASSWORD
====================================================== */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1️⃣ Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 2️⃣ Find logged-in student (from token)
    const student = await Student.findById(req.user.id).select("+password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 3️⃣ Compare old password
    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // 4️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;

    await student.save();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
