import express from "express";
import {
  createComplaint,
  getComplaintsByCategory,
  deleteComplaint,
  updateComplaintStatus,
} from "../controllers/complaint.controller.js";

const router = express.Router();

/* ================================
   CREATE COMPLAINT
================================ */
router.post("/", createComplaint);

/* ================================
   GET COMPLAINTS BY CATEGORY
   Example: /api/complaints/category/fan
================================ */
router.get("/category/:category", getComplaintsByCategory);

//for delete data
router.delete("/:id", deleteComplaint);

//update data
router.put("/:id/status", updateComplaintStatus);

export default router;
