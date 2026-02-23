import express from "express";
import { workerSignin } from "../controllers/workerSignin.controller.js";

const router = express.Router();

router.post("/", workerSignin);

export default router;
