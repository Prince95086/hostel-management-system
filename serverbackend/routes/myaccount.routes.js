import express from "express";
import {
  registerStudent,
  loginStudent,
  getMyAccount
} from "../controllers/myaccount.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/signin", loginStudent);   // matches your React login URL
router.get("/my-account", verifyToken, getMyAccount);

export default router;
