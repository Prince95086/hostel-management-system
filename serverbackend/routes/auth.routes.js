import express from "express";
import {
  sendEmailOTP,
  verifyEmailOTP,
  resendEmailOTP,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-email-otp", sendEmailOTP);
router.post("/verify-email-otp", verifyEmailOTP);
router.post("/resend-email-otp", resendEmailOTP);

export default router;
