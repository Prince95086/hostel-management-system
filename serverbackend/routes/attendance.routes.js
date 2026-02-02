import express from "express";
import {
  saveAttendance,
  getAttendanceByDate,
  getWorkerAttendanceByRange
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/save", saveAttendance);
router.get("/:date", getAttendanceByDate);
router.get("/worker/:workerId", getWorkerAttendanceByRange);

export default router;
