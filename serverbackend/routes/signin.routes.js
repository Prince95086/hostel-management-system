import express from "express";
import { studentSignIn } from "../controllers/signin.controller.js";

const router = express.Router();

router.post("/signin", studentSignIn);

export default router;
