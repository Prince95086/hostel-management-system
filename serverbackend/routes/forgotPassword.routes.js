import express from "express";
import {
  sendForgotOtp,
  verifyForgotOtp,
  resetPassword,
} from "../controllers/forgotPassword.controller.js";

const router = express.Router();

router.post("/send-otp", sendForgotOtp);
router.post("/verify-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);

export default router;
