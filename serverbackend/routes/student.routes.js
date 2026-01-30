import express from "express";
import {
  checkRollNoAvailability,
  registerStudent,
  getStudentById,
  getAllStudents, 
  deleteStudent, 
  getMyAccount      // ✅ ADD THIS
} from "../controllers/student.controller.js";
import { upload } from "../middleware/upload.middleware.js";
//import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * CHECK ROLL NUMBER AVAILABILITY
 * GET /api/students/check-availability/:rollNo
 */
router.get("/check-availability/:rollNo", checkRollNoAvailability);

/**
 * REGISTER STUDENT
 * POST /api/students/register
 */
router.post(
  "/register",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  registerStudent
);

/**
 * GET ALL STUDENTS
 * GET /api/students
 */
router.get("/", getAllStudents);

/**
 * GET STUDENT BY ID
 * GET /api/students/:id
 */
router.get("/:id", getStudentById);
/* DELETE student by ID */
router.delete("/:id", deleteStudent);

//for get my account
//router.get("/my-account", verifyToken, getMyAccount);


export default router;
