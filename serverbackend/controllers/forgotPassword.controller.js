import crypto from "crypto";
import bcrypt from "bcryptjs";
import Student from "../models/Student.model.js";
import { sendOTPEmail } from "../utils/sendEmail.js";

/**
 * SEND OTP
 */
export const sendForgotOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    student.resetOtp = otpHash;
    student.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    await student.save();

    await sendOTPEmail(email, otp, "Password Reset");

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * VERIFY OTP
 */
export const verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const student = await Student.findOne({
      email,
      resetOtp: otpHash,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    student.password = hashedPassword;
    student.resetOtp = undefined;
    student.resetOtpExpire = undefined;

    await student.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
