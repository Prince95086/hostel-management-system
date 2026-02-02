import express from "express";
import { changePassword } from "../controllers/adminsetting.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.put("/admin/change-password", adminAuth, changePassword);

export default router;
