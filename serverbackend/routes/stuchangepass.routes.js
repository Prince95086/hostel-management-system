import express from "express";
import { changePassword } from "../controllers/stuchangepass.controller.js";
import { verifyToken } from "../middleware/stuchangeverifyToken.js";

const router = express.Router();

/* CHANGE PASSWORD ROUTE */
router.put("/change-password", verifyToken, changePassword);

export default router;
