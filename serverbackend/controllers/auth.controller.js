import EmailOTP from "../models/EmailOTP.model.js";
import { sendOTPEmail } from "../utils/sendEmail.js";

/* ================= SEND OTP ================= */
export const sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // remove old OTPs
    await EmailOTP.deleteMany({ email: normalizedEmail });

    await EmailOTP.create({
      email: normalizedEmail,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // ✅ SEND EMAIL
    await sendOTPEmail(normalizedEmail, otp);

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

/* ================= VERIFY OTP ================= */
export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const record = await EmailOTP.findOne({
      email: normalizedEmail,
      otp,
    });

    if (!record) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      await EmailOTP.deleteMany({ email: normalizedEmail });
      return res.status(400).json({ error: "OTP expired" });
    }

    // delete OTP after success
    await EmailOTP.deleteMany({ email: normalizedEmail });

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
};

/* ================= RESEND OTP ================= */
export const resendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await EmailOTP.deleteMany({ email: normalizedEmail });

    await EmailOTP.create({
      email: normalizedEmail,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTPEmail(normalizedEmail, otp);

    return res.json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (err) {
    console.error("RESEND OTP ERROR:", err);
    return res.status(500).json({ error: "Failed to resend OTP" });
  }
};
