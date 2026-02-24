import express from "express";
import {
  createWorkerReport,
  getWorkerReports,
  updateWorkerReport,
  deleteWorkerReport,
} from "../controllers/workerReportController.js";

const router = express.Router();

router.post("/", createWorkerReport);
router.get("/", getWorkerReports);
router.put("/:id", updateWorkerReport);
router.delete("/:id", deleteWorkerReport);

export default router;