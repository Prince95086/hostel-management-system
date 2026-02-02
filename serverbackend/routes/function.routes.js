import express from "express";
import {
  createFunction,
  getFunctions,
  updateFunction,
  deleteFunction,
  updateStatus
} from "../controllers/function.controller.js";

const router = express.Router();

router.post("/", createFunction);
router.get("/", getFunctions);
router.put("/:id", updateFunction);
router.delete("/:id", deleteFunction);
router.patch("/:id/status", updateStatus);

export default router;
