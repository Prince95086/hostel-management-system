import express from "express";
import {
  createMessFee,
  getStudentMessFees,
  getMessFeesByPhone,   // ✅ ADD THIS
  updateMessFee,
  deleteMessFee
} from "../controllers/messFeeController.js";

import Student from "../models/Student.model.js";

const router = express.Router();


/* ================= CREATE MESS FEE ================= */
router.post("/mess-fees", createMessFee);



/* ================= GET FEES BY STUDENT ID (ADMIN) ================= */
router.get("/students/:studentId/mess-fees", getStudentMessFees);



/* ================= GET STUDENT DETAILS BY PHONE (LOGIN USE) ================= */
router.get("/students/phone/:phone", async (req, res) => {
  try {
    const student = await Student.findOne({ phone: req.params.phone });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



/* ================= GET FEES BY PHONE (STUDENT PANEL) ================= */
router.get("/mess-fees/phone/:phone", getMessFeesByPhone);



/* ================= UPDATE ================= */
router.put("/mess-fees/:id", updateMessFee);



/* ================= DELETE ================= */
router.delete("/mess-fees/:id", deleteMessFee);



export default router;
