import express from "express";
import {
  createCanteenFee,
  getStudentCanteenFees,
  updateCanteenFee,
  deleteCanteenFee,
  getMyCanteenFees,
} from "../controllers/canteenFeeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import CanteenFee from "../models/CanteenFee.js";

const router = express.Router();

/* ================= ADMIN ROUTES ================= */
router.post("/canteen-fees", createCanteenFee);
router.get("/students/:studentId/canteen-fees", getStudentCanteenFees);
router.put("/canteen-fees/:id", updateCanteenFee);
router.delete("/canteen-fees/:id", deleteCanteenFee);

/* ================= STUDENT TOKEN LOGIN ================= */
router.get("/canteen-fees/my", authMiddleware, getMyCanteenFees);

/* ================= STUDENT PHONE LOGIN ================= */
router.get("/canteen-fees/by-phone/:phone", async (req, res) => {
  try {
    let phone = req.params.phone.replace(/[^0-9]/g, "");

    // Remove country code
    if (phone.startsWith("91") && phone.length === 12) {
      phone = phone.slice(2);
    }

    const records = await CanteenFee.find({ phoneNumber: phone }).sort({ year: -1, month: -1 });

    if (!records.length) {
      return res.status(404).json({ message: "No records found for this phone number" });
    }

    res.json(records);
  } catch (error) {
    console.error("Phone login fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
