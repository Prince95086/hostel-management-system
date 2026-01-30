import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

export const sendOTPEmail = async (to, otp, purpose = "Password Reset") => {
  try {
    await transporter.sendMail({
      from: `"PU Hostel Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject: `${purpose} OTP`,
      html: `
        <h2>${purpose}</h2>
        <p>Your OTP is:</p>
        <h1 style="color:green;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    console.log("✅ OTP sent to:", to);
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    throw new Error("Email could not be sent");
  }
};
