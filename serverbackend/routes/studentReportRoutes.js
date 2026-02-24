import express from "express";
import {
  createStudentReport,
  getStudentReports,
  updateStudentReport,
  deleteStudentReport,
  getStudentReportsByLogin,   // ✅ add this
} from "../controllers/studentReportController.js";

const router = express.Router();

router.post("/", createStudentReport);
router.get("/", getStudentReports);

// ✅ NEW LOGIN ROUTE
router.get("/login/:identifier", getStudentReportsByLogin);

router.put("/:id", updateStudentReport);
router.delete("/:id", deleteStudentReport);

export default router;