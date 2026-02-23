import express from "express";
import { getComplaintsByPhone } from "../controllers/studentComplain.controller.js";

const router = express.Router();

/* =====================================
   GET COMPLAINTS BY PHONE NUMBER
   URL: /api/complaints/phone/:mobileNo
   Example:
   GET http://localhost:5000/api/complaints/phone/9876543210
===================================== */
router.get("/phone/:mobileNo", getComplaintsByPhone);

export default router;