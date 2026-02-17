import express from "express";
import {
  createStudentReport,
  getStudentReports,
  getStudentReportsByStudentId,
  updateStudentReport,
  deleteStudentReport,
} from "../controllers/studentReportController.js";

const router = express.Router();

router.post("/", createStudentReport);
router.get("/", getStudentReports);
router.get("/:studentId", getStudentReportsByStudentId);
router.put("/:id", updateStudentReport);
router.delete("/:id", deleteStudentReport);

export default router;
