import express from "express";
import {
  createCanteenFee,
  getStudentCanteenFees,
  updateCanteenFee,
  deleteCanteenFee,
  getMyCanteenFees,   // ⭐ NEW
} from "../controllers/canteenFeeController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ADMIN */
router.post("/canteen-fees", createCanteenFee);
router.get("/students/:studentId/canteen-fees", getStudentCanteenFees);
router.put("/canteen-fees/:id", updateCanteenFee);
router.delete("/canteen-fees/:id", deleteCanteenFee);

/* STUDENT SELF */
router.get("/canteen-fees/my", authMiddleware, getMyCanteenFees);  // ⭐ NEW

export default router;
