import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "princeguraru9693@gmail.com", // your gmail
    pass: "etzo iidc hfho pgun",         // Gmail APP PASSWORD
  },
});

/**
 * Send OTP Email
 */
export const sendOTPEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"PU Hostel" <princeguraru9693@gmail.com>`, // ✅ FIXED
      to,
      subject: "Email Verification OTP",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color:green;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("✅ OTP Email sent to:", to);
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    throw error;
  }
};
