import express from "express";
import { addWorker, getWorkers, deleteWorker } from "../controllers/worker.controller.js";
import { workerLogin } from "../controllers/worker.auth.controller.js";

const router = express.Router();

/* ================= WORKER MANAGEMENT ================= */

// ➕ Add worker (password included, hashed in model)
router.post("/", addWorker);

// 📋 Get all workers (password hidden)
router.get("/", getWorkers);

// ❌ Delete worker
router.delete("/:id", deleteWorker);


/* ================= AUTH ROUTE ================= */

// 🔐 Worker login
router.post("/login", workerLogin);

export default router;
